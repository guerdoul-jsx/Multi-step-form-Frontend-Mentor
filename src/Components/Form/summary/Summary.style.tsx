import tw, { styled } from "twin.macro";

export const SummaryContainer = styled.div`
  ${tw`flex flex-col px-6 py-2 mt-4 rounded-md bg-magnolia`}
`;

export const PackInfoSection = styled.div`
  ${tw`grid items-center justify-between grid-cols-2`}
`;

export const SummaryInfoSection = styled.div`
  ${tw`py-2`}

  h1 {
    ${tw`font-bold capitalize text-marineBlue`}
  }

  button {
    ${tw`mb-2 underline`}
  }
`;

export const SummaryInfoPrice = styled.div`
  ${tw`text-right`}

  p {
    ${tw`font-bold text-marineBlue`}
  }
`;

export const SummaryAddonsList = styled.div`
  ${tw`mt-2`}
  div {
    ${tw`flex items-center justify-between py-2`}

    p:nth-child(1) {
      ${tw`text-coolGray`}
    }
    p:nth-child(2) {
      ${tw`text-sm font-semibold md:font-medium text-marineBlue`}
    }
  }
`;

export const SummaryTotalPrice = styled.section`
  ${tw`flex items-center justify-between px-6 mt-2`}

  h1:nth-child(1) {
    ${tw`py-2 text-coolGray`}
  }

  h1:nth-child(2) {
    ${tw`text-xl font-semibold text-purplishBlue`}
  }
`;
