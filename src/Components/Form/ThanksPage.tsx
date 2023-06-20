import ThankYouImg from "../../assets/images/icon-thank-you.svg";

const ThanksPage = () => {
  return (
    <div className="animate-fade-right animate-delay-200 flex-1 grid place-items-center bg-white px-6 py-4 shadow-md md:shadow-none rounded-md md:bg-none">
      <main className="flex flex-col items-center space-y-6 md:px-4 py-2">
        <img src={ThankYouImg} alt="Thank You" />
        <h2 className="font-bold text-3xl">Thank you!</h2>
        <p className="text-coolGray">
          Thanks for confirming your subscription! We hope you have fun using
          our platform. if you ever need support, please feel free to email us
          at contact@guerdoul.com
        </p>
      </main>
    </div>
  );
};

export default ThanksPage;
