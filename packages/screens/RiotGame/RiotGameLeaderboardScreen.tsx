import React, { useEffect, useState } from "react";
import { StyleSheet, ImageBackground, FlatList, Image } from "react-native";

import avatarPNG from "../../../assets/game/avatar.png";
import jumbotronPNG from "../../../assets/game/leaderboard-jumbotron.png";
import badgeSVG from "../../../assets/icons/badge.svg";
import cryptoLogoSVG from "../../../assets/icons/crypto-logo.svg";
import volDownSVG from "../../../assets/icons/vol-down.svg";
import volUpSVG from "../../../assets/icons/vol-up.svg";
import logoSVG from "../../../assets/logos/logo-white.svg";
import { LeaderboardResponse, UserScore } from "../../api/p2e/v1/p2e";
import { BrandText } from "../../components/BrandText";
import { SVG } from "../../components/SVG";
import { tinyAddress } from "../../components/WalletSelector";
import { TertiaryBox } from "../../components/boxes/TertiaryBox";
import Col from "../../components/grid/Col";
import Row from "../../components/grid/Row";
import { SpacerColumn, SpacerRow } from "../../components/spacer";
import { useTNSMetadata } from "../../hooks/useTNSMetadata";
import { p2eBackendClient } from "../../utils/backend";
import { parseUserScoreInfo } from "../../utils/game";
import {
  additionalGreen,
  additionalRed,
  neutral33,
  neutral77,
  primaryColor,
} from "../../utils/style/colors";
import { fontSemibold12, fontSemibold28 } from "../../utils/style/fonts";
import { spacing } from "../../utils/style/spacing";
import { GameContentView } from "./component/GameContentView";
import { THE_RIOT_COLLECTION_ID } from "./settings";

type RankProps = {
  changes: number;
};
type PlayerNameProps = {
  userId: string;
};

const PlayerName: React.FC<PlayerNameProps> = ({ userId }) => {
  const address = userId.split("-")[1];
  const tnsMetadata = useTNSMetadata(address);

  const name = tinyAddress(tnsMetadata?.metadata?.tokenId || address || "");

  return (
    <Row width="auto" alignItems="center">
      <Image style={{ width: 32, height: 32 }} source={avatarPNG} />
      <BrandText style={[styles.colData, spacing.ml_1]}>{name}</BrandText>
      <SVG
        width={16}
        height={16}
        color={primaryColor}
        source={badgeSVG}
        style={spacing.ml_1}
      />
    </Row>
  );
};

const Rank: React.FC<RankProps> = ({ changes }) => {
  if (changes === 0) {
    return <BrandText style={[styles.colData, spacing.ml_3]}>0</BrandText>;
  }

  const rankColor = changes >= 0 ? additionalGreen : additionalRed;
  const rankSign = changes >= 0 ? "+" : "-";

  return (
    <Row style={{ alignItems: "center" }}>
      <SVG source={changes >= 0 ? volUpSVG : volDownSVG} />
      <BrandText style={[styles.colData, spacing.ml_1, { color: rankColor }]}>
        {rankSign} {Math.abs(changes)}
      </BrandText>
    </Row>
  );
};

export const RiotGameLeaderboardScreen = () => {
  const [userScores, setUserScores] = useState<UserScore[]>([]);

  const fetchLeaderboard = async () => {
    const _userScores: UserScore[] = [];

    const streamData = await p2eBackendClient.Leaderboard({
      collectionId: THE_RIOT_COLLECTION_ID,
      limit: 200,
      offset: 0,
    });

    await streamData.forEach((item: LeaderboardResponse) => {
      item.userScore && _userScores.push(item.userScore);
    });
    setUserScores(_userScores);
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return (
    <GameContentView hideStats contentStyle={styles.contentContainer}>
      <ImageBackground style={styles.jumbotron} source={jumbotronPNG}>
        <SVG style={{ width: 66, height: 72 }} source={logoSVG} />

        <SpacerColumn size={2} />

        <BrandText style={fontSemibold28}>THE R!OT LEADERBOARD</BrandText>
      </ImageBackground>

      <TertiaryBox fullWidth style={spacing.mt_2}>
        <Row>
          <Col size={1}>
            <BrandText style={[styles.colHeaderTitle, spacing.ml_2]}>
              Rank
            </BrandText>
          </Col>
          <Col size={5}>
            <BrandText style={styles.colHeaderTitle}>Player</BrandText>
          </Col>
          <Col size={2}>
            <BrandText style={styles.colHeaderTitle}>
              Current Fight XP
            </BrandText>
          </Col>
          <Col size={2}>
            <BrandText style={styles.colHeaderTitle}>
              Time spent in Fight
            </BrandText>
          </Col>
          <Col size={2}>
            <BrandText style={styles.colHeaderTitle}>24 hours Change</BrandText>
          </Col>
        </Row>
      </TertiaryBox>

      <FlatList
        data={userScores}
        keyExtractor={(item, index) => " " + index}
        renderItem={({ item: userScore, index }) => {
          const { xp, hours, rankChanges } = parseUserScoreInfo(userScore);

          return (
            <Row style={styles.rowItem}>
              <Col size={1}>
                <BrandText style={[styles.colData, spacing.ml_3]}>
                  {index + 1}
                </BrandText>
              </Col>
              <Col size={5}>
                <PlayerName userId={userScore.userId} />
              </Col>
              <Col
                size={2}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <SVG style={{ width: 24, height: 24 }} source={cryptoLogoSVG} />

                <SpacerRow size={1} />

                <BrandText style={styles.colData}>{xp}</BrandText>
              </Col>
              <Col
                size={2}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <SVG style={{ width: 24, height: 24 }} source={cryptoLogoSVG} />

                <SpacerRow size={1} />

                <BrandText style={styles.colData}>{hours} hours</BrandText>
              </Col>
              <Col size={2}>
                <Rank changes={rankChanges} />
              </Col>
            </Row>
          );
        }}
      />
    </GameContentView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 20,
  },

  jumbotron: {
    width: "100%",
    height: 400,
    justifyContent: "center",
    alignItems: "center",
  },
  colHeaderTitle: {
    color: neutral77,
    ...(fontSemibold12 as object),
    marginVertical: 14,
  },
  colData: {
    marginVertical: 20,
    ...(fontSemibold12 as object),
  },
  rowItem: {
    borderBottomWidth: 1,
    borderBottomColor: neutral33,
  },
});