import {
  CosmosNetworkInfo,
  GnoNetworkInfo,
  NetworkInfo,
  NetworkKind,
} from "../networks";

// Get the tld at the end of a token (TNS) (.xxxx)
export const tldFromNSToken = (str: string): string =>
  str.substring(str.lastIndexOf("."));
// Get the token (TNS) without the tld
export const nsTokenWithoutTLD = (str: string): string =>
  str.substring(0, str.lastIndexOf("."));

export const isNSPath = (str: string) => str.includes("::");

export const isNSToken = (str: string) => !isNSPath(str);

export const nameServiceDefaultImage = (network?: NetworkInfo) =>
  [NetworkKind.Cosmos, NetworkKind.Gno].includes(
    network?.kind || NetworkKind.Unknown
  )
    ? (network as CosmosNetworkInfo | GnoNetworkInfo).nameServiceDefaultImage
    : undefined;
