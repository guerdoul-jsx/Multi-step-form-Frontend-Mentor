import tw, { styled } from "twin.macro";

export const StepInputContainer = styled.div`
  ${tw`flex flex-col`}
`;

export const InputContainer = styled.div`
  ${tw`flex flex-col my-2 mt-3 space-y-2`}
`;

export const CenterItems = styled.div`
  ${tw`flex items-center justify-between`}
`;

export const InputTitle = styled.label`
  ${tw`text-marineBlue font-bold text-[15px]`}
`;

export const ErrorInputTitle = styled.div`
  ${tw`animate-fade-left text-[10px] font-semibold italic text-strawberrRed`}
`;
