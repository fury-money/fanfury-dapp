import { useInfiniteQuery } from "@tanstack/react-query";

import { transactionsByUserAddress } from "../../utils/founaDB/multisig/multisigGraphql";
import { MultisigTransactionListType } from "./useFetchMultisigTransactionsById";

export const useFetchMultisigTransactionsByAddress = (userAddress: string) => {
  //  request
  const request = useInfiniteQuery<{
    data: MultisigTransactionListType[];
    after: string;
  }>(
    ["multisig-transactions", userAddress],
    async () => {
      const saveRes = await transactionsByUserAddress(userAddress, 5);
      console.log("saveRes2222", saveRes);

      const { after, data } = saveRes.data.data.transactionsByUserAddress;

      return {
        data: data.map(
          (s: MultisigTransactionListType & { dataJSON: string }) => ({
            ...s,
            dataJSON: JSON.parse(s.dataJSON),
          })
        ),
        after,
      };
    },
    {
      getNextPageParam: (lastPage) => lastPage.after,
    }
  );

  return request;
};
