import React, { useEffect, useState } from "react";
import { StyleProp, ViewStyle } from "react-native";

import { GigItemCard } from "./GigItemCard";
import { GigItemCardCreate } from "./GigItemCardCreate";
import useSelectedWallet from "../../../hooks/useSelectedWallet";
import { GigInfo } from "../../../screens/FreelanceServices/types/fields";
import { freelanceClient } from "../../../utils/backend";
import { layout } from "../../../utils/style/layout";

export const GigsTable: React.FC<{
  gigAddress: string;
  style?: StyleProp<ViewStyle>;
}> = ({ gigAddress, style }) => {
  const [gigs, setGigs] = useState<GigInfo[]>([]);
  const wallet = useSelectedWallet();

  useEffect(() => {
    const getGigList = async () => {
      const res = await freelanceClient.gigListUser({ address: gigAddress });
      setGigs(
        res.gigs.map((item) => {
          const gigInfo = JSON.parse(item.gigData) as GigInfo;
          gigInfo.id = item.id;
          return gigInfo;
        })
      );
    };
    if (gigAddress !== "") {
      getGigList();
    }
  }, [gigAddress]);
  return (
    <>
      {gigs.map((item, index) => (
        <GigItemCard
          key={index}
          width={200}
          height={200}
          data={item}
          boxStyle={{
            marginBottom: layout.padding_x2_5,
            marginRight: layout.padding_x1,
            marginLeft: layout.padding_x1,
          }}
          isEditable={!!(wallet && wallet.address === gigAddress)}
        />
      ))}
      {wallet && wallet.address === gigAddress && (
        <GigItemCardCreate
          width={200}
          height={200}
          boxStyle={{
            marginBottom: layout.padding_x2_5,
            marginRight: layout.padding_x1,
            marginLeft: layout.padding_x1,
          }}
        />
      )}
    </>
  );
};