import React, { useState } from "react";
import { Pressable, View } from "react-native";

import secondaryCardSmSVG from "../../assets/cards/secondary-card-sm.svg";
import { useAreThereWallets } from "../hooks/useAreThereWallets";
import { fontSemibold14 } from "../utils/style/fonts";
import { headerMarginHorizontal } from "../utils/style/layout";
import { BrandText } from "./BrandText";
import { SVG } from "./SVG";
import { TopMenu } from "./TopMenu/TopMenu";
import { ConnectWalletModal } from "./connectWallet/ConnectWalletModal";

const HEIGHT = 40;
const WIDTH = 220;

export const ConnectWalletButton = () => {
  // variables
  const areThereWallets = useAreThereWallets();
  const [isConnectWalletVisible, setIsConnectWalletVisible] = useState(false);

  // functions
  const toggleConnectWallet = () =>
    setIsConnectWalletVisible(!isConnectWalletVisible);

  // returns
  return (
    <>
      <View style={{ marginRight: headerMarginHorizontal }}>
        {areThereWallets ? (
          <TopMenu />
        ) : (
          <Pressable onPress={toggleConnectWallet}>
            <SVG
              width={WIDTH}
              height={HEIGHT}
              source={secondaryCardSmSVG}
              style={{ position: "absolute" }}
            />

            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                height: HEIGHT,
                minHeight: HEIGHT,
                width: WIDTH,
                minWidth: WIDTH,
              }}
            >
              <BrandText style={fontSemibold14}>Connect wallet</BrandText>
            </View>
          </Pressable>
        )}
      </View>
      <ConnectWalletModal
        visible={isConnectWalletVisible}
        onClose={toggleConnectWallet}
      />
    </>
  );
};