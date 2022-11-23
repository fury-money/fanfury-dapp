export type CreateDaoFormType = {
  image: string;
  organizationName: string;
  associatedTeritoriNameService: string;
  organizationDescription: string;
  structure: string;
};

export type ConfigureVotingFormType = {
  supportPercent: number;
  minimumApprovalPercent: number;
  days: string;
  hours: string;
  minutes: string;
};

export type TokenSettingFormType = {
  tokenName: string;
  tokenSymbol: string;
  tokenHolders: { address: string; balance: string }[];
};

export type LaunchingProcessStepType = {
  title: string;
  completeText: string;
  isComplete?: boolean;
};

export type MultiSigWalletType = {
  id: number;
  name: string;
  asset_type: string;
  approval: number;
  participants: number;
};

export type MultiSigWalletTransactionBasicType = {
  id: number;
  type: "staked" | "received" | "transfered";
  createdAt: string;
  amount: string;
};

export type MultiSigWalletTransactionProposalType = {
  id: number;
  type: "proposals";
  count: number;
};

export type MultiSigWalletTransactionType =
  | MultiSigWalletTransactionBasicType
  | MultiSigWalletTransactionProposalType;

export type MakeProposalFormType = {
  type: "transfer" | "stake";
  recipintAddress: string;
  amount: string;
  networkFee: string;
  senderAccount: string;
  approvalRequired: string;
};

export type ProposalsTransactionType = {
  id: number;
  type: "transfer" | "stake";
  createdAt: string;
  sending: "TORI";
  createdBy: string;
  time: string;
  amount: string;
  networkFee: string;
  approvedRequired: number;
  approvedBy: number;
  approvers: number;
};