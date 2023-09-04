import React, { useState } from "react";
import { View } from "react-native";
import { SvgProps } from "react-native-svg";

import { Tag } from "./components/Tag";
import { TaskItem } from "./components/TaskItem";
import { TaskList } from "./components/TaskList";
import chevronRightSVG from "../../../assets/icons/chevron-right.svg";
import discordSVG from "../../../assets/icons/discord.svg";
import githubSVG from "../../../assets/icons/github.svg";
import grantsCompletedSVG from "../../../assets/icons/grants-completed.svg";
import grantsInProgressSVG from "../../../assets/icons/grants-inProgress.svg";
import grantsOpenSVG from "../../../assets/icons/grants-open.svg";
import grantsReviewSVG from "../../../assets/icons/grants-review.svg";
import gnoSVG from "../../../assets/icons/networks/gno.svg";
import shareSVG from "../../../assets/icons/share.svg";
import twitterSVG from "../../../assets/icons/twitter.svg";
import websiteSVG from "../../../assets/icons/website.svg";
import { BrandText } from "../../components/BrandText";
import { FlexRow } from "../../components/FlexRow";
import { SVG } from "../../components/SVG";
import { ScreenContainer } from "../../components/ScreenContainer";
import { SearchBarInput } from "../../components/Search/SearchBarInput";
import { Separator } from "../../components/Separator";
import { TertiaryBox } from "../../components/boxes/TertiaryBox";
import { SocialButton } from "../../components/buttons/SocialButton";
import { RoundedGradientImage } from "../../components/images/RoundedGradientImage";
import { SpacerColumn, SpacerRow } from "../../components/spacer";
import { ScreenFC } from "../../utils/navigation";
import {
  neutral00,
  neutral17,
  neutral22,
  neutral33,
  neutral77,
  neutralA3,
  primaryColor,
  secondaryColor,
} from "../../utils/style/colors";
import {
  fontSemibold13,
  fontSemibold14,
  fontSemibold20,
} from "../../utils/style/fonts";
import { layout } from "../../utils/style/layout";

type StatusId = "open" | "inProgress" | "review" | "completed";

type Task = {
  id: string;
  text: string;
  statusId: StatusId;
  priority: "medium" | "hight";
};

type Status = {
  id: string;
  text: string;
  iconSVG: React.FC<SvgProps>;
  count: number;
};

const STATUSES: Status[] = [
  { id: "open", text: "Open (Backlog)", count: 4, iconSVG: grantsOpenSVG },
  {
    id: "inProgress",
    text: "In Progress",
    count: 4,
    iconSVG: grantsInProgressSVG,
  },
  { id: "review", text: "Review", count: 4, iconSVG: grantsReviewSVG },
  { id: "completed", text: "Completed", count: 4, iconSVG: grantsCompletedSVG },
];

const TASKS: Task[] = [
  {
    id: "1",
    text: "Community Docs Platform 1",
    statusId: "open",
    priority: "hight",
  },
  {
    id: "2",
    text: "Community Docs Platform 2",
    statusId: "inProgress",
    priority: "hight",
  },
  {
    id: "3",
    text: "Community Docs Platform 3",
    statusId: "review",
    priority: "medium",
  },
  {
    id: "4",
    text: "Community Docs Platform 4",
    statusId: "review",
    priority: "hight",
  },
  {
    id: "5",
    text: "Community Docs Platform 5",
    statusId: "completed",
    priority: "medium",
  },
  {
    id: "6",
    text: "Community Docs Platform 6",
    statusId: "open",
    priority: "hight",
  },
  {
    id: "7",
    text: "Community Docs Platform 7",
    statusId: "review",
    priority: "medium",
  },
];

export const GrantsProgramDetailScreen: ScreenFC<
  "GrantsProgramDetail"
> = () => {
  const [searchText, setSearchText] = useState("");
  const [isHideInfo, setIsHideInfo] = useState(false);
  const [selectedTask, setSelectedTask] = useState<string>();

  const selectTask = (taskId: string) => {
    setSelectedTask(taskId === selectedTask ? undefined : taskId);
  };

  return (
    <ScreenContainer
      isLarge
      responsive
      headerChildren={
        <BrandText style={fontSemibold20}>Grants Program</BrandText>
      }
    >
      <FlexRow>
        <View style={{ flex: 1 }}>
          {!isHideInfo && (
            <>
              <FlexRow
                style={{
                  marginTop: layout.spacing_x4,
                  justifyContent: "space-between",
                }}
              >
                {/* Left block ======================================================= */}
                <View style={{ flex: 1 }}>
                  <FlexRow>
                    <RoundedGradientImage size="L" square sourceURI="" />

                    <View
                      style={{ marginHorizontal: layout.spacing_x2, flex: 1 }}
                    >
                      <BrandText style={fontSemibold20}>
                        Create a web Game using Gnolang
                      </BrandText>

                      <BrandText
                        style={[
                          fontSemibold13,
                          {
                            color: neutralA3,
                            marginTop: layout.spacing_x2,
                          },
                        ]}
                      >
                        Grant name Learning Groups onboard strong technical
                        specialists (engineers, lorem ipsum, researchers,
                        open-source developers, and more) into the lorem ipsum
                        dolor sit is Live, $50,000 lorem ipsum dolor sit amet
                        lorem ipsum dolor sit amet lorem ipsum dolor sit amet
                        lorem ipsum dolor sit amet lorem ipsum dolor sit amet
                        lorem ipsum dolor sit amet lorem ipsum dolor sit amet
                        lorem ipsum dolor sit amet lorem ipsum.
                      </BrandText>

                      <SpacerColumn size={2} />

                      <TertiaryBox
                        noBrokenCorners
                        mainContainerStyle={{
                          backgroundColor: neutral22,
                          borderWidth: 0,
                          padding: layout.spacing_x1_5,
                        }}
                      >
                        <FlexRow
                          style={{ justifyContent: "center", width: "100%" }}
                        >
                          <SVG source={gnoSVG} width={18} height={18} />
                          <BrandText
                            style={[
                              fontSemibold13,
                              { marginLeft: layout.spacing_x1_5 },
                            ]}
                          >
                            @0x17dfsdvgsd98fsbsd9b8sd
                          </BrandText>
                        </FlexRow>
                      </TertiaryBox>
                    </View>
                  </FlexRow>

                  <SpacerColumn size={2} />

                  <FlexRow>
                    <Tag text="Open" color="#C8FFAE" bgColor="#C8FFAE1A" />

                    <SpacerRow size={2} />

                    <Tag
                      text="2005.12.4"
                      color={neutral77}
                      borderColor={neutral33}
                      bgColor={neutral00}
                      containerStyle={{ marginRight: layout.spacing_x2 }}
                    />

                    <Tag
                      text="dapp"
                      color={neutral77}
                      borderColor={neutral33}
                      bgColor={neutral00}
                      containerStyle={{ marginRight: layout.spacing_x2 }}
                    />

                    <Tag
                      text="Structure"
                      color={neutral77}
                      borderColor={neutral33}
                      bgColor={neutral00}
                      containerStyle={{ marginRight: layout.spacing_x2 }}
                    />
                  </FlexRow>
                </View>

                {/* Right block ======================================================= */}
                <View>
                  <TertiaryBox
                    noBrokenCorners
                    mainContainerStyle={{
                      backgroundColor: neutral22,
                      borderWidth: 0,
                      paddingVertical: 12,
                      paddingHorizontal: 16,
                      width: 224,
                    }}
                  >
                    <FlexRow
                      style={{ justifyContent: "center", width: "100%" }}
                    >
                      <BrandText style={[fontSemibold20, { color: neutral77 }]}>
                        Grant:
                      </BrandText>
                      <SpacerRow size={1} />
                      <BrandText
                        style={[fontSemibold20, { color: primaryColor }]}
                      >
                        $50K
                      </BrandText>
                    </FlexRow>
                  </TertiaryBox>

                  <SpacerColumn size={2} />

                  <View style={{ backgroundColor: neutral22 }}>
                    <SocialButton
                      text="Share URL"
                      iconSvg={shareSVG}
                      iconColor={secondaryColor}
                      textColor={neutralA3}
                    />
                    <SpacerRow size={1} />
                    <SocialButton
                      text="Discord URL"
                      iconSvg={discordSVG}
                      textColor={neutralA3}
                    />
                    <SpacerRow size={1} />
                    <SocialButton
                      text="Website URL"
                      iconSvg={websiteSVG}
                      textColor={neutralA3}
                    />
                    <SpacerRow size={1} />
                    <SocialButton
                      text="Github URL"
                      iconSvg={githubSVG}
                      textColor={neutralA3}
                    />
                    <SpacerRow size={1} />
                    <SocialButton
                      text="Twitter URL"
                      iconSvg={twitterSVG}
                      textColor={neutralA3}
                    />
                  </View>
                </View>
              </FlexRow>
              <SpacerColumn size={2} />
            </>
          )}

          {/* Tasks block ======================================================= */}
          <View
            style={{
              // NOTE: trick to get will width background on responsible/large ScreenContainer
              marginHorizontal: -140,
              paddingHorizontal: 140,
              backgroundColor: neutral17,
              paddingVertical: layout.spacing_x3,
            }}
          >
            <FlexRow>
              <BrandText
                onPress={() => setIsHideInfo(!isHideInfo)}
                style={fontSemibold20}
              >
                All Tasks:
              </BrandText>
              <SpacerRow size={1} />
              <BrandText
                style={[fontSemibold20, { color: neutral77, flexGrow: 1 }]}
              >
                7
              </BrandText>

              <SearchBarInput
                placeholder="Type to search..."
                text={searchText}
                onChangeText={setSearchText}
                inputStyle={{ backgroundColor: neutral00 }}
                noBrokenCorners
              />
            </FlexRow>

            <Separator
              color={neutral33}
              style={{
                marginBottom: layout.spacing_x2,
                marginTop: layout.spacing_x3,
              }}
            />

            <FlexRow
              style={{
                alignItems: "flex-start",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              {STATUSES.map((step) => (
                <TaskList
                  text={step.text}
                  count={step.count}
                  iconSVG={step.iconSVG}
                >
                  {TASKS.filter((task) => task.statusId === step.id).map(
                    (task) => (
                      <>
                        <TaskItem
                          onPress={() => selectTask(task.id)}
                          text={task.text}
                          priority={task.priority}
                        />
                        <SpacerRow size={3} />
                      </>
                    )
                  )}
                </TaskList>
              ))}
            </FlexRow>
          </View>
        </View>

        {/* Detail view ======================================================= */}
        {selectedTask != null && (
          <View
            style={{
              width: 300,
              alignSelf: "flex-start",
              borderLeftWidth: 1,
              borderLeftColor: neutral33,
              backgroundColor: neutral00,
              height: "100%",
              marginLeft: layout.spacing_x2,
              marginRight: -layout.spacing_x3 * 2,
              paddingHorizontal: layout.spacing_x2,
              paddingVertical: layout.spacing_x4,
            }}
          >
            <BrandText style={fontSemibold20}>
              🔎 Community Docs Platform
            </BrandText>

            <SpacerColumn size={3} />

            <FlexRow style={{ justifyContent: "space-between" }}>
              <BrandText style={[fontSemibold13, { color: neutralA3 }]}>
                Status
              </BrandText>

              <Tag bgColor="#2F4469" color="#ffffff" text="Open" />
            </FlexRow>

            <SpacerColumn size={2} />

            <FlexRow style={{ justifyContent: "space-between" }}>
              <BrandText style={[fontSemibold13, { color: neutralA3 }]}>
                Priority
              </BrandText>

              <Tag bgColor="#673932" color="#ffffff" text="High 🔥" />
            </FlexRow>

            <Separator style={{ marginVertical: layout.spacing_x2 }} />

            <BrandText style={fontSemibold14}>Description</BrandText>

            <SpacerColumn size={2} />

            <BrandText style={[fontSemibold13, { color: neutralA3 }]}>
              Create a community resource platform to facilitate online, and
              local, local community engagement. The platform should help
              Platform users in different regions coordinate meet-ups,
              translations of Platform content into local languages, and to
              University outreach programs.
            </BrandText>

            <Separator style={{ marginVertical: layout.spacing_x2 }} />

            <TertiaryBox
              fullWidth
              noBrokenCorners
              mainContainerStyle={{
                backgroundColor: neutral22,
                padding: layout.spacing_x1_5,
                display: "flex",
                flexDirection: "row",
              }}
            >
              <SVG source={githubSVG} width={24} height={24} />
              <BrandText
                style={[
                  fontSemibold13,
                  { flexGrow: 1, marginLeft: layout.spacing_x0_5 },
                ]}
              >
                Github task link
              </BrandText>
              <SVG source={chevronRightSVG} width={24} height={24} />
            </TertiaryBox>
          </View>
        )}
      </FlexRow>
    </ScreenContainer>
  );
};