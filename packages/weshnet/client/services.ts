import { weshClient } from "./client";
import { weshConfig } from "./config";
import { subscribeMetadata } from "./subscribers";
import { bytesFromString, encodeJSON, stringFromBytes } from "./utils";
import { MessageState, setContactInfo } from "../../store/slices/message";
import { store } from "../../store/store";
import { Message } from "../../utils/types/message";
import { GroupInfo_Request } from "../protocoltypes";

let isConfigLoading = false;

export const createConfig = async () => {
  if (weshConfig.config || isConfigLoading) {
    return;
  }
  isConfigLoading = true;

  try {
    const config = await weshClient().ServiceGetConfiguration({});
    weshConfig.config = config;

    await weshClient().ContactRequestEnable({});
    const contactRef = await weshClient().ContactRequestReference({});

    if (contactRef.publicRendezvousSeed.length === 0) {
      const resetRef = await weshClient().ContactRequestResetReference({});
      contactRef.publicRendezvousSeed = resetRef.publicRendezvousSeed;
    }

    store.dispatch(
      setContactInfo({
        publicRendezvousSeed: stringFromBytes(contactRef.publicRendezvousSeed),
      })
    );

    subscribeMetadata(weshConfig.config.accountGroupPk);
  } catch (err) {
    console.log("create config err", err);
  }

  isConfigLoading = false;
};

export const createSharableLink = (
  contactInfo: MessageState["contactInfo"]
) => {
  if (!weshConfig?.config?.accountPk || !contactInfo.publicRendezvousSeed) {
    return "";
  }
  return `https://app.teritori.com/contact?accountPk=${encodeURIComponent(
    stringFromBytes(weshConfig.config.accountPk)
  )}&rdvSeed=${encodeURIComponent(
    contactInfo.publicRendezvousSeed
  )}&name=${encodeURIComponent(contactInfo.name)}&avatar=${encodeURIComponent(
    contactInfo.avatar
  )}`;
};

export const addContact = async (
  shareLink: string,
  contactInfo: MessageState["contactInfo"]
) => {
  const url = new URL(shareLink);

  if (!url.searchParams.has("accountPk") || !url.searchParams.has("rdvSeed")) {
    console.log("bool err contact send");
    throw new Error("Share link is invalid");
  }

  const contactPk = bytesFromString(
    decodeURIComponent(url.searchParams.get("accountPk") || "")
  );
  try {
    await weshClient().ContactRequestSend({
      contact: {
        pk: contactPk,
        publicRendezvousSeed: bytesFromString(
          decodeURIComponent(url.searchParams.get("rdvSeed") || "")
        ),
      },
      ownMetadata: encodeJSON({
        name: contactInfo.name,
        avatar: contactInfo.avatar,
        timestamp: new Date().toISOString(),
        contact: {
          name: decodeURIComponent(url.searchParams.get("name") || ""),
          avatar: decodeURIComponent(url.searchParams.get("avatar") || ""),
        },
      }),
    });
  } catch (err) {
    if (!err?.message?.includes("ErrContactRequestContactAlreadyAdded")) {
      throw err;
    }
  }

  // await activateGroup(contactPk);
};

export const acceptFriendRequest = async (contactPk: Uint8Array) => {
  console.log(contactPk);
  await weshClient().ContactRequestAccept({
    contactPk,
  });

  return await activateGroup({ contactPk });
};

export const activateGroup = async (params: Partial<GroupInfo_Request>) => {
  try {
    const contactGroup = await weshClient().GroupInfo(params);

    console.log("contact group", contactGroup);

    await weshClient().ActivateGroup({
      groupPk: contactGroup.group?.publicKey,
    });

    return contactGroup;
  } catch (err) {
    console.log("get group info", err);
  }
};

export const sendMessage = async ({
  groupPk,
  message,
}: {
  groupPk?: Uint8Array;
  message: Omit<Message, "timestamp" | "senderId" | "id" | "groupId">;
}) => {
  if (!groupPk) {
    return;
  }
  try {
    await weshClient().AppMessageSend({
      groupPk,
      payload: encodeJSON({
        ...message,
        timestamp: new Date().toISOString(),
        senderId: stringFromBytes(weshConfig.config.accountPk),
      }),
    });
  } catch (err) {
    console.log("send message err", err);
  }
};
