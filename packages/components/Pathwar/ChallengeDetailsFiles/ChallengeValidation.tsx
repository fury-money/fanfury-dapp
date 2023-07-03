import React, { useState } from "react";
import { Image, View } from "react-native";

import challengePic1 from "../../../../assets/PathwarIllustration/challenge1.png";
import challengePic10 from "../../../../assets/PathwarIllustration/challenge10.png";
import challengePic11 from "../../../../assets/PathwarIllustration/challenge11.png";
import challengePic12 from "../../../../assets/PathwarIllustration/challenge12.png";
import challengePic2 from "../../../../assets/PathwarIllustration/challenge2.png";
import challengePic3 from "../../../../assets/PathwarIllustration/challenge3.png";
import challengePic4 from "../../../../assets/PathwarIllustration/challenge4.png";
import challengePic5 from "../../../../assets/PathwarIllustration/challenge5.png";
import challengePic6 from "../../../../assets/PathwarIllustration/challenge6.png";
import challengePic7 from "../../../../assets/PathwarIllustration/challenge7.png";
import challengePic8 from "../../../../assets/PathwarIllustration/challenge8.png";
import challengePic9 from "../../../../assets/PathwarIllustration/challenge9.png";
import checkSvg from "../../../../assets/icons/Pathwar/checkIcon.svg";
import clockSvg from "../../../../assets/icons/Pathwar/clockIcon.svg";
import diamondSvg from "../../../../assets/icons/Pathwar/diamondIcon.svg";
import starSvg from "../../../../assets/icons/Pathwar/starIcon.svg";
import teritoriSvg from "../../../../assets/icons/Pathwar/teritori.svg";
import {
  neutral00,
  neutral17,
  neutral44,
  neutral77,
  primaryColor,
  secondaryColor,
  successColor,
} from "../../../utils/style/colors";
import {
  fontSemibold12,
  fontSemibold13,
  fontSemibold16,
} from "../../../utils/style/fonts";
import { layout } from "../../../utils/style/layout";
import { BrandText } from "../../BrandText";
import FlexRow from "../../FlexRow";
import { SVG } from "../../SVG";
import { Separator } from "../../Separator";
import { TertiaryBox } from "../../boxes/TertiaryBox";
import { ModalGradient } from "../../modals/ModalGradient";

const listPictures = [
  challengePic1,
  challengePic2,
  challengePic3,
  challengePic4,
  challengePic5,
  challengePic6,
  challengePic7,
  challengePic8,
  challengePic9,
  challengePic10,
  challengePic11,
  challengePic12,
];

export const ChallengeValidation: React.FC<{
  visible?: boolean;
  onClose: () => void;
  title: string;
  description: string;
  tags: string[];
  reward: string;
  indexPicture: number;
}> = ({ visible, onClose, title, description, tags, reward, indexPicture }) => {
  const [displayConfirmation, setDisplayConfirmation] = useState(visible);

  function handleConfirmClick() {
    onClose();
    setDisplayConfirmation(false);
  }

  return (
    <ModalGradient
      onClose={() => {
        handleConfirmClick();
      }}
      label="You have successfully passed this challenge"
      visible={displayConfirmation}
      width={500}
      labelColor={successColor}
      hideMainSeparator
      ColorLinearGradient={[neutral00, successColor]}
    >
      <TertiaryBox
        width={458}
        style={{ marginBottom: layout.padding_x2_5 }}
        mainContainerStyle={{ backgroundColor: neutral17 }}
        squaresBackgroundColor={successColor}
      >
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: layout.padding_x1_5,
            marginBottom: layout.padding_x2_5,
          }}
        >
          <TertiaryBox
            width={430}
            height={350}
            squaresBackgroundColor={neutral17}
            style={{ marginBottom: layout.padding_x2_5 }}
          >
            <Image
              source={listPictures[indexPicture]}
              style={{
                width: 428,
                height: 348,
                borderTopRightRadius: 7,
                borderBottomLeftRadius: 7,
              }}
            />
          </TertiaryBox>

          <View
            style={{
              flexDirection: "column",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: layout.padding_x1_5,
                width: 390,
              }}
            >
              <View style={{ flexDirection: "column", width: 270 }}>
                <BrandText style={[{ color: secondaryColor }, fontSemibold16]}>
                  {title}
                </BrandText>
                <BrandText
                  style={[
                    { color: neutral77, marginTop: layout.padding_x0_5 },
                    fontSemibold13,
                  ]}
                >
                  {description}
                </BrandText>
              </View>
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    backgroundColor: neutral77,
                    width: "fit-content",
                    height: "fit-content",
                    borderRadius: 100,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <BrandText
                    style={[
                      {
                        color: secondaryColor,
                        paddingLeft: layout.padding_x1_5,
                        paddingRight: layout.padding_x1_5,
                        paddingTop: layout.padding_x0_5,
                        paddingBottom: layout.padding_x0_5,
                      },
                      fontSemibold13,
                    ]}
                  >
                    Open
                  </BrandText>
                </View>
              </View>
            </View>
            <Separator
              style={{
                marginBottom: layout.padding_x2,
                width: 390,
              }}
              color={neutral44}
            />

            <View
              style={{
                width: 390,
                flexDirection: "row",
                marginBottom: layout.padding_x1,
                flexWrap: "wrap",
              }}
            >
              {tags.map((tag, index) => (
                <View
                  style={{
                    width: "fit-content",
                    height: "fit-content",
                    borderColor: neutral44,
                    borderWidth: 1,
                    borderRadius: 6,
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: layout.padding_x1,
                    marginBottom: layout.padding_x1,
                  }}
                  key={index}
                >
                  <BrandText
                    style={[
                      {
                        color: neutral77,
                        paddingRight: layout.padding_x1,
                        paddingLeft: layout.padding_x1,
                        paddingBottom: layout.padding_x0_25,
                        paddingTop: layout.padding_x0_25,
                      },
                      fontSemibold12,
                    ]}
                  >
                    {tag}
                  </BrandText>
                </View>
              ))}
            </View>

            <Separator
              style={{
                marginBottom: layout.padding_x2,
                width: 390,
              }}
              color={neutral44}
            />

            <BrandText
              style={[
                { color: neutral77, marginBottom: layout.padding_x0_5 },
                fontSemibold13,
              ]}
            >
              Statistics about this challenge:
            </BrandText>

            <FlexRow>
              <View style={{ width: 200 }}>
                <FlexRow alignItems="center" style={{ marginBottom: 8 }}>
                  <SVG source={checkSvg} />
                  <BrandText
                    style={[
                      { color: secondaryColor },
                      fontSemibold12,
                      { marginLeft: 10 },
                    ]}
                  >
                    2458 pirates solved it
                  </BrandText>
                </FlexRow>
                <FlexRow alignItems="center" style={{ marginBottom: 8 }}>
                  <SVG source={starSvg} />
                  <BrandText
                    style={[
                      { color: secondaryColor },
                      fontSemibold12,
                      { marginLeft: 10 },
                    ]}
                  >
                    Current Star pirate is x0x0_
                  </BrandText>
                </FlexRow>
              </View>
              <View>
                <FlexRow alignItems="center" style={{ marginBottom: 8 }}>
                  <SVG source={clockSvg} />
                  <BrandText
                    style={[
                      { color: secondaryColor },
                      fontSemibold12,
                      { marginLeft: 10 },
                    ]}
                  >
                    Average duration: 4’42
                  </BrandText>
                </FlexRow>
                <FlexRow alignItems="center" style={{ marginBottom: 8 }}>
                  <SVG source={diamondSvg} />
                  <BrandText
                    style={[
                      { color: secondaryColor },
                      fontSemibold12,
                      { marginLeft: 10 },
                    ]}
                  >
                    Related booty
                  </BrandText>
                </FlexRow>
              </View>
            </FlexRow>
            <TertiaryBox
              fullWidth
              height={67}
              squaresBackgroundColor={neutral17}
            >
              <FlexRow style={{ paddingHorizontal: layout.padding_x1_5 }}>
                <View style={{ width: 190 }}>
                  <FlexRow alignItems="center" style={{ marginBottom: 10 }}>
                    <BrandText
                      style={[{ color: secondaryColor }, fontSemibold12]}
                    >
                      Top#1:{" "}
                    </BrandText>
                    <BrandText
                      style={[{ color: primaryColor }, fontSemibold12]}
                    >
                      m1ch3l
                    </BrandText>
                  </FlexRow>
                  <FlexRow alignItems="center">
                    <BrandText
                      style={[{ color: secondaryColor }, fontSemibold12]}
                    >
                      Top#3:{" "}
                    </BrandText>
                    <BrandText
                      style={[{ color: primaryColor }, fontSemibold12]}
                    >
                      gi4RRLLy
                    </BrandText>
                  </FlexRow>
                </View>
                <View>
                  <FlexRow alignItems="center" style={{ marginBottom: 10 }}>
                    <BrandText
                      style={[{ color: secondaryColor }, fontSemibold12]}
                    >
                      Top#2:{" "}
                    </BrandText>
                    <BrandText
                      style={[{ color: primaryColor }, fontSemibold12]}
                    >
                      m1ch3l
                    </BrandText>
                  </FlexRow>
                  <FlexRow alignItems="center">
                    <BrandText
                      style={[
                        { color: secondaryColor },
                        fontSemibold12,
                        { marginRight: 5 },
                      ]}
                    >
                      50
                    </BrandText>
                    <SVG source={teritoriSvg} />
                    <BrandText
                      style={[
                        { color: primaryColor },
                        fontSemibold12,
                        { marginLeft: 5 },
                      ]}
                    >
                      Rewards
                    </BrandText>
                  </FlexRow>
                </View>
              </FlexRow>
            </TertiaryBox>
          </View>
        </View>
      </TertiaryBox>
    </ModalGradient>
  );
};