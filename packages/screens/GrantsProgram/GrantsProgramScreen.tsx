import React, { useState } from "react";
import { View } from "react-native";

import { GrantBox } from "./components/GrantBox";
import filterSVG from "../../../assets/icons/filter.svg";
import { BrandText } from "../../components/BrandText";
import { FlexRow } from "../../components/FlexRow";
import { ScreenContainer } from "../../components/ScreenContainer";
import { SearchBarInput } from "../../components/Search/SearchBarInput";
import { Separator } from "../../components/Separator";
import { IconButton } from "../../components/buttons/IconButton";
import { SimpleButton } from "../../components/buttons/SimpleButton";
import { SpacerColumn, SpacerRow } from "../../components/spacer";
import { ScreenFC } from "../../utils/navigation";
import {
  neutral00,
  neutral33,
  primaryColor,
  secondaryColor,
} from "../../utils/style/colors";
import { fontSemibold20, fontSemibold28 } from "../../utils/style/fonts";
import { layout } from "../../utils/style/layout";

export const GrantsProgramScreen: ScreenFC<"GrantsProgram"> = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <ScreenContainer
      isLarge
      responsive
      headerChildren={
        <BrandText style={fontSemibold20}>Grants Program</BrandText>
      }
    >
      <FlexRow
        style={{
          marginTop: layout.padding_x4,
          justifyContent: "space-between",
        }}
      >
        <BrandText style={fontSemibold28}>Grants Program</BrandText>

        <SimpleButton
          outline
          text="Create a Grant"
          color={primaryColor}
          size="SM"
        />
      </FlexRow>

      <Separator style={{ marginTop: layout.padding_x2 }} />

      <FlexRow style={{ justifyContent: "space-between", flexWrap: "wrap" }}>
        <FlexRow style={{ width: "auto", marginTop: layout.padding_x2 }}>
          <SimpleButton
            text="All"
            color={neutral00}
            bgColor={secondaryColor}
            size="SM"
            style={{ borderWidth: 0 }}
          />
          <SpacerRow size={2} />
          <SimpleButton
            text="Open"
            size="SM"
            bgColor="#C8FFAE1A"
            color="#C8FFAE"
            style={{ borderWidth: 0 }}
          />
          <SpacerRow size={2} />
          <SimpleButton
            text="In Progress"
            size="SM"
            bgColor="#EAA54B1A"
            color="#EAA54B"
            style={{ borderWidth: 0 }}
          />
          <SpacerRow size={2} />
          <SimpleButton
            text="Past Grants"
            size="SM"
            bgColor="#171717"
            color={secondaryColor}
            style={{ borderWidth: 0 }}
          />
        </FlexRow>

        <FlexRow style={{ width: "auto", marginTop: layout.padding_x2 }}>
          <SearchBarInput
            placeholder="Search for grant..."
            text={searchText}
            onChangeText={setSearchText}
          />
          <SpacerRow size={1} />
          <IconButton
            iconSVG={filterSVG}
            size="SM"
            noBrokenCorners
            backgroundColor={neutral33}
          />
        </FlexRow>
      </FlexRow>

      <FlexRow
        style={{
          width: "100%",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {[1, 2, 3, 4, 5, 6, 7].map(() => {
          return (
            <GrantBox
              containerStyle={{
                marginTop: layout.padding_x2,
                marginRight: layout.padding_x2,
              }}
            />
          );
        })}
      </FlexRow>
    </ScreenContainer>
  );
};
