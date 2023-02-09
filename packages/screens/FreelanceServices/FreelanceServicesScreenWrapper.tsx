import React from "react";

import { BrandText } from "../../components/BrandText";
import { ScreenContainer } from "../../components/ScreenContainer";

export const FreelanceServicesScreenWrapper: React.FC = ({ children }) => {
  return (
    <ScreenContainer
      fullWidth
      headerChildren={<BrandText>Freelance Service</BrandText>}
    >
      {children}
    </ScreenContainer>
  );
};
