import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import { PostResult } from "../../contracts-clients/teritori-social-feed/TeritoriSocialFeed.types";
import { OnPressReplyType } from "../../screens/FeedPostView/FeedPostViewScreen";
import { neutral22 } from "../../utils/style/colors";
import { SocialCommentCard } from "./SocialCommentCard";

interface CommentsContainerProps {
  comments: PostResult[];
  style?: StyleProp<ViewStyle>;
  onPressReply?: OnPressReplyType;
  overrideParentId?: string;
}

export const CommentsContainer: React.FC<CommentsContainerProps> = ({
  comments,
  onPressReply,
  overrideParentId,
}) => {
  if (!comments?.length) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.conversationLine} />

      <View style={{ flex: 1 }}>
        {comments.map((comment, index) => (
          <SocialCommentCard
            key={index}
            comment={comment}
            isLast={comments?.length === index + 1}
            onPressReply={onPressReply}
            overrideParentId={overrideParentId}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 60,
    flexDirection: "row",
  },
  conversationLine: {
    height: "100%",
    width: 1,
    backgroundColor: neutral22,
  },
});