/**
* This file was automatically generated by @cosmwasm/ts-codegen@0.33.0.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @cosmwasm/ts-codegen generate command to regenerate this file.
*/

import { CosmWasmClient, SigningCosmWasmClient, ExecuteResult } from "@cosmjs/cosmwasm-stargate";
import { Coin, StdFee } from "@cosmjs/amino";
import { Uint128, Addr, ConfigResponse, Config, ExecuteMsg, InstantiateMsg, QueryMsg, VideoCommentInfoResponse, VideoComment, VideoInfoResponse, Video } from "./TeritoriVideoPlayer.types";
export interface TeritoriVideoPlayerReadOnlyInterface {
  contractAddress: string;
  config: () => Promise<ConfigResponse>;
  videoInfo: ({
    identifier
  }: {
    identifier: string;
  }) => Promise<VideoInfoResponse>;
  videoCommentInfo: ({
    identifier
  }: {
    identifier: string;
  }) => Promise<VideoCommentInfoResponse>;
}
export class TeritoriVideoPlayerQueryClient implements TeritoriVideoPlayerReadOnlyInterface {
  client: CosmWasmClient;
  contractAddress: string;

  constructor(client: CosmWasmClient, contractAddress: string) {
    this.client = client;
    this.contractAddress = contractAddress;
    this.config = this.config.bind(this);
    this.videoInfo = this.videoInfo.bind(this);
    this.videoCommentInfo = this.videoCommentInfo.bind(this);
  }

  config = async (): Promise<ConfigResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      config: {}
    });
  };
  videoInfo = async ({
    identifier
  }: {
    identifier: string;
  }): Promise<VideoInfoResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      video_info: {
        identifier
      }
    });
  };
  videoCommentInfo = async ({
    identifier
  }: {
    identifier: string;
  }): Promise<VideoCommentInfoResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      video_comment_info: {
        identifier
      }
    });
  };
}
export interface TeritoriVideoPlayerInterface extends TeritoriVideoPlayerReadOnlyInterface {
  contractAddress: string;
  sender: string;
  updateOwner: ({
    owner
  }: {
    owner: Addr;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  updateFee: ({
    newFee
  }: {
    newFee: Uint128;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  createVideo: ({
    identifier,
    metadata
  }: {
    identifier: string;
    metadata: string;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  deleteVideo: ({
    identifier
  }: {
    identifier: string;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  addToLibrary: ({
    identifier
  }: {
    identifier: string;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  removeFromLibrary: ({
    identifier
  }: {
    identifier: string;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  createVideoComment: ({
    comment,
    identifier,
    videoIdentifier
  }: {
    comment: string;
    identifier: string;
    videoIdentifier: string;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  deleteVideoComment: ({
    identifier
  }: {
    identifier: string;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
}
export class TeritoriVideoPlayerClient extends TeritoriVideoPlayerQueryClient implements TeritoriVideoPlayerInterface {
  client: SigningCosmWasmClient;
  sender: string;
  contractAddress: string;

  constructor(client: SigningCosmWasmClient, sender: string, contractAddress: string) {
    super(client, contractAddress);
    this.client = client;
    this.sender = sender;
    this.contractAddress = contractAddress;
    this.updateOwner = this.updateOwner.bind(this);
    this.updateFee = this.updateFee.bind(this);
    this.createVideo = this.createVideo.bind(this);
    this.deleteVideo = this.deleteVideo.bind(this);
    this.addToLibrary = this.addToLibrary.bind(this);
    this.removeFromLibrary = this.removeFromLibrary.bind(this);
    this.createVideoComment = this.createVideoComment.bind(this);
    this.deleteVideoComment = this.deleteVideoComment.bind(this);
  }

  updateOwner = async ({
    owner
  }: {
    owner: Addr;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      update_owner: {
        owner
      }
    }, fee, memo, _funds);
  };
  updateFee = async ({
    newFee
  }: {
    newFee: Uint128;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      update_fee: {
        new_fee: newFee
      }
    }, fee, memo, _funds);
  };
  createVideo = async ({
    identifier,
    metadata
  }: {
    identifier: string;
    metadata: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      create_video: {
        identifier,
        metadata
      }
    }, fee, memo, _funds);
  };
  deleteVideo = async ({
    identifier
  }: {
    identifier: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      delete_video: {
        identifier
      }
    }, fee, memo, _funds);
  };
  addToLibrary = async ({
    identifier
  }: {
    identifier: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      add_to_library: {
        identifier
      }
    }, fee, memo, _funds);
  };
  removeFromLibrary = async ({
    identifier
  }: {
    identifier: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      remove_from_library: {
        identifier
      }
    }, fee, memo, _funds);
  };
  createVideoComment = async ({
    comment,
    identifier,
    videoIdentifier
  }: {
    comment: string;
    identifier: string;
    videoIdentifier: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      create_video_comment: {
        comment,
        identifier,
        video_identifier: videoIdentifier
      }
    }, fee, memo, _funds);
  };
  deleteVideoComment = async ({
    identifier
  }: {
    identifier: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      delete_video_comment: {
        identifier
      }
    }, fee, memo, _funds);
  };
}
