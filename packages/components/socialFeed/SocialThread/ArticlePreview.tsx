import React from "react";
import { Image, View } from "react-native";

import { HTML_TAG_REGEXP } from "../../../utils/regex";
import { neutralA3 } from "../../../utils/style/colors";
import { fontSemibold13 } from "../../../utils/style/fonts";
import { layout } from "../../../utils/style/layout";
import { BrandText } from "../../BrandText";
import { SocialFeedMetadata } from "../../NewsFeed/NewsFeed.type";

interface Props {
  metadata: SocialFeedMetadata;
}

export const ArticlePreview: React.FC<Props> = ({ metadata }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        paddingBottom: layout.padding_x1,
      }}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        {!!metadata?.title && (
          <BrandText style={{ marginVertical: layout.padding_x1 }}>
            {metadata.title}
          </BrandText>
        )}
        <BrandText
          style={[fontSemibold13, { color: neutralA3 }]}
          numberOfLines={4}
        >
          {metadata.message.replace(HTML_TAG_REGEXP, "")}
        </BrandText>
      </View>
      {!!metadata.files?.length && (
        <Image
          source={{ uri: metadata.files[0]?.url }}
          resizeMode="cover"
          style={{
            height: 140,
            width: 140,
            marginLeft: layout.padding_x2,
            borderRadius: 2,
          }}
        />
      )}
    </View>
  );
};