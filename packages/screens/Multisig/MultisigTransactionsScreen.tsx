import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";

import { MultisigTransactionType } from "./types";
import { BrandText } from "../../components/BrandText";
import { EmptyList } from "../../components/EmptyList";
import { Pagination } from "../../components/Pagination";
import { ScreenContainer } from "../../components/ScreenContainer";
import { AnimationFadeIn } from "../../components/animations";
import { SpacerColumn } from "../../components/spacer";
import { Tabs } from "../../components/tabs/Tabs";
import {
  useFetchMultisigTransactionsById,
  useGetMultisigAccount,
  useGetTransactionCount,
  useMultisigValidator,
} from "../../hooks/multisig";
import useSelectedWallet from "../../hooks/useSelectedWallet";
import { NetworkKind } from "../../networks";
import { ScreenFC, useAppNavigation } from "../../utils/navigation";
import { secondaryColor } from "../../utils/style/colors";
import { fontSemibold20, fontSemibold28 } from "../../utils/style/fonts";
import { layout } from "../../utils/style/layout";
import { ProposalTransactionItem } from "../OrganizerDeployer/components/ProposalTransactionItem";

const MIN_ITEMS_PER_PAGE = 50;
export const MultisigTransactionsScreen: ScreenFC<"MultisigTransactions"> = ({
  route,
}) => {
  const navigation = useAppNavigation();
  const { selectedWallet } = useSelectedWallet();
  const { address, walletName } = route.params;
  const [selectedTab, setSelectedTab] = useState<keyof typeof tabs>("all");
  const { isLoading: multisigLoading, data: multisigData } =
    useGetMultisigAccount(address);
  const { data: countList } = useGetTransactionCount(
    multisigData?.dbData._id || "",
    [
      "",
      "",
      "",
      MultisigTransactionType.TRANSFER,
      MultisigTransactionType.STAKE,
      // MultisigTransactionType.LAUNCH_NFT_COLLECTION,
      MultisigTransactionType.CREATE_NEW_POST,
      MultisigTransactionType.MANAGE_PUBLIC_PROFILE,
      MultisigTransactionType.REGISTER_TNS,
    ]
  );
  const { isUserMultisig } = useMultisigValidator(address);
  const [pageIndex, setPageIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState<string | null>(null);
  const [afterIndex, setAfterIndex] = useState<string | null>(null);
  const [beforeIndex, setBeforeIndex] = useState<string | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState(MIN_ITEMS_PER_PAGE);
  const tabs = useMemo(
    () => ({
      // TODO: currentProposals must be proposals than require approbations or broadcast
      currentProposals: {
        name: "Current proposals",
        // badgeCount: countList ? countList[0] : 0,
        badgeCount: 0,
        value: undefined,
        disabled: true,
      },
      all: {
        name: "All",
        badgeCount: countList ? countList[1] : 0,
        value: undefined,
      },
      // TODO: transferReceived must be the transfers sent to the multisig wallet
      transferReceived: {
        name: "Transfer received",
        // badgeCount: countList ? countList[2] : 0,
        badgeCount: 0,
        value: undefined,
        disabled: true,
      },
      transferEmitted: {
        name: "Transfer emitted",
        badgeCount: countList ? countList[3] : 0,
        value: MultisigTransactionType.TRANSFER,
      },
      stake: {
        name: "Stake",
        badgeCount: countList ? countList[4] : 0,
        value: MultisigTransactionType.STAKE,
      },
      // collectionLaunch: {
      //   name: "Collection launch",
      //   badgeCount: countList ? countList[5] : 0,
      //   value: MultisigTransactionType.LAUNCH_NFT_COLLECTION,
      // },
      postCreation: {
        name: "Post creation",
        badgeCount: countList ? countList[5] : 0,
        value: MultisigTransactionType.CREATE_NEW_POST,
      },
      profileManagement: {
        name: "Profile management",
        badgeCount: countList ? countList[6] : 0,
        value: MultisigTransactionType.MANAGE_PUBLIC_PROFILE,
      },
      nameRegister: {
        name: "Name register",
        badgeCount: countList ? countList[7] : 0,
        value: MultisigTransactionType.REGISTER_TNS,
      },
    }),
    [countList]
  );

  //TODO: Display loader until isLoading === false

  // Leave screen if no wallet found from URL address, no name or if the user haven't this wallet
  useEffect(() => {
    if (
      !multisigLoading &&
      (!walletName ||
        !multisigData ||
        !multisigData?.dbData.userAddresses.find(
          (address) => address === selectedWallet?.address
        ))
    ) {
      navigation.navigate("MultisigWalletDashboard", {
        address,
        walletName,
      });
    }
  }, [
    multisigLoading,
    multisigData,
    selectedWallet?.address,
    address,
    navigation,
    walletName,
  ]);

  useEffect(() => {
    setCurrentIndex(null);
    setAfterIndex(null);
    setBeforeIndex(null);
  }, [selectedTab]);
  const total = useMemo(() => {
    return tabs[selectedTab].badgeCount;
  }, [tabs, selectedTab]);

  const maxPage = useMemo(
    () => Math.max(Math.ceil(total / itemsPerPage), 1),
    [itemsPerPage, total]
  );

  const {
    data,
    isLoading: txLoading,
    isFetching,
  } = useFetchMultisigTransactionsById(
    multisigData?.dbData._id || "",
    tabs[selectedTab].value,
    currentIndex,
    MIN_ITEMS_PER_PAGE
  );
  useEffect(() => {
    if (data && !txLoading && !isFetching) {
      setAfterIndex(data.after);
      setBeforeIndex(data.before);
    }
  }, [data, txLoading, isFetching]);
  const list = useMemo(() => {
    if (data) return data.data;
    return [];
  }, [data]);

  // returns
  const ListFooter = useCallback(
    () => (
      <>
        <SpacerColumn size={6} />
        {(txLoading || isFetching) && (
          <>
            <ActivityIndicator color={secondaryColor} />
            <SpacerColumn size={2} />
          </>
        )}
        {!txLoading && !isFetching && data && data.data.length > 0 && (
          <Pagination
            disableLastButton
            currentPage={pageIndex}
            maxPage={maxPage}
            itemsPerPage={itemsPerPage}
            onChangePage={(index) => {
              if (index === pageIndex - 1) {
                //back
                setCurrentIndex(beforeIndex);
              } else if (index === pageIndex + 1) {
                //forward
                setCurrentIndex(afterIndex);
              } else {
                if (index === 0) {
                  //first
                  setCurrentIndex(null);
                } else if (index === maxPage - 1) {
                  //last
                }
              }
              setPageIndex(index);
            }}
            dropdownOptions={[MIN_ITEMS_PER_PAGE, 100]}
            setItemsPerPage={(e) => setItemsPerPage(e)}
          />
        )}
      </>
    ),
    [
      txLoading,
      isFetching,
      data,
      pageIndex,
      maxPage,
      itemsPerPage,
      beforeIndex,
      afterIndex,
    ]
  );

  return (
    <ScreenContainer
      isHeaderSmallMargin
      headerChildren={
        <BrandText style={fontSemibold20}>Transactions</BrandText>
      }
      footerChildren={<></>}
      noMargin
      onBackPress={() =>
        navigation.canGoBack()
          ? navigation.goBack()
          : navigation.navigate("MultisigWalletDashboard", {
              walletName,
              address,
            })
      }
      fullWidth
      noScroll
      forceNetworkKind={NetworkKind.Cosmos}
    >
      <View style={styles.header}>
        <BrandText style={fontSemibold28}>{walletName}</BrandText>
        <SpacerColumn size={1.5} />
        <Tabs
          items={tabs}
          onSelect={setSelectedTab}
          selected={selectedTab}
          tabContainerStyle={{
            height: 64,
          }}
        />
      </View>
      <FlatList
        data={list}
        renderItem={({ item, index }) => (
          <AnimationFadeIn delay={index * 50}>
            <ProposalTransactionItem
              {...item}
              isUserMultisig={isUserMultisig}
            />
          </AnimationFadeIn>
        )}
        initialNumToRender={MIN_ITEMS_PER_PAGE}
        keyExtractor={(item) => item._id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
        ListFooterComponent={ListFooter}
        ListEmptyComponent={() =>
          txLoading ? null : <EmptyList text="No proposals" />
        }
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: layout.contentPadding,
    paddingTop: 0,
    flex: 1,
  },
  header: {
    marginHorizontal: layout.contentPadding,
    marginTop: layout.topContentPaddingWithHeading,
  },
  pagination_container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
