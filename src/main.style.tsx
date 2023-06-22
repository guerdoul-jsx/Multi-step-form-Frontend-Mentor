import tw, { styled } from "twin.macro";

export const AppContainer = styled.div`
  ${tw`items-center justify-center w-full h-screen bg-magnolia md:bg-white`}
`;

export const FormContainer = styled.form`
  ${tw`h-full max-w-5xl p-4 mx-auto`}
`;

export const Form = styled.div`
  ${tw`my-12`}
`;

export const StepsContainer = styled.div`
  ${tw`flex flex-col h-full md:flex-row`}
`;

export const SideBar = styled.div`
  ${tw`mb-14 md:mb-0 md:basis-1/3`}
`;

export const FormSection = styled.div`
  ${tw`flex-1`}
`;

export const NavigationSection = styled.div`
  ${tw`fixed bottom-0 left-0 flex flex-row justify-between w-full px-6 py-3 font-medium bg-white shadow-md md:py-0 md:shadow-none md:static md:bg-none md:mt-auto`}
`;

export const FormSectionContainer = styled.div`
  ${tw`flex flex-col h-full py-6 mx-auto md:w-10/12`}
`;

export const DesktopStepsContainer = styled.div`
  ${tw`hidden h-full rounded-md md:block md:relative md:bg-desktopImage md:bg-no-repeat md:bg-cover md:bg-center`}
`;

export const DesktopStepsHeader = styled.div`
  ${tw`w-10/12 mx-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[80%] space-y-8`}
`;

export const MobileStepsHeader = styled.div`
  ${tw`flex items-center justify-around md:justify-between w-10/12 mx-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[80%] md:space-y-8`}
`;

export const MobileStepsContainer = styled.div`
  ${tw`block h-[200px] md:hidden absolute left-0 top-0 w-full bg-mobileImage bg-no-repeat bg-cover bg-center `}
`;

export const StepContainer = styled.div`
  ${tw`px-6 py-4 bg-white rounded-md shadow-md animate-fade-right md:shadow-none md:bg-none animate-delay-200`}
`;

export const StepTitle = styled.h1`
  ${tw`my-2 text-3xl font-bold text-left text-marineBlue`}
`;

export const StepDescription = styled.p`
  ${tw`leading-[1.8] md:text-[18px] w-10/12 text-coolGray`}
`;

export const StepCenter = styled.div`
  ${tw`flex items-center`}
`;

type StepItemProps = {
  stepId: number;
  pages: number;
};

export const StepItem = styled.li`
  ${tw`list-none mr-4 border-white cursor-pointer font-semibold border-[1px] rounded-full w-[40px] h-[40px] flex items-center justify-center`} ${({
    stepId,
    pages,
  }: StepItemProps) =>
    stepId === pages && tw`border-none bg-lightBlue text-marineBlue`}
    ${({ stepId, pages }: StepItemProps) =>
    pages === 4 && stepId === 3
      ? tw`border-none bg-lightBlue text-marineBlue`
      : stepId === pages
      ? tw`text-marineBlue`
      : tw`text-white`}
`;

export const StepItemInfo = styled.li`
  ${tw`flex-col flex-1 hidden uppercase md:flex`}

  h6 {
    color: hsl(229, 24%, 87%);
  }

  h2 {
    color: hsl(0, 0%, 100%);
    font-weight: bold;
  }
`;

export const Loading = styled.div`
  ${tw`flex items-center justify-center h-screen mx-auto loading loading-spinner`}
`;
