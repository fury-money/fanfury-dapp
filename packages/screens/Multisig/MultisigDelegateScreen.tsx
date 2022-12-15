import React, { useState } from "react";

import { ScreenContainer } from "../../components/ScreenContainer";
import { BackTo } from "../../components/navigation/BackTo";
import { useCreateMultisigDelegate } from "../../hooks/multisig/useCreateMultisigDelegate";
import { useGetMultisigAccount } from "../../hooks/multisig/useGetMultisigAccount";
import { ScreenFC } from "../../utils/navigation";
import { CheckLoadingModal } from "./components/CheckLoadingModal";
import { MultisigTranscationDelegateForm } from "./components/MultisigTranscationDelegateForm";
import { SignTransactionModal } from "./components/SignTransactionModal";
import {
  MultisigTransactionDelegateFormType,
  MultisigTransactionType,
} from "./types";

export const MultisigDelegateScreen: ScreenFC<"MultisigDelegate"> = ({
  route,
  navigation,
}) => {
  // variables
  const [isTransactionVisible, setIsTransactionVisible] = useState(false);
  const {
    isLoading,
    mutate,
    data: transactionId,
  } = useCreateMultisigDelegate();
  const { address } = route.params;
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
          type: MultisigTransactionType.STAKE,
        },
        accountOnChain: data?.accountData[1],
      });
    }
  };

  const onCompleteCreation = () => {
    if (transactionId) {
      navigation.navigate("MultisigTransactionProposal", {
        address,
      });
    }
  };

  // returns
  return (
    <ScreenContainer
      headerChildren={<BackTo label="Multisig Legacy" />}
      footerChildren={<></>}
      noMargin
      fullWidth
      noScroll
      isHeaderSmallMargin
    >
      <MultisigTranscationDelegateForm
        type="delegate"
        title="Create a New Transaction"
        transferText="Delegate to"
        submitBtnText="Delegate"
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