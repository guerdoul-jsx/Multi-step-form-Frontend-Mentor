import { useContext } from "react";
import Infos from "./Form/Infos";
import Plans from "./Form/Plans";
import AddOns from "./Form/AddOns";
import Summary from "./Form/Summary";
import { StepsContext } from "../Context/StepsContext";
import { toast } from "react-hot-toast";
import ThanksPage from "./Form/ThanksPage";

const FormContainer = () => {
  const {
    pages,
    setPages,
    setErrors,
    checkoutData,
    formValues,
    setFormValues,
    validatorsErrors,
  } = useContext(StepsContext);

  const { stepsNumber, plans } = checkoutData;
  const {
    selectedPlanId,
    addOnsList,
    billingType,
    totalPrice,
    name,
    email,
    phone,
    currentPlanItem,
  } = formValues;

  const { profile, service, storage } = addOnsList;

  const setCurrentPrice = () => {
    let price = totalPrice;
    if (service === true) {
      price += billingType === true ? 10 : 1;
    }
    if (profile === true) {
      price += billingType === true ? 20 : 2;
    }

    if (storage === true) {
      price += billingType === true ? 20 : 2;
    }

    return price;
  };

  const formSteps = () => {
    switch (pages) {
      case 0:
        return <Infos />;
      case 1:
        return <Plans />;
      case 2:
        return <AddOns />;
      case 3:
        return <Summary />;

      default:
        return <ThanksPage />;
    }
  };

  const handleNextBtn = (event: any) => {
    event.preventDefault();
    if (pages === 0) {
      if (email === "" || phone === "" || name === "") {
        setErrors(validatorsErrors);
        return;
      }
    }
    if (!currentPlanItem) {
      toast.error("Please chose a plan");
      return;
    }
    if (pages === 1) {
      const currentId = selectedPlanId + 1;
      const currentPrice = setCurrentPrice();

      // ?! added the current plan to the state and tis need to be separated
      const currentPlan = plans.find((plan: any) => plan.id === currentId);
      console.log(currentId);
      setFormValues({
        ...formValues,
        currentPlanItem: currentPlan,
        totalPrice: currentPrice,
      });
    }
    console.log("clicked");
    setPages(pages === stepsNumber.length ? 0 : pages + 1);
  };

  const handlePrevBtn = (event: any) => {
    event.preventDefault();
    setPages(pages === 0 ? 0 : pages - 1);
  };

  const hanldeSubmit = (event: any) => {
    event.preventDefault();
    setPages((prev: number) => prev + 1);
    console.log(formValues);
    toast.success("Your subscription has been confirmed");
  };

  if (checkoutData.stepsNumber) {
    return (
      <form className="max-w-5xl p-4 mx-auto shadow-md h-full md:bg-white">
        <div className="flex flex-col md:flex-row h-full">
          <div className="sideBar mb-14 md:mb-0 md:basis-1/3">
            <div className="hidden md:block md:relative h-full md:bg-desktopImage md:bg-no-repeat md:bg-cover md:bg-center rounded-md">
              <div className="steps-number w-10/12 mx-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[80%] space-y-8">
                {stepsNumber.map((step: any) => (
                  <div className="flex items-center" key={step.id}>
                    <li
                      className={`list-none mr-4 ${
                        step.id === pages && "active"
                      } ${
                        pages === 4 && step.id === 3
                          ? "active required:text-marineBlue"
                          : step.id === pages
                          ? "text-marineBlue"
                          : "text-white"
                      } border-white cursor-pointer font-semibold border-[1px] rounded-full w-[40px] h-[40px] flex items-center justify-center`}
                    >
                      {step.number}
                    </li>
                    <div className="flex flex-col flex-1 uppercase">
                      <h6 className="text-lightGray">Step {step.number}</h6>
                      <h2 className="font-medium text-white">{step.name}</h2>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="block h-[200px] md:hidden absolute left-0 top-0 w-full bg-mobileImage bg-no-repeat bg-cover bg-center ">
              <div className="steps-number flex item-center justify-around md:justify-between w-10/12 mx-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[80%] md:space-y-8">
                {stepsNumber.map((step: any) => (
                  <div className="flex items-center" key={step.id}>
                    <li
                      className={`list-none mr-4 ${
                        step.id === pages && "active"
                      } ${
                        pages === 4 && step.id === 3
                          ? "active required:text-marineBlue"
                          : step.id === pages
                          ? "text-marineBlue"
                          : "text-white"
                      } border-white cursor-pointer font-semibold border-[1px] rounded-full w-[40px] h-[40px] flex items-center justify-center`}
                    >
                      {step.number}
                    </li>
                    <div className="hidden md:flex flex-col flex-1 uppercase">
                      <h6 className="text-lightGray">Step {step.number}</h6>
                      <h2 className="font-medium text-white">{step.name}</h2>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex flex-col md:w-10/12 h-full py-6 mx-auto">
              <div className="my-12">{formSteps()}</div>
              <div className="fixed bottom-0 left-0 w-full bg-white py-3 md:py-0 shadow-md md:shadow-none md:static md:bg-none flex flex-row justify-between px-6 md:mt-auto font-medium buttons-container">
                {pages > 0 && pages < 4 && (
                  <button
                    onClick={handlePrevBtn}
                    disabled={pages === 0 ? true : false}
                    className="text-coolGray"
                  >
                    Go Back
                  </button>
                )}

                {pages === 3 ? (
                  <button
                    className="px-4 py-2 text-white rounded-md bg-purplishBlue"
                    onClick={hanldeSubmit}
                  >
                    Confirm
                  </button>
                ) : pages < 4 ? (
                  <button
                    onClick={handleNextBtn}
                    className="px-4 py-2 text-white rounded-md bg-marineBlue ml-auto"
                  >
                    Next Step
                  </button>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  } else {
    return <span className="loading loading-spinner"></span>;
  }
};

export default FormContainer;
