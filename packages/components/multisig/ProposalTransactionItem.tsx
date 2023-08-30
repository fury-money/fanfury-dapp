import moment from "moment";
import React, { useMemo, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";

import { ProposalTransactionModal } from "./ProposalTransactionModal";
import { TransactionItemButtons } from "./TransactionItemButtons";
import feedWhiteSVG from "../../../assets/icons/feed_white.svg";
import multisigWhiteSVG from "../../../assets/icons/multisig_white.svg";
import stakingWhiteSVG from "../../../assets/icons/staking_white.svg";
import tnsWhiteSVG from "../../../assets/icons/tns-service_white.svg";
import walletWhiteSVG from "../../../assets/icons/wallet_white.svg";
import { ParsedTransaction } from "../../hooks/multisig/useMultisigTransactions";
import { useNSUserInfo } from "../../hooks/useNSUserInfo";
import {
  getCosmosNetworkByChainId,
  getUserId,
  NetworkInfo,
  NetworkKind,
} from "../../networks";
import { MultisigTransactionType } from "../../screens/Multisig/types";
import { prettyPrice } from "../../utils/coins";
import { AppNavigationProp, useAppNavigation } from "../../utils/navigation";
import {
  neutral17,
  neutral33,
  neutral55,
  neutral77,
  primaryColor,
  secondaryColor,
} from "../../utils/style/colors";
import { fontSemibold13, fontSemibold14 } from "../../utils/style/fonts";
import { layout } from "../../utils/style/layout";
import { tinyAddress } from "../../utils/text";
import { BrandText } from "../BrandText";
import { SVG } from "../SVG";
import { Separator } from "../Separator";
import { AnimationFadeIn } from "../animations";
import { CustomPressable } from "../buttons/CustomPressable";
import { SpacerColumn, SpacerRow } from "../spacer";

export interface ProposalTransactionItemProps extends ParsedTransaction {
  btnSquaresBackgroundColor?: string;
  isUserMultisig?: boolean;
  shouldRetch?: () => void;
}

// FIXME: handle case where there is bad json in the db

export const getTxInfo = (
  msgs: any[],
  navigation: AppNavigationProp,
  network: NetworkInfo | undefined
): [MultisigTransactionType, React.ReactElement, React.ReactElement] => {
  if (msgs.length === 0) {
    return [
      MultisigTransactionType.EMPTY,
      <BrandText style={styles.normal77}> </BrandText>,
      <BrandText style={styles.normal77}> </BrandText>,
    ];
  }
  if (msgs.length > 1) {
    return [
      MultisigTransactionType.COMPLEX,
      <BrandText style={styles.normal77}>{msgs.length} messages</BrandText>,
      <BrandText style={styles.normal77}> </BrandText>,
    ];
  }
  const msg = msgs[0];
  switch (msg.typeUrl) {
    case "/cosmos.bank.v1beta1.MsgSend": {
      const recipientAddress = msg.value.toAddress;
      const amount = msg.value.amount?.[0]?.amount;
      const denom = msg.value.amount?.[0]?.denom;
      return [
        MultisigTransactionType.SEND,
        <View style={styles.rowCenter}>
          <BrandText style={styles.normal77}>Sending to: </BrandText>
          <Pressable
            onPress={() => {
              // TODO: show tns info using reusable component
              const id = getUserId(network?.id, recipientAddress);
              navigation.navigate("UserPublicProfile", { id });
            }}
          >
            <BrandText style={styles.normal}>
              {tinyAddress(recipientAddress, 14)}
            </BrandText>
          </Pressable>
        </View>,
        <View style={styles.rowCenter}>
          <BrandText style={styles.normal77}>Will receive: </BrandText>
          <BrandText style={styles.normal}>
            {prettyPrice(network?.id, amount, denom)}
          </BrandText>
        </View>,
      ];
    }
    case "/cosmos.staking.v1beta1.MsgDelegate": {
      const validatorAddress = msg.value.validatorAddress;
      const amount = msg.value.amount?.amount;
      const denom = msg.value.amount?.denom;
      return [
        MultisigTransactionType.DELEGATE,
        <View style={styles.rowCenter}>
          <BrandText style={styles.normal77}>Delegating to: </BrandText>
          <Pressable
            onPress={() => {
              // TODO: show tns info using reusable component
              const id = getUserId(network?.id, validatorAddress);
              navigation.navigate("UserPublicProfile", { id });
            }}
          >
            <BrandText style={styles.normal}>
              {tinyAddress(validatorAddress, 20)}
            </BrandText>
          </Pressable>
        </View>,
        <View style={styles.rowCenter}>
          <BrandText style={styles.normal77}>Will delegate: </BrandText>
          <BrandText style={styles.normal}>
            {prettyPrice(network?.id, amount, denom)}
          </BrandText>
        </View>,
      ];
    }
    case "/cosmos.staking.v1beta1.MsgUndelegate": {
      const validatorAddress = msg.value.validatorAddress;
      const amount = msg.value.amount?.amount;
      const denom = msg.value.amount?.denom;
      return [
        MultisigTransactionType.UNDELEGATE,
        <View style={styles.rowCenter}>
          <BrandText style={styles.normal77}>Undelegating from: </BrandText>
          <Pressable
            onPress={() => {
              // TODO: show tns info using reusable component
              const id = getUserId(network?.id, validatorAddress);
              navigation.navigate("UserPublicProfile", { id });
            }}
          >
            <BrandText style={styles.normal}>
              {tinyAddress(validatorAddress, 20)}
            </BrandText>
          </Pressable>
        </View>,
        <View style={styles.rowCenter}>
          <BrandText style={styles.normal77}>Will undelegate: </BrandText>
          <BrandText style={styles.normal}>
            {prettyPrice(network?.id, amount, denom)}
          </BrandText>
        </View>,
      ];
    }
    case "/cosmos.staking.v1beta1.MsgBeginRedelegate": {
      const sourceValidatorAddress = msg.value.validatorSrcAddress;
      const destinationValidatorAddress = msg.value.validatorDstAddress;
      const amount = msg.value.amount?.amount;
      const denom = msg.value.amount?.denom;
      return [
        MultisigTransactionType.REDELEGATE,
        <View style={styles.rowCenter}>
          <BrandText style={styles.normal77}>From: </BrandText>
          <Pressable
            onPress={() => {
              // TODO: show tns info using reusable component
              const id = getUserId(network?.id, sourceValidatorAddress);
              navigation.navigate("UserPublicProfile", { id });
            }}
          >
            <BrandText style={styles.normal}>
              {tinyAddress(sourceValidatorAddress, 10)}
            </BrandText>
          </Pressable>
          <BrandText style={styles.normal77}>, To: </BrandText>
          <Pressable
            onPress={() => {
              // TODO: show tns info using reusable component
              const id = getUserId(network?.id, destinationValidatorAddress);
              navigation.navigate("UserPublicProfile", { id });
            }}
          >
            <BrandText style={styles.normal}>
              {tinyAddress(destinationValidatorAddress, 10)}
            </BrandText>
          </Pressable>
        </View>,
        <View style={styles.rowCenter}>
          <BrandText style={styles.normal77}>Will redelegate: </BrandText>
          <BrandText style={styles.normal}>
            {prettyPrice(network?.id, amount, denom)}
          </BrandText>
        </View>,
      ];
    }
    case "/cosmwasm.wasm.v1.MsgExecuteContract": {
      const contractAddress = msg.value.contract;
      let method;
      let txType = MultisigTransactionType.EXECUTE;
      try {
        // TODO: prettify method name
        method = Object.keys(
          JSON.parse(
            Buffer.from(
              Uint8Array.from(Object.values(msg.value.msg))
            ).toString()
          )
        )[0];
      } catch (err) {
        console.error("failed to find method name", err);
        method = "Unknown";
      }
      if (
        network?.kind === NetworkKind.Cosmos &&
        contractAddress === network.nameServiceContractAddress &&
        method === "mint"
      ) {
        txType = MultisigTransactionType.MINT_NAME;
      }
      // if(network?.kind === NetworkKind.Cosmos && contractAddress === network.socialFeedContractAddress && method === "post") {
      //   txType = MultisigTransactionType.CREATE_NEW_POST
      // }
      return [
        txType,
        <View style={styles.rowCenter}>
          <BrandText style={styles.normal77}>Contract: </BrandText>
          <Pressable
            onPress={() => {
              // TODO: show tns info using reusable component
              const id = getUserId(network?.id, contractAddress);
              navigation.navigate("UserPublicProfile", { id });
            }}
          >
            <BrandText style={styles.normal}>
              {tinyAddress(contractAddress, 10)}
            </BrandText>
          </Pressable>
        </View>,
        <View style={styles.rowCenter}>
          <BrandText style={styles.normal77}>Method: </BrandText>
          <BrandText style={styles.normal}>{method}</BrandText>
        </View>,
      ];
    }
    case "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward": {
      const validatorAddress = msg.value.validatorAddress;
      return [
        MultisigTransactionType.CLAIM_REWARD,
        <View style={styles.rowCenter}>
          <BrandText style={styles.normal77}>Validator: </BrandText>
          <Pressable
            onPress={() => {
              // TODO: show tns info using reusable component
              const id = getUserId(network?.id, validatorAddress);
              navigation.navigate("UserPublicProfile", { id });
            }}
          >
            <BrandText style={styles.normal}>
              {tinyAddress(validatorAddress, 20)}
            </BrandText>
          </Pressable>
        </View>,
        <BrandText style={styles.normal77}> </BrandText>,
      ];
    }
  }
  return [
    MultisigTransactionType.UNKNOWN,
    <BrandText style={styles.normal77}>{msg.typeUrl}</BrandText>,
    <BrandText style={styles.normal77}> </BrandText>,
  ];
};

export const ProposalTransactionItem: React.FC<ProposalTransactionItemProps> = (
  props
) => {
  const {
    chainId,
    msgs,
    createdAt,
    fee,
    creatorAddress,
    threshold,
    signatures,
  } = props;
  const navigation = useAppNavigation();
  const network = getCosmosNetworkByChainId(chainId);
  const creatorId = getUserId(network?.id, creatorAddress);
  const tnsMetadata = useNSUserInfo(creatorId);
  const [isHovered, setHovered] = useState(false);
  const [isProposalModalVisible, setProposalModalVisible] = useState(false);
  const approvedByCount = signatures.length || 0;
  const completedPercent = (approvedByCount / threshold) * 100;
  const isCompletelyDeclined = false; /*
    (multisig.userAddresses?.length || 0) -
      approvedByCount -
      currentDecliners.length <
    approvalRequiredCount - approvedByCount;
    */

  const [txName, txInfo, txInfo2] = getTxInfo(msgs, navigation, network);

  const getIcon = useMemo(() => {
    //TODO: Add white icons and use them for each TX type
    switch (txName) {
      case MultisigTransactionType.SEND:
        return walletWhiteSVG;
      case MultisigTransactionType.CREATE_NEW_POST:
        return feedWhiteSVG;
      case MultisigTransactionType.MANAGE_PUBLIC_PROFILE:
        return tnsWhiteSVG;
      case MultisigTransactionType.MINT_NAME:
        return tnsWhiteSVG;
      case MultisigTransactionType.STAKE:
        return stakingWhiteSVG;
      case MultisigTransactionType.REDELEGATE:
        return stakingWhiteSVG;
      case MultisigTransactionType.EXECUTE:
        return multisigWhiteSVG;
      case MultisigTransactionType.CLAIM_REWARD:
        return stakingWhiteSVG;
      case MultisigTransactionType.DELEGATE:
        return stakingWhiteSVG;
      case MultisigTransactionType.UNDELEGATE:
        return stakingWhiteSVG;
      case MultisigTransactionType.UNKNOWN:
        return multisigWhiteSVG;
      default:
        return multisigWhiteSVG;
    }
  }, [txName]);

  /*

  // hooks
  useEffect(() => {
    setCurrentSignatures(signatures?.data || []);
  }, [signatures?.data]);

  */

  // functions
  const addSignature = (signature: unknown) => {
    /*
    setCurrentSignatures((prevState: DbSignature[]) => [
      ...prevState,
      signature,
    ]);
    */
  };

  const addDecliner = (address: string) => {
    //setCurrentDecliners((prevState) => [...prevState, address]);
  };

  // returns
  return (
    <>
      <CustomPressable
        onPress={() => setProposalModalVisible(true)}
        style={[styles.container, isHovered && { backgroundColor: neutral17 }]}
        onHoverIn={() => setHovered(true)}
        onHoverOut={() => setHovered(false)}
      >
        <View style={styles.svgContainer}>
          <SVG source={getIcon} width={32} height={32} />
        </View>

        <View style={[styles.section, { flex: 0.75 }]}>
          <BrandText style={styles.normal}>{txName}</BrandText>
          <SpacerColumn size={0.75} />
          <View style={styles.rowCenter}>
            <BrandText style={styles.small77}>
              {moment(createdAt).format("DD/MM/yyyy")}
            </BrandText>
            <SpacerRow size={0.5} />
            <Separator horizontal />
            <SpacerRow size={0.5} />
            <BrandText style={styles.small77}>
              {moment(createdAt).format("h:mm")}
            </BrandText>
          </View>
        </View>

        <View style={styles.section}>
          {txInfo}
          <SpacerColumn size={0.75} />
          <View style={styles.rowCenter}>
            <BrandText style={styles.normal77}>Created by:</BrandText>
            <SpacerRow size={0.5} />
            {tnsMetadata.loading ? (
              <ActivityIndicator size="small" />
            ) : (
              <AnimationFadeIn>
                <Pressable
                  onPress={() =>
                    navigation.navigate("UserPublicProfile", { id: creatorId })
                  }
                >
                  <BrandText style={styles.smallPrimary}>
                    {tnsMetadata?.metadata?.tokenId
                      ? `@${tnsMetadata?.metadata?.tokenId}`
                      : tinyAddress(creatorAddress, 14)}
                  </BrandText>
                </Pressable>
              </AnimationFadeIn>
            )}
          </View>
        </View>

        <View style={styles.section}>
          {txInfo2}
          <SpacerColumn size={0.75} />
          <View style={styles.rowCenter}>
            <BrandText style={styles.normal77}>Network fee:</BrandText>
            <SpacerRow size={0.5} />
            <BrandText style={styles.small77}>
              {prettyPrice(
                network?.id,
                fee.amount[0]?.amount,
                fee.amount[0]?.denom
              )}
            </BrandText>
          </View>
        </View>

        <View style={[styles.section, { flex: 1.5 }]}>
          <View style={styles.rowCenter}>
            <BrandText style={styles.normal77}>Approved by:</BrandText>
            <SpacerRow size={0.5} />
            <BrandText style={styles.normal}>{approvedByCount}</BrandText>
            <SpacerRow size={0.5} />
            <BrandText style={styles.normal77}>of</BrandText>
            <SpacerRow size={0.5} />
            <BrandText style={styles.normal}>{threshold}</BrandText>
            <SpacerRow size={0.5} />
            <BrandText style={styles.normal77}>
              ({threshold - approvedByCount} required)
            </BrandText>
          </View>
          <SpacerColumn size={1.5} />
          <View style={styles.loadingOutside}>
            <View
              style={[
                styles.loadingInside,
                {
                  width: `${completedPercent}%`,
                },
              ]}
            />
          </View>
        </View>

        <TransactionItemButtons
          {...props}
          currentDecliners={/*currentDecliners*/ []}
          addSignature={addSignature}
          addDecliner={addDecliner}
          isCompletelyDeclined={isCompletelyDeclined}
          btnSquaresBackgroundColor={
            isHovered ? neutral17 : props.btnSquaresBackgroundColor
          }
        />
      </CustomPressable>

      <ProposalTransactionModal
        visible={isProposalModalVisible}
        onClose={() => setProposalModalVisible(false)}
        transaction={props}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    borderBottomWidth: 1,
    borderColor: neutral33,
    flex: 1,
  },
  section: { flex: 1, paddingRight: layout.padding_x1_5 },
  svgContainer: { padding: layout.padding_x2 },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  normal77: StyleSheet.flatten([fontSemibold14, { color: neutral77 }]),
  small77: StyleSheet.flatten([fontSemibold13, { color: neutral77 }]),
  smallPrimary: StyleSheet.flatten([fontSemibold13, { color: primaryColor }]),
  normal: StyleSheet.flatten(fontSemibold14),
  small: StyleSheet.flatten(fontSemibold13),
  loadingOutside: {
    height: 6,
    width: 207,
    backgroundColor: neutral55,
  },
  loadingInside: {
    height: 6,
    backgroundColor: secondaryColor,
  },
});