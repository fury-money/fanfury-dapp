import React from "react";
import { View } from "react-native";

import { HTML_TAG_REGEXP } from "../../../utils/regex";
import { neutralA3 } from "../../../utils/style/colors";
import { fontSemibold13 } from "../../../utils/style/fonts";
import { layout } from "../../../utils/style/layout";
import { BrandText } from "../../BrandText";
import { TextRenderer } from "../../TextRenderer/TextRenderer";
import { SocialFeedMetadata } from "../NewsFeed/NewsFeed.type";

interface Props {
  metadata: SocialFeedMetadata;
}

export const TextContent: React.FC<Props> = ({ metadata }) => {
  return (
    <View>
      {!!metadata?.title && (
        <BrandText style={{ marginBottom: layout.padding_x1 }}>
          {metadata.title}
        </BrandText>
      )}
      <BrandText style={[fontSemibold13, { color: neutralA3 }]}>
        <TextRenderer text={metadata.message.replace(HTML_TAG_REGEXP, "")} />
      </BrandText>
    </View>
  );
};