import { createMultisigThresholdPubkey } from "@cosmjs/amino";
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

import { MultisigSection } from "./components/MultisigSection";
import { CreateMultisigWalletFormType } from "./types";
import trashSVG from "../../../assets/icons/trash.svg";
import walletInputSVG from "../../../assets/icons/wallet-input.svg";
import { BrandText } from "../../components/BrandText";
import { NetworkIcon } from "../../components/NetworkIcon";
import { SVG } from "../../components/SVG";
import { ScreenContainer } from "../../components/ScreenContainer";
import { PrimaryButton } from "../../components/buttons/PrimaryButton";
import { SecondaryButton } from "../../components/buttons/SecondaryButton";
import { SearchNSInputContainer } from "../../components/inputs/SearchNSInputContainer";
import {
  SelectInput,
  SelectInputData,
} from "../../components/inputs/SelectInput";
import { TextInputCustom } from "../../components/inputs/TextInputCustom";
import { TextInputOutsideLabel } from "../../components/inputs/TextInputOutsideLabel";
import { SpacerColumn, SpacerRow } from "../../components/spacer";
import { useFeedbacks } from "../../context/FeedbacksProvider";
import { useMultisigHelpers } from "../../hooks/multisig";
import { useMultisigClient } from "../../hooks/multisig/useMultisigClient";
import { useSelectedNetworkInfo } from "../../hooks/useSelectedNetwork";
import useSelectedWallet from "../../hooks/useSelectedWallet";
import {
  NetworkKind,
  allNetworks,
  getUserId,
  selectableCosmosNetworks,
} from "../../networks";
import { selectMultisigToken } from "../../store/slices/settings";
import { RootState } from "../../store/store";
import {
  getNSAddress,
  patternOnlyNumbers,
  validateAddress,
  validateMaxNumber,
  validateNS,
} from "../../utils/formRules";
import { useAppNavigation } from "../../utils/navigation";
import {
  neutral33,
  neutral77,
  neutralA3,
  trashBackground,
} from "../../utils/style/colors";
import {
  fontSemibold13,
  fontSemibold14,
  fontSemibold20,
  fontSemibold28,
} from "../../utils/style/fonts";
import { layout } from "../../utils/style/layout";

const emptyPubKeyGroup = () => ({ address: "", compressedPubkey: "" });

export const MultisigCreateScreen = () => {
  const { selectedWallet } = useSelectedWallet();
  const authToken = useSelector((state: RootState) =>
    selectMultisigToken(state, selectedWallet?.address)
  );
  const { wrapWithFeedback } = useFeedbacks();
  const { control, handleSubmit, watch, setValue } =
    useForm<CreateMultisigWalletFormType>();
  const [addressIndexes, setAddressIndexes] = useState([
    emptyPubKeyGroup(),
    emptyPubKeyGroup(),
  ]);
  const navigation = useAppNavigation();
  const signatureRequiredValue = watch("signatureRequired");
  const { getPubkeyFromNode } = useMultisigHelpers();
  const defaultNbSignaturesRequired = useMemo(
    () => addressIndexes.length.toString(),
    [addressIndexes.length]
  );
  const multisigClient = useMultisigClient();

  const globalSelectedNetwork = useSelectedNetworkInfo();
  const [selectedInputData, setSelectedInputData] = useState<SelectInputData>({
    label: globalSelectedNetwork?.displayName || "",
    value: globalSelectedNetwork?.id || "",
    iconComponent: (
      <NetworkIcon networkId={globalSelectedNetwork?.id} size={16} />
    ),
  });
  const selectedNetwork = useMemo(
    () => allNetworks.find((n) => selectedInputData.value === n.id),
    [selectedInputData.value]
  );

  // functions
  const removeAddressField = (index: number) => {
    const copyIndexes = [...addressIndexes];
    copyIndexes.splice(index, 1);
    setAddressIndexes(copyIndexes);
  };

  const addAddressField = () => {
    setAddressIndexes([...addressIndexes, emptyPubKeyGroup()]);
  };

  const onSubmit = async ({
    signatureRequired,
    name,
  }: CreateMultisigWalletFormType) => {
    if (!selectedNetwork) {
      throw new Error("No network selected");
    }

    const compressedPubkeys = addressIndexes.map(
      (item) => item.compressedPubkey
    );
    const pubkeys = compressedPubkeys.map((compressedPubkey) => {
      return {
        type: "tendermint/PubKeySecp256k1",
        value: compressedPubkey,
      };
    });
    const multisigPubkey = createMultisigThresholdPubkey(
      pubkeys,
      parseInt(signatureRequired, 10)
    );

    const res = await multisigClient.CreateOrJoinMultisig({
      authToken,
      chainId: selectedNetwork.chainId,
      bech32Prefix: selectedNetwork.addressPrefix,
      multisigPubkeyJson: JSON.stringify(multisigPubkey),
      name,
    });

    console.log("res", res);

    navigation.navigate("MultisigWalletDashboard", {
      id: getUserId(selectedNetwork?.id, res.multisigAddress),
    });
  };

  const onAddressChange = async (index: number, value: string) => {
    const resValAddress = validateAddress(value);
    const resNsAddress = validateNS(value);

    if (resValAddress !== true && resNsAddress !== true)
      return "Invalid address";

    let address = "";
    if (resValAddress === true) {
      address = value;
    } else {
      const nsAddrInfo = await getNSAddress(value, selectedNetwork?.id || "");
      if (!nsAddrInfo.status) {
        return nsAddrInfo.msg;
      }
      address = nsAddrInfo.address!;
    }

    if (addressIndexes.find((a, i) => a.address === address && i !== index))
      return "This address is already used in this form.";

    try {
      const tempPubkeys = [...addressIndexes];
      const pubkey = await getPubkeyFromNode(address);
      tempPubkeys[index].address = address;
      tempPubkeys[index].compressedPubkey = pubkey;
      setAddressIndexes(tempPubkeys);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return error.message;
      } else {
        return `${error}`;
      }
    }
  };

  // returns
  return (
    <ScreenContainer
      isHeaderSmallMargin
      headerChildren={
        <BrandText style={fontSemibold20}>Multisig Wallet</BrandText>
      }
      onBackPress={() =>
        navigation.canGoBack()
          ? navigation.goBack()
          : navigation.navigate("Multisig")
      }
      footerChildren={<></>}
      noMargin
      fullWidth
      noScroll
      forceNetworkKind={NetworkKind.Cosmos}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.formContainer}>
          <BrandText style={fontSemibold28}>Create a Legacy Multisig</BrandText>
          <SpacerColumn size={2.5} />
          <MultisigSection
            title="What is a Multisignature Wallet?"
            containerStyle={styles.descriptionContainer}
          >
            <BrandText style={[fontSemibold13, { color: neutralA3 }]}>
              This wallet adress is owned managed by at least 2 different
              addresses and require signatures from co-owners to execute a
              transaction.
            </BrandText>
          </MultisigSection>
          <SpacerColumn size={3} />
          <TextInputCustom<CreateMultisigWalletFormType>
            name="name"
            control={control}
            variant="labelOutside"
            noBrokenCorners
            label="Multisig name"
            rules={{
              required: true,
            }}
            placeHolder="Type the name of the multisig"
            iconSVG={walletInputSVG}
          />
          <SpacerColumn size={3} />
          <SelectInput
            data={selectableCosmosNetworks.map((n) => {
              return {
                label: n.displayName,
                value: n.id,
                iconComponent: <NetworkIcon networkId={n?.id} size={16} />,
              };
            })}
            selectedData={selectedInputData}
            setData={(d: SelectInputData) => {
              setSelectedInputData(d);
            }}
            label="Network"
          />
          <SpacerColumn size={2.5} />

          {addressIndexes.map((_, index) => (
            <>
              <View key={index.toString()}>
                <SearchNSInputContainer
                  searchText={watch(`addresses.${index}.address`)}
                  onPressName={(address) =>
                    setValue(`addresses.${index}.address`, address)
                  }
                >
                  <TextInputCustom<CreateMultisigWalletFormType>
                    defaultValue={index === 0 ? selectedWallet?.address : ""}
                    control={control}
                    name={`addresses.${index}.address`}
                    variant="labelOutside"
                    noBrokenCorners
                    label={"Address #" + (index + 1)}
                    rules={{
                      required: true,
                      validate: (value) => onAddressChange(index, value),
                    }}
                    placeHolder="Account address"
                    iconSVG={walletInputSVG}
                  >
                    {addressIndexes.length > 2 && (
                      <Pressable
                        style={styles.trashContainer}
                        onPress={() => removeAddressField(index)}
                      >
                        <SVG source={trashSVG} width={12} height={12} />
                      </Pressable>
                    )}
                  </TextInputCustom>
                </SearchNSInputContainer>
              </View>
              <SpacerColumn size={2.5} />
            </>
          ))}
          <View style={styles.row}>
            <SecondaryButton
              size="M"
              text="Add another address"
              onPress={addAddressField}
            />
          </View>
          <SpacerColumn size={2.5} />
          <View style={styles.signatureContainer}>
            <TextInputOutsideLabel
              label="Number of Signatures required"
              isAsterickSign
            />
            <View style={styles.rowCenter}>
              <TextInputCustom<CreateMultisigWalletFormType>
                defaultValue={defaultNbSignaturesRequired}
                control={control}
                noBrokenCorners
                name="signatureRequired"
                label=""
                hideLabel
                width={80}
                rules={{
                  required: true,
                  pattern: patternOnlyNumbers,
                  validate: (value) =>
                    validateMaxNumber(value, addressIndexes.length),
                }}
                errorStyle={{ paddingLeft: layout.padding_x1_5 }}
              />
              <SpacerRow size={2} />
              <BrandText style={[fontSemibold14, { color: neutral77 }]}>
                signatures required on total of
              </BrandText>
              <SpacerRow size={2} />
              <TextInputCustom<CreateMultisigWalletFormType>
                control={control}
                noBrokenCorners
                name="maxSignature"
                label=""
                hideLabel
                width={80}
                defaultValue={defaultNbSignaturesRequired}
                disabled
              />
            </View>
          </View>

          <BrandText style={[fontSemibold14, { color: neutral77 }]}>
            This means that each transaction this multisig makes will require{" "}
            {signatureRequiredValue || defaultNbSignaturesRequired} of the
            members to sign it for it to be accepted by the validators.
          </BrandText>

          <SpacerColumn size={2.5} />

          <View
            style={{
              borderTopWidth: 1,
              borderColor: neutral33,
              paddingTop: layout.padding_x2_5,
              zIndex: 1,
            }}
          />

          <SpacerColumn size={3} />

          <View style={styles.row}>
            <PrimaryButton
              size="XL"
              text="Create Multisig"
              onPress={handleSubmit((arg) =>
                wrapWithFeedback(() => onSubmit(arg))()
              )}
              loader
            />
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: layout.contentPadding,
    paddingTop: layout.topContentPaddingWithHeading,
  },
  rowSB: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  formContainer: {
    height: "100%",
    maxWidth: 793,
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  signatureContainer: {
    paddingVertical: layout.padding_x2_5,
    borderTopWidth: 1,
    borderColor: neutral33,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: 793,
  },
  trashContainer: {
    height: 32,
    width: 32,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: trashBackground,
    position: "absolute",
    right: 0,
  },
  smallInputContainerStyle: {
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  textCenter: { textAlign: "center" },
  row: { flexDirection: "row" },
  descriptionContainer: {
    maxWidth: 487,
  },
});
