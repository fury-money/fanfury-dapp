import React, { useState } from "react";

import { ScreenContainer } from "../../components/ScreenContainer";
import { BackTo } from "../../components/navigation/BackTo";
import {
  useCreateMultisigTransaction,
  useGetMultisigAccount,
} from "../../hooks/multisig";
import { ScreenFC } from "../../utils/navigation";
import { CheckLoadingModal } from "./components/CheckLoadingModal";
import { MultisigTransactionDelegateForm } from "./components/MultisigTransactionDelegateForm";
import { SignTransactionModal } from "./components/SignTransactionModal";
import {
  MultisigTransactionDelegateFormType,
  MultisigTransactionType,
} from "./types";

export const MultisigTransferScreen: ScreenFC<"MultisigTransfer"> = ({
  route,
  navigation,
}) => {
  // variables
  const [isTransactionVisible, setIsTransactionVisible] = useState(false);
  const {
    isLoading,
    mutate,
    data: transactionId,
  } = useCreateMultisigTransaction();
  const { address, backText } = route.params;
  const { data } = useGetMultisigAccount(address);
  const [formData, setFormData] =
    useState<MultisigTransactionDelegateFormType>();

  // functions
  const toggleTransactionModal = () =>
    setIsTransactionVisible(!isTransactionVisible);

  const onSubmitForm = (formData: MultisigTransactionDelegateFormType) => {
    setFormData(formData);
    toggleTransactionModal();
  };

  const handleCreate = () => {
    toggleTransactionModal();

    if (data?.accountData && formData && data.dbData._id) {
      mutate({
        formData: {
          ...formData,
          multisigId: data.dbData._id,
          type: MultisigTransactionType.TRANSFER,
        },
        accountOnChain: data?.accountData[1],
      });
    }
  };

  const onCompleteCreation = () => {
    if (transactionId) {
      navigation.reset({
        index: 1,
        routes: [
          { name: "Multisig" },
          {
            name: "MultisigTransactionProposal",
            params: {
              address,
              backText: "Multisig Dashboard",
            },
          },
        ],
      });
    }
  };

  // returns
  return (
    <ScreenContainer
      headerChildren={<BackTo label={backText || "Multisig Legacy"} />}
      footerChildren={<></>}
      noMargin
      fullWidth
      noScroll
      isHeaderSmallMargin
    >
      <MultisigTransactionDelegateForm
        type="transfer"
        title="Create a New Transaction"
        transferText="Send to"
        submitBtnText="Create Transaction"
        onSubmit={onSubmitForm}
      />

      <SignTransactionModal
        isVisible={isTransactionVisible}
        onCancel={toggleTransactionModal}
        onConfirm={handleCreate}
        amount={formData?.amount}
        address={address}
      />

      <CheckLoadingModal
        isVisible={isLoading}
        onComplete={onCompleteCreation}
      />
    </ScreenContainer>
  );
};
