import tw, { styled } from "twin.macro";

export const AddOnsContainer = styled.div`
  ${tw`flex flex-col mt-4 gap-y-4`}
`;

export const AddOnsPack = styled.div`
  ${tw`w-full select-none`}
`;

type AddOnLabel = {
  packsKey: boolean;
};
export const AddOnLabel = styled.label`
  ${tw`grid grid-cols-8 gap-x-2 px-2 place-items-center  rounded-md border-[1px] cursor-pointer`}

  ${({ packsKey }: AddOnLabel) =>
    packsKey ? tw`border-purplishBlue bg-magnolia` : tw`border-lightGray`}
`;

export const AddOnsInfo = styled.div`
  ${tw`flex flex-col justify-between w-full col-span-5 py-2 md:py-4`}

  div:nth-child(1) {
    ${tw`font-bold text-marineBlue`};
  }

  div:nth-child(2) {
    ${tw`text-[12px] text-coolGray`};
  }
`;

export const PacksPrice = styled.div`
  ${tw`col-span-1 ml-8 text-sm font-medium text-center text-purplishBlue`}
`;
