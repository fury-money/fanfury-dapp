import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar, Badge } from "react-native-paper";

import doublecheck from "../../../assets/icons/doublecheck.svg";
import { Separator } from "../../components/Separator";
import { SVG } from "../SVG";

type Props = {
  name: string;
  isOnline: boolean;
  avatar: any;

  chat: string;
  time: string;
};

const SideBarChatConversation: React.FC<Props> = ({
  avatar,
  name,
  isOnline,
  chat,
  time,
}) => {
  const onlineStatusBadgeColor = isOnline ? "green" : "yellow";
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={{ flexDirection: "row" }}>
          <Avatar.Image size={35} source={avatar} />
          <Badge
            style={{
              position: "absolute",
              top: 20,
              left: 25,

              backgroundColor: onlineStatusBadgeColor,
            }}
            size={12}
          />
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.online}>{chat}</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              color: "#FFFFFF",
              fontWeight: "500",
              fontSize: 10,
              lineHeight: 12,
            }}
          >
            {time}
          </Text>
          <SVG
            width={24}
            height={24}
            source={doublecheck}
            style={{ marginRight: 2, marginLeft: 4 }}
          />
        </View>
      </View>
      <View style={{ marginTop: 10 }}>
        <Separator color="#222222" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
  },
  row: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
  },
  chatboxicon: { flexDirection: "row" },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  online: {
    fontSize: 11,
    fontWeight: "500",
    color: "#A3A3A3",
    lineHeight: 18,
  },
  badge: {
    backgroundColor: "green",
    width: 10,
    height: 10,
    borderRadius: 5,
    position: "absolute",
    bottom: -5,
    right: -5,
  },
  name: {
    fontSize: 13,
    fontWeight: "600",
    color: "#FFFFFF",
    lineHeight: 18,
  },
  chatIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  dotsIcon: {
    width: 24,
    height: 24,
  },
});

export default SideBarChatConversation;