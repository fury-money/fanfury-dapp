import React, { useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

import replySVG from "../../../../assets/icons/reply.svg";
import messageSVG from "../../../../assets/icons/social-threads/message.svg";
import tipSVG from "../../../../assets/icons/tip.svg";
import {
  PostResult,
  Reaction,
} from "../../../contracts-clients/teritori-social-feed/TeritoriSocialFeed.types";
import { neutral33, secondaryColor } from "../../../utils/style/colors";
import { fontSemibold14 } from "../../../utils/style/fonts";
import { layout } from "../../../utils/style/layout";
import { BrandText } from "../../BrandText";
import { EmojiSelector } from "../../EmojiSelector";
import { SVG } from "../../SVG";
import { AnimationFadeIn } from "../../animations";
import { AnimationFadeInOut } from "../../animations/AnimationFadeInOut";
import { FeedPostShareModal } from "../../modals/FeedPostShareModal";
import { SpacerRow } from "../../spacer";
import { SocialStat } from "../SocialStat";
import { MoreReactionsButton } from "./MoreReactionsButton";
import { MoreReactionsMenu } from "./MoreReactionsMenu";

export const SectionDivider: React.FC<{ style?: StyleProp<ViewStyle> }> = ({
  style,
}) => (
  <View style={[styles.sectionDivider, style]}>
    <View style={styles.separator} />
  </View>
);

interface SocialReactionActionsProps {
  reactions: PostResult["reactions"];
  isTippable: boolean;
  postId: string;
  statStyle?: ViewStyle;
  isComment?: boolean;
  commentCount?: number;
  onPressReply?: () => void;
  onPressTip?: () => void;
  onPressReaction: (icon: string) => void;
  isReactionLoading?: boolean;
  showEmojiSelector?: boolean;
}

// TODO: (Responsive) Adapt this, depending on breakpoints
export const nbReactionsShown = 3;

export const SocialReactionActions: React.FC<SocialReactionActionsProps> = ({
  reactions,
  statStyle,
  isComment,
  isTippable,
  commentCount,
  onPressReply,
  onPressTip,
  onPressReaction,
  isReactionLoading,
  showEmojiSelector,
  postId,
}) => {
  // variables
  const reactionWidthRef = useRef<number>();
  const [isMoreReactionShown, setMoreReactionsShown] = useState(false);

  console.log("reactionsreactionsreactionsreactions", reactions);

  const sortedReactions = useMemo(
    () => reactions.sort((a, b) => b.count - a.count),
    [reactions]
  );
  const shownReactions = useMemo(
    () => sortedReactions.slice(0, nbReactionsShown),
    [sortedReactions]
  );
  const hiddenReactions = useMemo(
    () => sortedReactions.slice(nbReactionsShown, -1),
    [sortedReactions]
  );
  const moreReactionsButtonLabel = useMemo(
    () => (isMoreReactionShown ? "Hide" : `+ ${hiddenReactions.length}`),
    [hiddenReactions, isMoreReactionShown]
  );

  console.log("hiddenReactions", hiddenReactions);

  // animation
  const reactionAnimation = useAnimatedStyle(
    () => ({
      width: isReactionLoading
        ? withTiming(30)
        : reactionWidthRef?.current
        ? withTiming(reactionWidthRef?.current)
        : undefined,
    }),
    [isReactionLoading]
  );

  // returns
  return (
    <View style={styles.rowCenter}>
      {commentCount !== undefined && (
        <>
          <Pressable style={styles.rowCenter}>
            <SVG
              source={messageSVG}
              color={secondaryColor}
              width={20}
              height={20}
            />
            <SpacerRow size={1.5} />
            <BrandText style={fontSemibold14}>{commentCount}</BrandText>
          </Pressable>
          <SectionDivider />
        </>
      )}

      {isComment && (
        <>
          <Pressable style={styles.rowCenter} onPress={onPressReply}>
            <View style={styles.replyIconContainer}>
              <SVG
                source={replySVG}
                color={secondaryColor}
                width={12}
                height={12}
              />
            </View>
            <SpacerRow size={1.5} />
            <BrandText style={fontSemibold14}>Reply</BrandText>
          </Pressable>
          {(isTippable || !!reactions.length) && <SectionDivider />}
        </>
      )}

      {isTippable && (
        <>
          <Pressable
            style={[styles.rowCenter, { zIndex: 9 }]}
            onPress={onPressTip}
          >
            <SVG source={tipSVG} width={20} height={20} />
            <SpacerRow size={1.5} />
            <BrandText style={fontSemibold14}>Tip</BrandText>
          </Pressable>
          {!!reactions.length && (
            <SectionDivider style={{ paddingRight: layout.padding_x1_5 }} />
          )}
        </>
      )}

      <Animated.View style={[styles.rowCenter, reactionAnimation]}>
        {isReactionLoading && (
          <AnimationFadeIn>
            <ActivityIndicator color={secondaryColor} />
          </AnimationFadeIn>
        )}
        {!!reactions.length && (
          <AnimationFadeInOut
            visible={!isReactionLoading}
            style={[
              styles.rowCenter,
              { paddingHorizontal: layout.padding_x0_5 },
            ]}
            onLayout={(e) => {
              reactionWidthRef.current = e.nativeEvent.layout.width;
            }}
          >
            <FlatList
              scrollEnabled
              data={shownReactions}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={[
                styles.rowCenter,
                { justifyContent: "flex-end" },
              ]}
              renderItem={({ item: reaction, index }) => (
                <SocialStat
                  key={index}
                  label={String(reaction.count)}
                  emoji={reaction.icon}
                  onPress={() => onPressReaction(reaction.icon)}
                  style={{ marginHorizontal: layout.padding_x0_25 }}
                />
              )}
              keyExtractor={(reaction: Reaction) => String(reaction.icon)}
            />

            {!!hiddenReactions.length && (
              <MoreReactionsButton
                label={moreReactionsButtonLabel}
                style={{ marginHorizontal: layout.padding_x0_25 }}
                onPress={() => setMoreReactionsShown((shown) => !shown)}
              />
            )}

            {/*TODO: This menu is under others SocialReactActions due to his DOM level. We need a proper "absolute menus handling (and close the opened one by clicking outside)"*/}
            {!!hiddenReactions.length && isMoreReactionShown && (
              <MoreReactionsMenu
                moreReactionsButtonLabel={moreReactionsButtonLabel}
                sortedReactions={sortedReactions}
                onPressReaction={(reactionIcon) =>
                  onPressReaction(reactionIcon)
                }
                onPressMore={() => setMoreReactionsShown((shown) => !shown)}
              />
            )}
          </AnimationFadeInOut>
        )}
      </Animated.View>

      {showEmojiSelector && (
        <>
          <SectionDivider />
          <EmojiSelector
            onEmojiSelected={onPressReaction}
            isLoading={isReactionLoading}
          />
          <SectionDivider />
          <FeedPostShareModal postId={postId} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  rowCenter: { flexDirection: "row", alignItems: "center" },
  sectionDivider: {
    paddingHorizontal: layout.padding_x2,
  },
  separator: { height: 18, width: 1, backgroundColor: neutral33 },
  replyIconContainer: {
    borderWidth: 1.2,
    borderColor: secondaryColor,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});
