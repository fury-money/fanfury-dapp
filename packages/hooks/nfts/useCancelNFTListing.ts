import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { useCallback } from "react";

import { useFeedbacks } from "../../context/FeedbacksProvider";
import { TeritoriNftVaultClient } from "../../contracts-clients/teritori-nft-vault/TeritoriNftVault.client";
import { NFTVault__factory } from "../../evm-contracts-clients/teritori-nft-vault/NFTVault__factory";
import {
  getNetwork,
  mustGetCosmosNetwork,
  mustGetEthereumNetwork,
  NetworkKind,
} from "../../networks";
import { getMetaMaskEthereumSigner } from "../../utils/ethereum";
import useSelectedWallet from "../useSelectedWallet";
import { useWalletCosmWasmClient } from "../wallets/useWalletClients";

export const useCancelNFTListing = (
  networkId: string | undefined,
  nftContractAddress: string,
  tokenId: string
) => {
  const wallet = useSelectedWallet();
  const { setToastError } = useFeedbacks();
  const getCosmWasmClient = useWalletCosmWasmClient(wallet?.id);

  return useCallback(async () => {
    try {
      const network = getNetwork(networkId);
      if (!network) {
        throw new Error("unknown network");
      }

      if (!wallet?.address) {
        throw new Error("bad wallet");
      }

      switch (network.kind) {
        case NetworkKind.Cosmos:
          return await teritoriCancelNFTListing(
            network.id,
            await getCosmWasmClient(),
            wallet.address,
            nftContractAddress,
            tokenId
          );
        case NetworkKind.Ethereum:
          return await ethereumCancelNFTListing(
            network.id,
            wallet.address,
            nftContractAddress,
            tokenId
          );
        default:
          throw Error(`Unsupported network ${network}`);
      }
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        setToastError({
          title: "Failed to cancel NFT listing",
          message: err.message,
        });
      }
    }
  }, [
    getCosmWasmClient,
    networkId,
    nftContractAddress,
    setToastError,
    tokenId,
    wallet?.address,
  ]);
};

const teritoriCancelNFTListing = async (
  networkId: string,
  cosmwasmClient: SigningCosmWasmClient | undefined,
  sender: string,
  nftContractAddress: string,
  tokenId: string
) => {
  if (!cosmwasmClient) {
    throw new Error("no cosmwasm client");
  }
  const network = mustGetCosmosNetwork(networkId);
  if (!network.vaultContractAddress) {
    throw new Error("network not supported");
  }
  const vaultClient = new TeritoriNftVaultClient(
    cosmwasmClient,
    sender,
    network.vaultContractAddress
  );
  const reply = await vaultClient.withdraw({
    nftContractAddr: nftContractAddress,
    nftTokenId: tokenId,
  });
  return reply.transactionHash;
};

const ethereumCancelNFTListing = async (
  networkId: string,
  sender: string,
  nftContractAddress: string,
  tokenId: string
) => {
  const network = mustGetEthereumNetwork(networkId);

  const signer = await getMetaMaskEthereumSigner(network, sender);
  if (!signer) {
    throw Error("Unable to get signer");
  }

  const { maxFeePerGas, maxPriorityFeePerGas } = await signer.getFeeData();
  const vaultClient = NFTVault__factory.connect(
    network.vaultContractAddress,
    signer
  );

  const cancelListingTx = await vaultClient.withdrawNFT(
    nftContractAddress,
    tokenId,
    {
      maxFeePerGas: maxFeePerGas?.toNumber(),
      maxPriorityFeePerGas: maxPriorityFeePerGas?.toNumber(),
    }
  );

  await cancelListingTx.wait();

  return cancelListingTx.hash;
};