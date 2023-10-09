/**
* This file was automatically generated by @cosmwasm/ts-codegen@0.16.5.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @cosmwasm/ts-codegen generate command to regenerate this file.
*/

export interface ConfigResponse {
  owner: string;
  [k: string]: unknown;
}
export type Addr = string;
export interface Config {
  owner: Addr;
  [k: string]: unknown;
}
export type ExecuteMsg = {
  update_config: {
    owner?: string | null;
    [k: string]: unknown;
  };
} | {
  create_music_album: {
    metadata: string;
    [k: string]: unknown;
  };
} | {
  delete_music_album: {
    identifier: string;
    [k: string]: unknown;
  };
} | {
  add_to_library: {
    identifier: string;
    [k: string]: unknown;
  };
} | {
  remove_from_library: {
    identifier: string;
    [k: string]: unknown;
  };
};
export interface InstantiateMsg {
  [k: string]: unknown;
}
export interface MusicAlbumResponse {
  deleted: boolean;
  identifier: string;
  metadata: string;
  post_by: Addr;
  [k: string]: unknown;
}
export interface MusicAlbum {
  deleted: boolean;
  identifier: string;
  metadata: string;
  post_by: Addr;
  [k: string]: unknown;
}
export type QueryMsg = {
  config: {
    [k: string]: unknown;
  };
} | {
  music_album: {
    identifier: string;
    [k: string]: unknown;
  };
};