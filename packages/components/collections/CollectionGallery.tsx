import React, { useCallback } from "react";
import { FlatList, View } from "react-native";

import {
  Collection,
  CollectionsRequest,
} from "../../api/marketplace/v1/marketplace";
import { useCollections } from "../../hooks/useCollections";
import { useMaxResolution } from "../../hooks/useMaxResolution";
import { layout } from "../../utils/style/layout";
import { CollectionView } from "../CollectionView";
import { Section } from "../Section";

export const CollectionGallery: React.FC<{
  title: string;
  linkToMint?: boolean;
  req: CollectionsRequest;
  filter?: (c: Collection) => boolean;
}> = ({ title, req, linkToMint, filter }) => {
  const [collections] = useCollections(req, filter);

  const { width } = useMaxResolution();

  const renderItem = useCallback(
    (props: { item: Collection }) => (
      <View
        style={{
          padding: layout.padding_x1,
        }}
      >
        <CollectionView
          item={props.item}
          linkToMint={linkToMint}
          mintState={req.mintState}
        />
      </View>
    ),
    [linkToMint, req.mintState]
  );

  return (
    <Section title={title}>
      <FlatList
        data={collections}
        numColumns={4}
        ItemSeparatorComponent={() => (
          <View style={{ height: layout.padding_x1 }} />
        )}
        style={{
          width,
        }}
        renderItem={renderItem}
      />
      )
    </Section>
  );
};