import ThankYouImg from "../../../assets/images/icon-thank-you.svg";
import { ThanksContainer, ThanksMainSection } from "./ThanksPage.style";

const ThanksPage = () => {
  return (
    <ThanksContainer>
      <ThanksMainSection>
        <img src={ThankYouImg} alt="Thank You" />
        <h2>Thank you!</h2>
        <p>
          Thanks for confirming your subscription! We hope you have fun using
          our platform. if you ever need support, please feel free to email us
          at contact@guerdoul.com
        </p>
      </ThanksMainSection>
    </ThanksContainer>
  );
};

export default ThanksPage;
