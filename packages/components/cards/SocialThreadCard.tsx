import React, { useState } from "react";
import { StyleProp, View, ViewStyle, TouchableOpacity } from "react-native";

import governanceCircleSVG from "../../../assets/icons/governance-circle.svg";
import addThreadSVG from "../../../assets/icons/social-threads/add-thread.svg";
import chatSVG from "../../../assets/icons/social-threads/chat.svg";
import { socialFeedClient } from "../../client-creators/socialFeedClient";
import { PostResult } from "../../contracts-clients/teritori-social-feed/TeritoriSocialFeed.types";
import { useMaxResolution } from "../../hooks/useMaxResolution";
import useSelectedWallet from "../../hooks/useSelectedWallet";
import { useTNSMetadata } from "../../hooks/useTNSMetadata";
import { useAppNavigation } from "../../utils/navigation";
import {
  additionalGreen,
  neutral00,
  neutral11,
  neutral15,
  neutral22,
  neutral77,
  neutralA3,
  orangeDefault,
  neutral44,
  redDefault,
} from "../../utils/style/colors";
import {
  fontSemibold13,
  fontSemibold14,
  fontSemibold16,
} from "../../utils/style/fonts";
import { layout } from "../../utils/style/layout";
import { BrandText } from "../BrandText";
import { RichText } from "../RichText";
import { SVG } from "../SVG";
import { tinyAddress } from "../WalletSelector";
import { DotBadge } from "../badges/DotBadge";
import { SecondaryButton } from "../buttons/SecondaryButton";
import { AvatarWithFrame } from "../images/AvatarWithFrame";
import { CommentsContainer } from "./CommentsContainer";

const socialActionsHeight = 64;

const SocialStat: React.FC<{
  label: string;
  emoji: string;
  style?: StyleProp<ViewStyle>;
}> = ({ label, emoji, style }) => {
  return (
    <View
      style={[
        {
          paddingRight: layout.padding_x1,
          paddingTop: layout.padding_x0_5,
          paddingHorizontal: layout.padding_x0_5,
          height: 28,
          backgroundColor: neutral22,
          borderRadius: 6,
          flexDirection: "row",
          alignItems: "center",
        },
        style,
      ]}
    >
      <BrandText style={[fontSemibold13, { marginRight: layout.padding_x0_5 }]}>
        {emoji}
      </BrandText>
      <BrandText style={fontSemibold13}>{label}</BrandText>
    </View>
  );
};

const SocialActions: React.FC<{
  isGovernance?: boolean;
  style?: StyleProp<ViewStyle>;
  singleView?: boolean;
  post: PostResult;
}> = ({ style, isGovernance, singleView, post }) => {
  const navigation = useAppNavigation();
  const { width: containerWidth } = useMaxResolution({
    responsive: true,
  });
  const [isGovernanceAction, setGovernanceAction] = useState(false);

  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "80%",
          height: socialActionsHeight,
          backgroundColor: neutral11,
          paddingHorizontal: 14,
          borderRadius: 100,
          borderWidth: 1,
          borderColor: neutral22,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <SVG
            source={chatSVG}
            height={20}
            width={20}
            style={{ marginRight: layout.padding_x1_5 }}
          />
          <BrandText style={fontSemibold14}>{post.sub_post_length}</BrandText>
        </View>
        {isGovernance && (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              style={{ marginLeft: 32 }}
              activeOpacity={0.8}
              onPress={() => setGovernanceAction((prev) => !prev)}
            >
              <SVG source={governanceCircleSVG} height={36} width={36} />
            </TouchableOpacity>
            {isGovernanceAction && (
              <View style={{ flexDirection: "row", marginLeft: 12 }}>
                <SecondaryButton
                  text="Yes!"
                  size="SM"
                  backgroundColor={additionalGreen}
                  textStyle={{ color: neutral00 }}
                />
                <SecondaryButton
                  text="No!"
                  size="SM"
                  backgroundColor={orangeDefault}
                  style={{ marginHorizontal: 14 }}
                  textStyle={{ color: neutral00 }}
                />
                <SecondaryButton
                  text="NoWithVeto!"
                  size="SM"
                  backgroundColor={redDefault}
                  textStyle={{ color: neutral00 }}
                />
                <SecondaryButton
                  text="Abstain"
                  size="SM"
                  backgroundColor={neutral44}
                  style={{ marginHorizontal: 14 }}
                  textStyle={{ color: neutral00 }}
                />
              </View>
            )}
          </View>
        )}
      </View>

      {!singleView && !isGovernanceAction && (
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: layout.padding_x0_5,
          }}
          onPress={() =>
            navigation.navigate("FeedPostView", { id: post.identifier })
          }
        >
          <SVG
            source={addThreadSVG}
            height={20}
            width={20}
            style={{ marginRight: layout.padding_x1_5 }}
          />
          <BrandText style={fontSemibold14}>Open the threads</BrandText>
        </TouchableOpacity>
      )}
      {(!isGovernanceAction || containerWidth > 800) && (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <SocialStat
            label="4,2k"
            emoji="👍"
            style={{ marginRight: layout.padding_x1 }}
          />
          <SocialStat
            label="4,2k"
            emoji="🔥"
            style={{ marginRight: layout.padding_x1 }}
          />
          <SocialStat label="4,2k" emoji="👎" />
        </View>
      )}
    </View>
  );
};

export const getResponsiveAvatarSize = (width: number) => {
  if (width >= 992) {
    return 92;
  } else if (width >= 768) {
    return 48;
  } else if (width >= 576) {
    return 32;
  } else {
    return 24;
  }
};

export const SocialThreadCard: React.FC<{
  post: PostResult;
  style?: StyleProp<ViewStyle>;
  singleView?: boolean;
  isGovernance?: boolean;
}> = ({ post, style, singleView, isGovernance }) => {
  const imageMarginRight = layout.padding_x3_5;
  const tertiaryBoxPaddingHorizontal = layout.padding_x3;
  const { width: containerWidth } = useMaxResolution({
    responsive: true,
  });

  const postByTNSMetadata = useTNSMetadata(post.post_by);

  const wallet = useSelectedWallet();
  const [subPosts, setSubPosts] = useState([]);
  const navigation = useAppNavigation();

  const metadata = JSON.parse(post.metadata);

  const queryComments = async () => {
    if (!wallet?.connected || !wallet.address) {
      return;
    }
    const client = await socialFeedClient({
      walletAddress: wallet?.address,
    });

    const subPosts = await client.querySubPosts({
      count: 5,
      from: 0,
      identifier: post.identifier,
      sort: "desc",
    });

    setSubPosts(subPosts);
  };

  React.useEffect(() => {
    if (singleView) {
      queryComments();
    }
  }, [singleView, post?.identifier]);

  return (
    <View style={style}>
      <View
        style={[
          {
            backgroundColor: neutral15,
            paddingTop: layout.padding_x3,
            paddingHorizontal: tertiaryBoxPaddingHorizontal,
            paddingBottom: 52,
            borderRadius: 12,
          },
        ]}
      >
        <View style={{ flexDirection: "row", flex: 1 }}>
          <AvatarWithFrame
            image={null}
            style={{
              marginRight: imageMarginRight,
            }}
            size={getResponsiveAvatarSize(containerWidth)}
          />

          <View
            style={{
              flex: 1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("OrganizationPublicProfile", {
                      id: `tori-${post.post_by}`,
                    })
                  }
                  activeOpacity={0.7}
                >
                  <BrandText style={fontSemibold16}>GNOPUNKS</BrandText>
                </TouchableOpacity>
                <BrandText
                  style={[
                    fontSemibold14,
                    {
                      marginLeft: layout.padding_x1_5,
                      color: neutral77,
                    },
                  ]}
                >
                  @{tinyAddress(postByTNSMetadata?.metadata?.tokenId || "", 19)}
                </BrandText>
              </View>

              <DotBadge label="Gnolang" />
            </View>

            <BrandText style={[fontSemibold13, { color: neutralA3 }]}>
              <RichText initialValue={metadata.message} readOnly />
            </BrandText>

            <View
              style={{
                backgroundColor: neutral22,
                width: "100%",
                height: 1,
                marginVertical: layout.padding_x2_5 / 2,
              }}
            />

            <BrandText style={[fontSemibold13, { color: neutral77 }]}>
              {post.post_by}
            </BrandText>
          </View>
        </View>

        <SocialActions
          isGovernance={isGovernance}
          singleView={singleView}
          post={post}
          style={{
            position: "absolute",
            bottom: -socialActionsHeight / 2,
            alignSelf: "center",
          }}
        />
      </View>

      <CommentsContainer comments={subPosts} />
    </View>
  );
};
