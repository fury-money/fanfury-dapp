import React from "react";
import { View, TouchableOpacity } from "react-native";

import pwn from "../../../../assets/icons/Pathwar/PathwarCoin/pwn.svg";
import checkIcon from "../../../../assets/icons/Pathwar/checkIcon.svg";
import clockIcon from "../../../../assets/icons/Pathwar/clockIcon.svg";
import { BrandText } from "../../../components/BrandText";
import { SVG } from "../../../components/SVG";
import { Separator } from "../../../components/Separator";
import { TertiaryBox } from "../../../components/boxes/TertiaryBox";
import {
  neutral44,
  hardColor,
  secondaryColor,
  neutral17,
  neutral77,
  neutral00,
} from "../../../utils/style/colors";
import {
  fontSemibold12,
  fontSemibold13,
  fontSemibold14,
  fontSemibold16,
} from "../../../utils/style/fonts";
import { layout } from "../../../utils/style/layout";

export const TournamentBox: React.FC<object> = () => {
  return (
    <TertiaryBox
      mainContainerStyle={{ backgroundColor: neutral17 }}
      style={{
        marginBottom: layout.padding_x2_5,
        marginLeft: layout.padding_x1,
        marginRight: layout.padding_x1,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          marginTop: layout.padding_x2,
          marginBottom: layout.padding_x2,
          marginLeft: layout.padding_x2,
          marginRight: layout.padding_x2,
          alignItems: "center",
        }}
      >
        <View
          style={{ flexDirection: "column", marginRight: layout.padding_x1_5 }}
        >
          <TertiaryBox
            width={200}
            height={200}
            squaresBackgroundColor={neutral17}
          >
            {/* img */}
          </TertiaryBox>
          <TertiaryBox
            width={200}
            height={47}
            squaresBackgroundColor={neutral17}
            style={{ marginTop: layout.padding_x1_5 }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                width: "100%",
              }}
            >
              <BrandText style={[{ color: neutral77 }, fontSemibold13]}>
                Price
              </BrandText>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  alignContent: "center",
                }}
              >
                <BrandText style={[{ color: secondaryColor }, fontSemibold13]}>
                  $1 {/* {price ? "$" + price : "Free"} */}
                </BrandText>
                {/* {price ? ( */}
                <SVG
                  source={pwn}
                  width={42}
                  height={42}
                  style={{ marginBottom: layout.padding_x0_25 }}
                />
                {/* // ) : null} */}
              </View>
            </View>
          </TertiaryBox>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: layout.padding_x1_5,
            }}
          >
            <TouchableOpacity>
              <TertiaryBox
                width={110}
                height={40}
                squaresBackgroundColor={neutral17}
                mainContainerStyle={{ backgroundColor: secondaryColor }}
              >
                <BrandText style={[{ color: neutral00 }, fontSemibold14]}>
                  Enter
                </BrandText>
              </TertiaryBox>
            </TouchableOpacity>
            <TouchableOpacity>
              <TertiaryBox
                width={80}
                height={40}
                squaresBackgroundColor={neutral17}
                mainContainerStyle={{ borderColor: secondaryColor }}
              >
                <BrandText style={[{ color: secondaryColor }, fontSemibold14]}>
                  More
                </BrandText>
              </TertiaryBox>
            </TouchableOpacity>
          </View>
        </View>

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
              width: 260,
            }}
          >
            <View style={{ flexDirection: "column", width: "100%" }}>
              <BrandText style={[{ color: secondaryColor }, fontSemibold16]}>
                Wild Top50 Contest
              </BrandText>
              <BrandText
                style={[
                  { color: neutral77, marginTop: layout.padding_x0_5 },
                  fontSemibold13,
                ]}
              >
                Reserved to the Top50 members!
              </BrandText>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  backgroundColor: "#FF5C001A",
                  width: "fit-content",
                  height: "fit-content",
                  borderRadius: 100,
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: layout.padding_x1_5,
                }}
              >
                <BrandText
                  style={[
                    {
                      color: hardColor,
                      paddingLeft: layout.padding_x1_5,
                      paddingRight: layout.padding_x1_5,
                      paddingTop: layout.padding_x0_5,
                      paddingBottom: layout.padding_x0_5,
                    },
                    fontSemibold13,
                  ]}
                >
                  Hard+
                </BrandText>
              </View>
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
              marginBottom: layout.padding_x1_5,
              flexWrap: "wrap",
            }}
          >
            <BrandText style={[{ color: neutral77 }, fontSemibold13]}>
              This tournament is a premium online hackathon contest for best
              pirates of the platform. Join the competitors for a 3 days of
              cyberwar, dangerous investigations and intense challenges
            </BrandText>
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
            Details about this tournament:
          </BrandText>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <View>
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: layout.padding_x0_5,
                }}
              >
                <SVG source={checkIcon} />
                <BrandText
                  style={[
                    { color: secondaryColor, marginLeft: layout.padding_x1_5 },
                    fontSemibold12,
                  ]}
                >
                  31 pirates joined it
                </BrandText>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginBottom: layout.padding_x0_5,
              }}
            >
              <SVG source={clockIcon} />
              <BrandText
                style={[
                  { color: secondaryColor, marginLeft: layout.padding_x1_5 },
                  fontSemibold12,
                ]}
              >
                Duration: 3 days
              </BrandText>
            </View>
          </View>

          <View style={{ width: "100%" }}>
            <TertiaryBox
              height={42}
              squaresBackgroundColor={neutral17}
              style={{ marginTop: layout.padding_x1_5, alignSelf: "center" }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  width: "fit-content",
                  paddingLeft: layout.padding_x3_5,
                  paddingRight: layout.padding_x3_5,
                }}
              >
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <BrandText
                      style={[
                        { color: neutral77, marginRight: layout.padding_x2 },
                        fontSemibold13,
                      ]}
                    >
                      Reward
                    </BrandText>
                    <BrandText
                      style={[
                        {
                          color: secondaryColor,
                          marginLeft: layout.padding_x0_5,
                        },
                        fontSemibold12,
                      ]}
                    >
                      $1 {/* ${reward} */}
                    </BrandText>
                    <SVG
                      source={pwn}
                      width={30}
                      height={30}
                      style={{ marginBottom: layout.padding_x0_25 }}
                    />
                  </View>
                </View>
              </View>
            </TertiaryBox>
          </View>
        </View>
      </View>
    </TertiaryBox>
  );
};