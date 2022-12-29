import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  TextInput,
  View,
  ViewStyle,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from "react-native";

import cameraSVG from "../../../assets/icons/camera.svg";
import penSVG from "../../../assets/icons/pen.svg";
import priceSVG from "../../../assets/icons/price.svg";
import { useFeedbacks } from "../../context/FeedbacksProvider";
import { useBalances } from "../../hooks/useBalances";
import useSelectedWallet from "../../hooks/useSelectedWallet";
import { ReplyToType } from "../../screens/FeedPostView/types";
import { FEED_POST_SUPPORTED_MIME_TYPES } from "../../utils/mime";
import { useAppNavigation } from "../../utils/navigation";
import {
  neutral17,
  neutral22,
  neutral33,
  neutral77,
  secondaryColor,
} from "../../utils/style/colors";
import {
  fontSemibold12,
  fontSemibold13,
  fontSemibold16,
} from "../../utils/style/fonts";
import { layout } from "../../utils/style/layout";
import { replaceBetweenString } from "../../utils/text";
import { BrandText } from "../BrandText";
import { EmojiSelector } from "../EmojiSelector";
import { GIFSelector } from "../GIFSelector";
import { SVG } from "../SVG";
import { TertiaryBox } from "../boxes/TertiaryBox";
import { PrimaryButton } from "../buttons/PrimaryButton";
import { FileUploader } from "../fileUploader";
import { SpacerRow } from "../spacer";
import { NewPostFormValues } from "./NewsFeed.type";
import {
  createPost,
  getAvailableFreePost,
  getPostCategory,
  getPostFee,
} from "./NewsFeedQueries";
import { NotEnoughFundModal } from "./NotEnoughFundModal";

const WORD_MAX_LIMIT = 1000;

interface NewsFeedInputProps {
  type: "comment" | "post";
  parentId?: string;
  style?: ViewStyle;
  onSubmitSuccess?: () => void;
  replyTo?: ReplyToType;
}

export interface NewsFeedInputHandle {
  resetForm: () => void;
  setValue: (text: string) => void;
  focusInput: () => void;
}

export const NewsFeedInput = React.forwardRef<
  NewsFeedInputHandle,
  NewsFeedInputProps
>(({ type, parentId, style, onSubmitSuccess, replyTo }, forwardRef) => {
  const wallet = useSelectedWallet();
  const inputRef = useRef<TextInput>(null);
  const [isNotEnoughFundModal, setNotEnoughFundModal] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [postFee, setPostFee] = useState(0);
  const [freePostCount, setFreePostCount] = useState(0);
  const { setToastSuccess, setToastError } = useFeedbacks();
  const [fileUpload, setFileUpload] = useState(false);
  const navigation = useAppNavigation();
  const [selection, setSelection] = useState<{ start: number; end: number }>({
    start: 10,
    end: 10,
  });

  const balances = useBalances(
    process.env.TERITORI_NETWORK_ID,
    wallet?.address
  );

  const { setValue, handleSubmit, reset, watch } = useForm<NewPostFormValues>({
    defaultValues: {
      title: "",
      message: "",
    },
  });
  const formValues = watch();

  const updateAvailableFreePost = async () => {
    const freePost = await getAvailableFreePost({ wallet });
    setFreePostCount(freePost || 0);
  };

  const updatePostFee = async () => {
    const fee = await getPostFee({
      wallet,
      postCategory: getPostCategory(formValues),
    });
    setPostFee(fee || 0);
  };

  useEffect(() => {
    if (wallet?.connected && wallet?.address) {
      updateAvailableFreePost();
      updatePostFee();
    }
  }, [wallet?.address]);

  useEffect(() => {
    updatePostFee();
  }, [formValues]);

  const initSubmit = async () => {
    const toriBalance = balances.find((bal) => bal.denom === "utori");
    if (postFee > Number(toriBalance?.amount) && !freePostCount) {
      return setNotEnoughFundModal(true);
    }
    const hasUsername =
      replyTo?.parentId &&
      replyTo?.username &&
      formValues.message.includes(`@${replyTo.username}`);

    await createPost({
      wallet,
      freePostCount,
      fee: postFee,
      formValues,
      parentId: hasUsername ? replyTo.parentId : parentId,
    });
  };

  const resetForm = () => {
    reset();
    updateAvailableFreePost();
    updatePostFee();
  };

  useImperativeHandle(forwardRef, () => ({
    resetForm,
    setValue: handleTextChange,
    focusInput,
  }));

  const onSubmit = async () => {
    setLoading(true);

    try {
      await initSubmit();
      setToastSuccess({ title: "Post submitted successfully.", message: "" });
      onSubmitSuccess?.();
      resetForm();
    } catch (err) {
      setToastError({
        title: "Something went wrong.",
        message: "Couldn't submit your request, please try again later. ",
      });
      console.log("post submit error", err);
    }
    setLoading(false);
  };

  const handleUpload = (file: File) => {
    setFileUpload(false);
    setValue("file", file);
  };

  const handleTextChange = (text: string) => {
    setValue("message", text);

    if (text.length > 80) {
      redirectToNewPost();
    }
  };

  const redirectToNewPost = () => {
    reset();
    navigation.navigate("FeedNewPost", formValues);
  };

  const onEmojiSelected = (emoji: string | null) => {
    if (emoji) {
      let copiedValue = `${formValues.message}`;
      copiedValue = replaceBetweenString(
        copiedValue,
        selection.start,
        selection.end,
        emoji
      );
      setValue("message", copiedValue);
    }
  };

  const focusInput = () => inputRef.current?.focus();

  return (
    <View style={style}>
      {fileUpload && (
        <FileUploader
          triggerFileUpload
          onUpload={(files) => handleUpload(files?.[0])}
          mimeTypes={FEED_POST_SUPPORTED_MIME_TYPES}
          onTrigger={() => setFileUpload(false)}
        />
      )}

      {isNotEnoughFundModal && (
        <NotEnoughFundModal
          visible
          onClose={() => setNotEnoughFundModal(false)}
        />
      )}
      <TertiaryBox
        fullWidth
        style={{
          zIndex: 9,
        }}
        mainContainerStyle={{
          backgroundColor: neutral22,
        }}
        noRightBrokenBorder
      >
        <Pressable onPress={focusInput} style={styles.insideContainer}>
          <SVG height={24} width={24} source={penSVG} color={secondaryColor} />

          <TextInput
            ref={inputRef}
            value={formValues.message}
            onSelectionChange={(event) =>
              setSelection(event.nativeEvent.selection)
            }
            placeholder={`Hey yo! ${
              type === "post" ? "Post something" : "Write your comment"
            } here! _____`}
            placeholderTextColor={neutral77}
            onChangeText={handleTextChange}
            multiline
            style={[
              fontSemibold16,
              {
                width: "100%",
                color: secondaryColor,
                marginLeft: layout.padding_x1_5,

                //@ts-ignore
                outlineStyle: "none",
                outlineWidth: 0,
              },
            ]}
            onKeyPress={(e) => {
              if (e.nativeEvent.key === "Enter" && type === "post") {
                redirectToNewPost();
              }
            }}
          />
          <BrandText
            style={[
              fontSemibold12,
              {
                color: neutral77,
                position: "absolute",
                bottom: 12,
                right: 20,
              },
            ]}
          >
            {formValues?.message?.length}/{WORD_MAX_LIMIT}
          </BrandText>
        </Pressable>
      </TertiaryBox>
      <View
        style={{
          backgroundColor: neutral17,
          paddingTop: layout.padding_x4,
          paddingBottom: layout.padding_x1_5,
          marginTop: -layout.padding_x2_5,
          paddingHorizontal: layout.padding_x2_5,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: 8,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <SVG source={priceSVG} height={24} width={24} color={neutral77} />
          <BrandText
            style={[
              fontSemibold13,
              { color: neutral77, marginLeft: layout.padding_x1 },
            ]}
          >
            {freePostCount
              ? `You have ${freePostCount} free ${type} left`
              : `The cost for this ${type} is ${(
                  (postFee || 0) / 1000000
                ).toFixed(4)} Tori`}
          </BrandText>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <GIFSelector onGIFSelected={console.log} />
          <SpacerRow size={2.5} />

          <EmojiSelector
            onEmojiSelected={onEmojiSelected}
            optionsContainer={{ marginLeft: -80 }}
          />
          <SpacerRow size={2.5} />

          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              height: 32,
              width: 32,
              borderRadius: 24,
              backgroundColor: neutral33,
              alignItems: "center",
              justifyContent: "center",
              marginRight: layout.padding_x2_5,
            }}
            onPress={() => {
              setFileUpload(true);
            }}
          >
            <SVG source={cameraSVG} width={16} height={16} />
          </TouchableOpacity>
          <PrimaryButton
            disabled={!formValues?.message}
            loader={isLoading}
            size="M"
            text={type === "comment" ? "Comment" : "Publish"}
            squaresBackgroundColor={neutral17}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  insideContainer: {
    width: "100%",
    paddingVertical: layout.padding_x4,
    paddingHorizontal: layout.padding_x2_5,
    flexDirection: "row",
    alignItems: "flex-start",
  },
});