import { useQuery } from "@tanstack/react-query";
import { BigNumber } from "ethers";

import { TeritoriBreedingQueryClient } from "../contracts-clients/teritori-breeding/TeritoriBreeding.client";
import { TeritoriBunkerMinterQueryClient } from "../contracts-clients/teritori-bunker-minter/TeritoriBunkerMinter.client";
import { TeritoriNftQueryClient } from "../contracts-clients/teritori-nft/TeritoriNft.client";
import { WEI_TOKEN_ADDRESS } from "../networks";
import { prettyPrice } from "../utils/coins";
import { getEthereumProvider } from "../utils/ethereum";
import { ipfsURLToHTTPURL } from "../utils/ipfs";
import { getNonSigningCosmWasmClient } from "../utils/keplr";
import { TeritoriMinter__factory } from "./../evm-contracts-clients/teritori-bunker-minter/TeritoriMinter__factory";
import { TeritoriNft__factory } from "./../evm-contracts-clients/teritori-nft/TeritoriNft__factory";

export type MintState = "not-started" | "whitelist" | "public-sale" | "ended";

export interface CollectionInfo {
  image?: string;
  description?: string;
  prettyUnitPrice?: string;
  unitPrice?: string;
  priceDenom?: string;
  maxSupply?: string;
  mintedAmount?: string;
  name?: string;
  discord?: string;
  twitter?: string;
  website?: string;
  maxPerAddress?: string;
  hasPresale?: boolean;
  whitelistMaxPerAddress?: string;
  whitelistSize?: number;
  isInPresalePeriod?: boolean;
  isMintable?: boolean;
  publicSaleEnded?: boolean;
  bannerImage?: string;
  mintStarted?: boolean;
  publicSaleStartTime?: number; // seconds since epoch
  state?: MintState;
}

const getTnsCollectionInfo = () => {
  return {
    name: "Teritori Name Service", // FIXME: should fetch from contract or be in env
    image: ipfsURLToHTTPURL(
      process.env.TERITORI_NAME_SERVICE_DEFAULT_IMAGE_URL || ""
    ),
  };
};

const getBreedingCollectionInfo = async (mintAddress: string) => {
  const cosmwasm = await getNonSigningCosmWasmClient();

  const breedingClient = new TeritoriBreedingQueryClient(cosmwasm, mintAddress);
  const conf = await breedingClient.config();

  const nftClient = new TeritoriNftQueryClient(
    cosmwasm,
    conf.child_contract_addr
  );
  const nftInfo = await nftClient.contractInfo();

  const metadataURL = ipfsURLToHTTPURL(conf.child_base_uri);
  const metadataReply = await fetch(metadataURL);
  const metadata = await metadataReply.json();

  const info: CollectionInfo = {
    name: nftInfo.name,
    image: ipfsURLToHTTPURL(metadata.image || ""),
    description: metadata.description,
    discord: metadata.discord,
    twitter: metadata.twitter,
    website: metadata.website,
    bannerImage: ipfsURLToHTTPURL(metadata.banner),
  };
  return info;
};

const getTeritoriBunkerCollectionInfo = async (mintAddress: string) => {
  const cosmwasm = await getNonSigningCosmWasmClient();
  const minterClient = new TeritoriBunkerMinterQueryClient(
    cosmwasm,
    mintAddress
  );
  const conf = await minterClient.config();

  const nftClient = new TeritoriNftQueryClient(cosmwasm, conf.nft_addr);
  const nftInfo = await nftClient.contractInfo();

  const metadataURL = ipfsURLToHTTPURL(conf.nft_base_uri);
  const metadataReply = await fetch(metadataURL);

  const metadata = await metadataReply.json();

  const secondsSinceEpoch = Date.now() / 1000;

  const mintedAmount = await minterClient.currentSupply();

  const whitelistEnd = conf.mint_start_time + conf.whitelist_mint_period;
  const hasWhitelistPeriod = !!conf.whitelist_mint_period;
  const publicSaleEnded = mintedAmount === conf.nft_max_supply;

  const whitelistSize = await minterClient.whitelistSize();

  const mintStarted =
    conf.mint_start_time !== 0 && secondsSinceEpoch >= conf.mint_start_time;

  let state: MintState;
  if (!mintStarted) {
    state = "not-started";
  } else if (hasWhitelistPeriod && secondsSinceEpoch < whitelistEnd) {
    state = "whitelist";
  } else if (!publicSaleEnded) {
    state = "public-sale";
  } else {
    state = "ended";
  }

  let unitPrice: string;
  if (state === "not-started" || state === "whitelist") {
    unitPrice = conf.whitelist_mint_price_amount || conf.nft_price_amount;
  } else {
    unitPrice = conf.nft_price_amount;
  }

  const info: CollectionInfo = {
    name: nftInfo.name,
    image: ipfsURLToHTTPURL(metadata.image || ""),
    description: metadata.description,
    prettyUnitPrice: prettyPrice(
      process.env.TERITORI_NETWORK_ID || "",
      unitPrice,
      conf.price_denom
    ),
    unitPrice,
    priceDenom: conf.price_denom,
    maxSupply: conf.nft_max_supply,
    mintStarted,
    mintedAmount,
    discord: metadata.discord,
    twitter: metadata.twitter,
    website: metadata.website,
    maxPerAddress: conf.mint_max || undefined,
    whitelistMaxPerAddress: conf.whitelist_mint_max || undefined,
    whitelistSize,
    hasPresale: hasWhitelistPeriod,
    publicSaleEnded,
    isMintable: !publicSaleEnded && conf.is_mintable,
    isInPresalePeriod: state === "whitelist",
    publicSaleStartTime: whitelistEnd,
    bannerImage: ipfsURLToHTTPURL(metadata.banner),
    state,
  };

  return info;
};

const getEthereumTeritoriBunkerCollectionInfo = async (mintAddress: string) => {
  const provider = await getEthereumProvider();
  if (!provider) {
    console.error("no eth provider found");
    return {};
  }

  const minterClient = TeritoriMinter__factory.connect(mintAddress, provider);
  const minterConfig = await minterClient.callStatic.config();
  const nftAddress = await minterClient.callStatic.nft();

  const isPaused = await minterClient.callStatic.paused();
  const nftClient = TeritoriNft__factory.connect(nftAddress, provider);

  const contractURI = await nftClient.callStatic.contractURI();
  const metadataURL = ipfsURLToHTTPURL(contractURI);
  const metadataReply = await fetch(metadataURL);
  const metadata = await metadataReply.json();

  const secondsSinceEpoch = Date.now() / 1000;

  const name = await nftClient.callStatic.name();

  const priceDenom = WEI_TOKEN_ADDRESS;
  const maxSupply = minterConfig.maxSupply.toString();
  const mintStartedAt = minterConfig.mintStartTime.toNumber();
  const mintStarted = secondsSinceEpoch >= mintStartedAt;

  // Fetch all whitelist phrases
  const whitelistPhases = [];
  let isLastPhase = false;
  let phase = 0;

  while (!isLastPhase) {
    const phaseConfig = await minterClient.callStatic.whitelists(
      BigNumber.from(phase)
    );

    // If phase is invalid
    if (!phaseConfig.mintPeriod.toNumber()) {
      isLastPhase = true;
    } else {
      whitelistPhases.push({
        mintMax: phaseConfig.mintMax.toNumber(),
        mintPeriod: phaseConfig.mintPeriod.toNumber(),
        mintPrice: phaseConfig.mintPrice.toString(),
      });
      phase++;
      isLastPhase = false;
    }
  }

  // Detect current while list phase
  let currentPhase;
  let whitelistEndedAt = mintStartedAt;
  for (const [idx, whitelistPhase] of whitelistPhases.entries()) {
    whitelistEndedAt += whitelistPhase.mintPeriod;

    if (secondsSinceEpoch < whitelistEndedAt) {
      currentPhase = idx;
      break;
    }
  }

  const mintedAmount = (await minterClient.currentSupply()).toString();
  const publicSaleEnded = mintedAmount === maxSupply;
  const hasWhitelistPeriod = whitelistPhases.length > 0;

  let state: MintState;
  if (!mintStarted) {
    state = "not-started";
  } else if (hasWhitelistPeriod && secondsSinceEpoch < whitelistEndedAt) {
    state = "whitelist";
  } else if (!publicSaleEnded) {
    state = "public-sale";
  } else {
    state = "ended";
  }

  const maxPerAddress = minterConfig.publicMintMax.toString() || undefined;
  let whitelistSize = 0;
  let unitPrice = minterConfig.publicMintPrice.toString();
  let whitelistMaxPerAddress = undefined;

  if (state === "whitelist" && currentPhase !== undefined) {
    const phaseData = whitelistPhases[currentPhase];

    whitelistSize = (
      await minterClient.callStatic.whitelistSize(BigNumber.from(currentPhase))
    ).toNumber();
    unitPrice = phaseData.mintPrice;
    whitelistMaxPerAddress = phaseData.mintMax.toString();
  }

  const info: CollectionInfo = {
    name,
    image: ipfsURLToHTTPURL(metadata.image || ""),
    description: metadata.description,
    prettyUnitPrice: prettyPrice(
      process.env.ETHEREUM_NETWORK_ID || "",
      unitPrice,
      priceDenom
    ),
    unitPrice,
    priceDenom,
    maxSupply,
    mintStarted,
    mintedAmount,
    discord: metadata.discord,
    twitter: metadata.twitter,
    website: metadata.website,
    maxPerAddress,
    whitelistMaxPerAddress,
    whitelistSize,
    hasPresale: hasWhitelistPeriod,
    publicSaleEnded,
    isMintable: !publicSaleEnded && !isPaused,
    isInPresalePeriod: state === "whitelist",
    publicSaleStartTime: whitelistEndedAt,
    bannerImage: ipfsURLToHTTPURL(metadata.banner),
    state,
  };
  return info;
};

// NOTE: consider using the indexer for this
export const useCollectionInfo = (id: string) => {
  // Request to ETH blockchain is not free so for ETH we do not re-fetch much
  const refetchInterval = id.startsWith("eth-") ? 60_000 : 5000;

  const { data, error, refetch } = useQuery(
    ["collectionInfo", id],
    async (): Promise<CollectionInfo> => {
      let info: CollectionInfo = {};

      const [addressPrefix, mintAddress] = id.split("-");

      if (addressPrefix === "tori") {
        switch (mintAddress) {
          case process.env.TERITORI_NAME_SERVICE_CONTRACT_ADDRESS:
            info = await getTnsCollectionInfo();
            break;
          case process.env.THE_RIOT_BREEDING_CONTRACT_ADDRESS:
            info = await getBreedingCollectionInfo(mintAddress);
            break;
          default:
            info = await getTeritoriBunkerCollectionInfo(mintAddress);
        }
      } else if (addressPrefix === "eth") {
        info = await getEthereumTeritoriBunkerCollectionInfo(mintAddress);
      }
      return info;
    },
    { refetchInterval, staleTime: refetchInterval }
  );

  return { info: data, notFound: !!error, refetchCollectionInfo: refetch };
};
