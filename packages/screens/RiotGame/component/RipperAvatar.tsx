import {
  Image,
  ImageSourcePropType,
  View,
  ViewStyle,
  StyleSheet,
} from "react-native";

import { BrandText } from "../../../components/BrandText";
import {
  orangeDefault,
  pinkDefault,
  purpleDefault,
  white,
  withAlpha,
} from "../../../utils/style/colors";
import { fontSemibold9 } from "../../../utils/style/fonts";

type RipperAvatarProps = {
  size: number;
  source: ImageSourcePropType;
  containerStyle?: ViewStyle;
  rarity?: NSRiotGame.Rarity;
  rounded?: boolean;
};

export const RipperAvatar: React.FC<RipperAvatarProps> = ({
  size,
  source,
  rarity,
  rounded = false,
  containerStyle,
}) => {
  let rarityColor;
  switch (rarity) {
    case "uncommon":
      rarityColor = orangeDefault;
      break;
    case "rare":
      rarityColor = orangeDefault;
      break;
    case "epic":
      rarityColor = purpleDefault;
      break;
    case "legendary":
      rarityColor = pinkDefault;
      break;
    default:
      rarityColor = white;
  }

  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: rounded ? Math.floor(size / 2) : 0,
          overflow: "hidden",
        },
        containerStyle,
      ]}
    >
      <Image style={{ width: "100%", height: "100%" }} source={source} />

      {rarity && (
        <View style={[styles.rarityContainer]}>
          <BrandText style={[styles.rarityText, { color: rarityColor }]}>
            {rarity}
          </BrandText>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  rarityContainer: {
    position: "absolute",
    bottom: 0,
    alignItems: "center",
    width: "100%",
  },
  rarityText: {
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 10,
    backgroundColor: withAlpha(orangeDefault, 0.1),
    ...(fontSemibold9 as object),
  },
});