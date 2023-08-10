import React, { useState, useMemo, useEffect } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

import Logo from "../../../assets/logos/logo.svg";
import { BrandText } from "../../components/BrandText";
import { UploadAlbumModal } from "../../components/MusicPlayer/UploadAlbumModal";
import { SVG } from "../../components/SVG";
import { UploadVideoModal } from "../../components/VideoPlayer/UploadVideoModal";
import { VideoPlayerCard } from "../../components/VideoPlayer/VideoPlayerCard";
import { useSelectedNetworkId } from "../../hooks/useSelectedNetwork";
import useSelectedWallet from "../../hooks/useSelectedWallet";
import {
  useUserFetchVideos,
  combineFetchVideoPages,
} from "../../hooks/video/useUserFetchVideos";
import { getUserId } from "../../networks";
import { neutral77, primaryColor } from "../../utils/style/colors";
import {
  fontMedium14,
  fontSemibold20,
  fontSemibold14,
} from "../../utils/style/fonts";
import { layout } from "../../utils/style/layout";
import { VideoInfoWithMeta } from "../../utils/types/video";

export const VideoPlayerMyLibraryContent: React.FC<{
  videoListForLibrary: VideoInfoWithMeta[];
}> = ({ videoListForLibrary }) => {
  const unitWidth = 240;

  const isLoadingValue = useSharedValue(false);
  const isGoingUp = useSharedValue(false);

  const isGoingUpOther = useSharedValue(false);

  const selectedNetworkId = useSelectedNetworkId();
  const wallet = useSelectedWallet();
  const userId = getUserId(selectedNetworkId, wallet?.address);

  const [flatListContentOffsetY, setFlatListContentOffsetY] = useState(0);
  const { data, isFetching, hasNextPage, fetchNextPage, isLoading } =
    useUserFetchVideos({
      limit: 10,
      offset: 0,
      createdBy: userId,
    });

  const myVideos = useMemo(
    () => (data ? combineFetchVideoPages(data.pages) : []),
    [data]
  );

  const [openUploadModal, setOpenUploadModal] = useState<boolean>(false);
  useEffect(() => {
    if (isFetching || isLoading) {
      isGoingUp.value = false;
      isLoadingValue.value = true;
    } else {
      isLoadingValue.value = false;
    }
  }, [isFetching, isLoading, isGoingUp, isLoadingValue]);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      setFlatListContentOffsetY(event.contentOffset.y);
      if (flatListContentOffsetY > event.contentOffset.y) {
        isGoingUp.value = true;
      } else if (flatListContentOffsetY < event.contentOffset.y) {
        isGoingUp.value = false;
      }
      setFlatListContentOffsetY(event.contentOffset.y);
    },
  });

  const scrollHandlerOther = useAnimatedScrollHandler({
    onScroll: (event) => {
      setFlatListContentOffsetY(event.contentOffset.y);
      if (flatListContentOffsetY > event.contentOffset.y) {
        isGoingUpOther.value = true;
      } else if (flatListContentOffsetY < event.contentOffset.y) {
        isGoingUpOther.value = false;
      }
      setFlatListContentOffsetY(event.contentOffset.y);
    },
  });

  const onEndReached = () => {
    if (!isLoading && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  };

  const onEndReachedOther = () => {};

  const styles = StyleSheet.create({
    container: {
      marginTop: layout.padding_x3,
      width: "100%",
    },
    oneLine: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    contentGroup: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      marginTop: layout.padding_x3,
      gap: layout.padding_x2_5,
      marginBottom: 40,
    },
    trackItem: {
      width: unitWidth,
      flexDirection: "row",
      alignItems: "center",
      gap: layout.padding_x1_5,
    },
    itemImg: {
      width: 40,
      height: 40,
      borderRadius: layout.padding_x0_5,
    },
    itemText: StyleSheet.flatten([
      fontMedium14,
      {
        color: neutral77,
        marginTop: layout.padding_x0_5,
      },
    ]),
    buttonGroup: {
      flexDirection: "row",
      alignItems: "center",
      gap: layout.padding_x2,
    },
    buttonContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingLeft: layout.padding_x1,
      paddingRight: layout.padding_x1_5,
      paddingVertical: layout.padding_x1,
      backgroundColor: "#2B2B33",
      borderRadius: layout.padding_x4,
      gap: layout.padding_x1_5,
    },
    buttonText: StyleSheet.flatten([
      fontSemibold14,
      {
        color: primaryColor,
      },
    ]),
    albumGrid: {
      margin: layout.padding_x3,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.oneLine}>
        <BrandText style={fontSemibold20}>My Videos</BrandText>
        <View style={styles.buttonGroup}>
          <Pressable
            style={styles.buttonContainer}
            onPress={() => setOpenUploadModal(true)}
          >
            <SVG
              source={Logo}
              width={layout.padding_x2}
              height={layout.padding_x2}
            />
            <BrandText style={styles.buttonText}>Upload video</BrandText>
          </Pressable>
        </View>
      </View>
      <View style={styles.contentGroup}>
        <Animated.FlatList
          scrollEventThrottle={0.1}
          data={myVideos}
          numColumns={4}
          renderItem={({ item: videoInfo }) => (
            <View style={styles.albumGrid}>
              <VideoPlayerCard item={videoInfo} hasLibrary />
            </View>
          )}
          onScroll={scrollHandler}
          onEndReachedThreshold={1}
          onEndReached={onEndReached}
        />
      </View>

      <View style={styles.oneLine}>
        <BrandText style={fontSemibold20}>Other Videos</BrandText>
      </View>
      <View style={styles.contentGroup}>
        <Animated.FlatList
          scrollEventThrottle={0.1}
          data={videoListForLibrary}
          numColumns={4}
          renderItem={({ item: videoInfo }) => (
            <View style={styles.albumGrid}>
              <VideoPlayerCard item={videoInfo} hasLibrary />
            </View>
          )}
          onScroll={scrollHandlerOther}
          onEndReachedThreshold={1}
          onEndReached={onEndReachedOther}
        />
      </View>
      <UploadVideoModal
        isVisible={openUploadModal}
        onClose={() => setOpenUploadModal(false)}
      />
    </View>
  );
};