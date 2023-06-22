import tw, { styled } from "twin.macro";

export const ThanksContainer = styled.div`
  ${tw`grid flex-1 px-6 py-4 bg-white rounded-md shadow-md animate-fade-right animate-delay-200 place-items-center md:shadow-none md:bg-none`}
`;

export const ThanksMainSection = styled.div`
  ${tw`flex flex-col items-center py-2 space-y-6 md:px-4`}

  h2 {
    ${tw`text-3xl font-bold`};
  }

  p {
    color: hsl(231, 11%, 63%);
  }
`;
