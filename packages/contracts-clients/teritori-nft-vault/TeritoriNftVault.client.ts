/**
* This file was automatically generated by @cosmwasm/ts-codegen@0.16.5.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @cosmwasm/ts-codegen generate command to regenerate this file.
*/

import { CosmWasmClient, SigningCosmWasmClient, ExecuteResult } from "@cosmjs/cosmwasm-stargate";
import { Coin, StdFee } from "@cosmjs/amino";
import { Uint128, AllNftsInVaultResponse, NFTInfo, ConfigResponse, ExecuteMsg, Binary, Cw721ReceiveMsg, InstantiateMsg, NftInfoResponse, NftListResponse, NftOwnerInfoResponse, NftQueryMsg, Cw2981QueryMsg, QueryMsg, RoyaltiesInfoResponse } from "./TeritoriNftVault.types";
export interface TeritoriNftVaultReadOnlyInterface {
  contractAddress: string;
  config: () => Promise<ConfigResponse>;
  nftInfo: ({
    nftContractAddr,
    nftTokenId
  }: {
    nftContractAddr: string;
    nftTokenId: string;
  }) => Promise<NftInfoResponse>;
}
export class TeritoriNftVaultQueryClient implements TeritoriNftVaultReadOnlyInterface {
  client: CosmWasmClient;
  contractAddress: string;

  constructor(client: CosmWasmClient, contractAddress: string) {
    this.client = client;
    this.contractAddress = contractAddress;
    this.config = this.config.bind(this);
    this.nftInfo = this.nftInfo.bind(this);
  }

  config = async (): Promise<ConfigResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      config: {}
    });
  };
  nftInfo = async ({
    nftContractAddr,
    nftTokenId
  }: {
    nftContractAddr: string;
    nftTokenId: string;
  }): Promise<NftInfoResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      nft_info: {
        nft_contract_addr: nftContractAddr,
        nft_token_id: nftTokenId
      }
    });
  };
}
export interface TeritoriNftVaultInterface extends TeritoriNftVaultReadOnlyInterface {
  contractAddress: string;
  sender: string;
  updateConfig: ({
    feeBp,
    owner
  }: {
    feeBp?: Uint128;
    owner?: string;
  }, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
  receiveNft: ({
    msg,
    sender,
    tokenId
  }: {
    msg: Binary;
    sender: string;
    tokenId: string;
  }, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
  withdraw: ({
    nftContractAddr,
    nftTokenId
  }: {
    nftContractAddr: string;
    nftTokenId: string;
  }, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
  updatePrice: ({
    amount,
    denom,
    nftContractAddr,
    nftTokenId
  }: {
    amount: Uint128;
    denom: string;
    nftContractAddr: string;
    nftTokenId: string;
  }, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
  buy: ({
    nftContractAddr,
    nftTokenId
  }: {
    nftContractAddr: string;
    nftTokenId: string;
  }, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
  withdrawFee: (fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
}
export class TeritoriNftVaultClient extends TeritoriNftVaultQueryClient implements TeritoriNftVaultInterface {
  client: SigningCosmWasmClient;
  sender: string;
  contractAddress: string;

  constructor(client: SigningCosmWasmClient, sender: string, contractAddress: string) {
    super(client, contractAddress);
    this.client = client;
    this.sender = sender;
    this.contractAddress = contractAddress;
    this.updateConfig = this.updateConfig.bind(this);
    this.receiveNft = this.receiveNft.bind(this);
    this.withdraw = this.withdraw.bind(this);
    this.updatePrice = this.updatePrice.bind(this);
    this.buy = this.buy.bind(this);
    this.withdrawFee = this.withdrawFee.bind(this);
  }

  updateConfig = async ({
    feeBp,
    owner
  }: {
    feeBp?: Uint128;
    owner?: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      update_config: {
        fee_bp: feeBp,
        owner
      }
    }, fee, memo, funds);
  };
  receiveNft = async ({
    msg,
    sender,
    tokenId
  }: {
    msg: Binary;
    sender: string;
    tokenId: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      receive_nft: {
        msg,
        sender,
        token_id: tokenId
      }
    }, fee, memo, funds);
  };
  withdraw = async ({
    nftContractAddr,
    nftTokenId
  }: {
    nftContractAddr: string;
    nftTokenId: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      withdraw: {
        nft_contract_addr: nftContractAddr,
        nft_token_id: nftTokenId
      }
    }, fee, memo, funds);
  };
  updatePrice = async ({
    amount,
    denom,
    nftContractAddr,
    nftTokenId
  }: {
    amount: Uint128;
    denom: string;
    nftContractAddr: string;
    nftTokenId: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      update_price: {
        amount,
        denom,
        nft_contract_addr: nftContractAddr,
        nft_token_id: nftTokenId
      }
    }, fee, memo, funds);
  };
  buy = async ({
    nftContractAddr,
    nftTokenId
  }: {
    nftContractAddr: string;
    nftTokenId: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      buy: {
        nft_contract_addr: nftContractAddr,
        nft_token_id: nftTokenId
      }
    }, fee, memo, funds);
  };
  withdrawFee = async (fee: number | StdFee | "auto" = "auto", memo?: string, funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      withdraw_fee: {}
    }, fee, memo, funds);
  };
}