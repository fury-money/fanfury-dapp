import React, { useState } from "react";
import { View } from "react-native";

import { MusicHomeContent } from "./components/MusicHomeContent";
import { MusicMyLibraryContent } from "./components/MusicMyLibraryContent";
import { GetAllAlbumListRequest } from "../../api/musicplayer/v1/musicplayer";
import { BrandText } from "../../components/BrandText";
import { ScreenContainer } from "../../components/ScreenContainer";
import { ScreenFC } from "../../utils/navigation";
import { MusicTabs } from "../MusicAlbum/components/MusicTabs";

export const MusicScreen: ScreenFC<"Music"> = () => {
  const tabData: string[] = ["Home", "My Library"];
  const [tab, setTab] = useState<string>(tabData[0]);
  const musicRequest: GetAllAlbumListRequest = {
    limit: 10,
    offset: 0,
  };

  return (
    <ScreenContainer
      headerChildren={<BrandText>Music</BrandText>}
      isLarge
      responsive
    >
      <View
        style={{
          width: "100%",
        }}
      >
        <MusicTabs tab={tab} setTab={setTab} />

        {tab === tabData[0] && <MusicHomeContent req={musicRequest} />}
        {tab === tabData[1] && <MusicMyLibraryContent />}
      </View>
    </ScreenContainer>
  );
};