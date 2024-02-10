/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface AxelarBridgeETHInterface extends ethers.utils.Interface {
  functions: {
    "bridgeNft(uint256)": FunctionFragment;
    "enableUnlock()": FunctionFragment;
    "execute(bytes32,string,string,bytes)": FunctionFragment;
    "executeWithToken(bytes32,string,string,bytes,string,uint256)": FunctionFragment;
    "gasService()": FunctionFragment;
    "gateway()": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "riotNftEthAddress()": FunctionFragment;
    "riotNftPolyAddress()": FunctionFragment;
    "setDisableUnlock()": FunctionFragment;
    "setRiotEth(address)": FunctionFragment;
    "setRiotPolygon(string)": FunctionFragment;
    "tokenIdAddress(uint256)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "unlockRiotNft(uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "bridgeNft",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "enableUnlock",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "execute",
    values: [BytesLike, string, string, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "executeWithToken",
    values: [BytesLike, string, string, BytesLike, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "gasService",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "gateway", values?: undefined): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "riotNftEthAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "riotNftPolyAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setDisableUnlock",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "setRiotEth", values: [string]): string;
  encodeFunctionData(
    functionFragment: "setRiotPolygon",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "tokenIdAddress",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "unlockRiotNft",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "bridgeNft", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "enableUnlock",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "execute", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "executeWithToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "gasService", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "gateway", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "riotNftEthAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "riotNftPolyAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setDisableUnlock",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setRiotEth", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setRiotPolygon",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "tokenIdAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "unlockRiotNft",
    data: BytesLike
  ): Result;

  events: {
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export type OwnershipTransferredEvent = TypedEvent<
  [string, string] & { previousOwner: string; newOwner: string }
>;

export class AxelarBridgeETH extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: AxelarBridgeETHInterface;

  functions: {
    bridgeNft(
      _tokenId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    enableUnlock(overrides?: CallOverrides): Promise<[boolean]>;

    execute(
      commandId: BytesLike,
      sourceChain: string,
      sourceAddress: string,
      payload: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    executeWithToken(
      commandId: BytesLike,
      sourceChain: string,
      sourceAddress: string,
      payload: BytesLike,
      tokenSymbol: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    gasService(overrides?: CallOverrides): Promise<[string]>;

    gateway(overrides?: CallOverrides): Promise<[string]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    riotNftEthAddress(overrides?: CallOverrides): Promise<[string]>;

    riotNftPolyAddress(overrides?: CallOverrides): Promise<[string]>;

    setDisableUnlock(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setRiotEth(
      _riotNftEthAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setRiotPolygon(
      _riotNftPolyAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    tokenIdAddress(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    unlockRiotNft(
      _tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  bridgeNft(
    _tokenId: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  enableUnlock(overrides?: CallOverrides): Promise<boolean>;

  execute(
    commandId: BytesLike,
    sourceChain: string,
    sourceAddress: string,
    payload: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  executeWithToken(
    commandId: BytesLike,
    sourceChain: string,
    sourceAddress: string,
    payload: BytesLike,
    tokenSymbol: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  gasService(overrides?: CallOverrides): Promise<string>;

  gateway(overrides?: CallOverrides): Promise<string>;

  owner(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  riotNftEthAddress(overrides?: CallOverrides): Promise<string>;

  riotNftPolyAddress(overrides?: CallOverrides): Promise<string>;

  setDisableUnlock(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setRiotEth(
    _riotNftEthAddress: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setRiotPolygon(
    _riotNftPolyAddress: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  tokenIdAddress(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  unlockRiotNft(
    _tokenId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    bridgeNft(_tokenId: BigNumberish, overrides?: CallOverrides): Promise<void>;

    enableUnlock(overrides?: CallOverrides): Promise<boolean>;

    execute(
      commandId: BytesLike,
      sourceChain: string,
      sourceAddress: string,
      payload: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    executeWithToken(
      commandId: BytesLike,
      sourceChain: string,
      sourceAddress: string,
      payload: BytesLike,
      tokenSymbol: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    gasService(overrides?: CallOverrides): Promise<string>;

    gateway(overrides?: CallOverrides): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    riotNftEthAddress(overrides?: CallOverrides): Promise<string>;

    riotNftPolyAddress(overrides?: CallOverrides): Promise<string>;

    setDisableUnlock(overrides?: CallOverrides): Promise<void>;

    setRiotEth(
      _riotNftEthAddress: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setRiotPolygon(
      _riotNftPolyAddress: string,
      overrides?: CallOverrides
    ): Promise<void>;

    tokenIdAddress(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    unlockRiotNft(
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): TypedEventFilter<
      [string, string],
      { previousOwner: string; newOwner: string }
    >;

    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): TypedEventFilter<
      [string, string],
      { previousOwner: string; newOwner: string }
    >;
  };

  estimateGas: {
    bridgeNft(
      _tokenId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    enableUnlock(overrides?: CallOverrides): Promise<BigNumber>;

    execute(
      commandId: BytesLike,
      sourceChain: string,
      sourceAddress: string,
      payload: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    executeWithToken(
      commandId: BytesLike,
      sourceChain: string,
      sourceAddress: string,
      payload: BytesLike,
      tokenSymbol: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    gasService(overrides?: CallOverrides): Promise<BigNumber>;

    gateway(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    riotNftEthAddress(overrides?: CallOverrides): Promise<BigNumber>;

    riotNftPolyAddress(overrides?: CallOverrides): Promise<BigNumber>;

    setDisableUnlock(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setRiotEth(
      _riotNftEthAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setRiotPolygon(
      _riotNftPolyAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    tokenIdAddress(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    unlockRiotNft(
      _tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    bridgeNft(
      _tokenId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    enableUnlock(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    execute(
      commandId: BytesLike,
      sourceChain: string,
      sourceAddress: string,
      payload: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    executeWithToken(
      commandId: BytesLike,
      sourceChain: string,
      sourceAddress: string,
      payload: BytesLike,
      tokenSymbol: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    gasService(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    gateway(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    riotNftEthAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    riotNftPolyAddress(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    setDisableUnlock(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setRiotEth(
      _riotNftEthAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setRiotPolygon(
      _riotNftPolyAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    tokenIdAddress(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    unlockRiotNft(
      _tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}