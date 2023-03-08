import { NetworkKind, NetworkInfo } from "../types";
import { teritoriCurrencies } from "./currencies";

const nameServiceContractAddress =
  "tori1wkwy0xh89ksdgj9hr347dyd2dw7zesmtrue6kfzyml4vdtz6e5wscs7038";
const riotContractAddressGen1 =
  "tori1gflccmghzfscmxl95z43v36y0rle8v9x8kvt9na03yzywtw86amsj9nf37";

export const teritoriNetwork: NetworkInfo = {
  id: "teritori",
  kind: NetworkKind.Cosmos,
  chainId: "teritori-1",
  displayName: "Teritori",
  icon: "icons/networks/teritori-circle.svg",
  walletUrlForStaking: "https://explorer.teritori.com/teritori/staking",
  currencies: teritoriCurrencies,
  txExplorer: "https://www.mintscan.io/teritori/txs/$hash",
  accountExplorer: "https://www.mintscan.io/teritori/account/$address",
  contractExplorer: "https://www.mintscan.io/teritori/account/$address",
  idPrefix: "tori",
  testnet: false,
  backendEndpoint: "https://dapp-backend.mainnet.teritori.com",
  addressPrefix: "tori",
  restEndpoint: "https://rest.mainnet.teritori.com",
  rpcEndpoint: "https://rpc.mainnet.teritori.com",
  stakeCurrency: "utori",
  gasPriceStep: {
    low: 0.0,
    average: 0.025,
    high: 0.04,
  },
  features: [
    "stargate",
    "ibc-transfer",
    "cosmwasm",
    "no-legacy-stdTx",
    "ibc-go",
  ],
  nameServiceContractAddress,
  nameServiceDefaultImage:
    "ipfs://bafkreieqcwmjcb64r42ygs6a4dswz63djzgayjn3rhzjber3e42cknawlm",
  nameServiceTLD: ".tori",
  vaultContractAddress:
    "tori14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9s3hewys",
  riotContractAddressGen0:
    "tori1mf6ptkssddfmxvhdx0ech0k03ktp6kf9yk59renau2gvht3nq2gqg87tkw",
  riotContractAddressGen1,
  riotSquadStakingContractAddressV1:
    "tori1zwkmdfsc6h96jm4yqdykaw5y7ndwsvqvgh5ryxp9nxs3hccml0xqfyrm37",
  riotSquadStakingContractAddressV2:
    "tori1kvjk9m7dk0es35y6ah0k28llllvle3n7xgvh0gh568ta0paf8awsml2xev",
  distributorContractAddress:
    "tori1mnem0rhjaxcsghe0xw692xysra63xwwdee2wth9s0rkfwh4dxpaq76qqre",
  riotersFooterContractAddress:
    "tori1m6g3l3j5t988zwmp965hrhsxvm8jrkf2ulw4gmwj8hx8pd84tvcqeearsd",
  secondaryDuringMintList: [
    nameServiceContractAddress,
    riotContractAddressGen1,
    "tori1r8raaqul4j05qtn0t05603mgquxfl8e9p7kcf7smwzcv2hc5rrlq0vket0", // Teritori's pets
    "tori167xst2jy9n6u92t3n8hf762adtpe3cs6acsgn0w5n2xlz9hv3xgs4ksc6t", // Diseases of the Brain AI
    "tori1qdgvugdnscwnj8lc96q666000gyjv434kn9zl9ey3dph6p0cunusy6r42x", // torisouls
    "tori1r5f97ltu4d5jdn8jv5zjhc0vz2npjhnc9zcuz29z8ua739s376dql5agt4", // The skull arts
  ],
  excludeFromLaunchpadList: [riotContractAddressGen1],
};
