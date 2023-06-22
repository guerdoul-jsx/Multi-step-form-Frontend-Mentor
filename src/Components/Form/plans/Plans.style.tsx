import tw, { styled } from "twin.macro";

import { BillingProps } from "../../../utils/types";

export const PlansContainer = styled.div`
  ${tw`flex flex-col md:flex-row gap-x-4`}
`;

export const CheckboxContainer = styled.div`
  ${tw`relative h-[170px] basis-1/3 gap-x-2`}
`;

export const PlanTitle = styled.label`
  ${tw`cursor-pointer h-full flex flex-row items-center md:flex-col md:items-start md:justify-around px-4 py-2 mt-3 rounded-md border-[1px] border-lightGray`}
`;

export const CheckBoxInfo = styled.div`
  ${tw`md:mt-[30px] w-full`}

  div:nth-child(1) {
    ${tw`font-bold uppercase text-marineBlue`};
  }

  div:nth-child(2) {
    ${tw`text-coolGray`};
  }

  div:nth-child(3) {
    ${tw`text-[13px] font-semibold text-marineBlue`};
  }
`;

export const BillingSection = styled.div`
  ${tw`flex items-center justify-center py-2 mt-8 space-x-3 rounded-md md:mt-16 bg-magnolia `}
`;

export const BillingMonthly = styled.h1`
  ${tw`font-bold`};
  ${({ billingType }: BillingProps) =>
    billingType ? tw`text-lightGray` : tw`text-marineBlue`}
`;

export const BillingYearly = styled.h1`
  ${tw`font-bold`};

  ${({ billingType }: BillingProps) =>
    billingType ? tw`text-marineBlue` : tw`text-lightGray`}
`;
