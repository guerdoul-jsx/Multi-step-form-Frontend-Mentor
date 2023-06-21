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
    if (/^[A-Za-z ]+$/.test(formValues.phone)) {
      setErrors({ ...validatorsErrors, phone: "Invalid Phone Number" });
      setFormValues({ ...formValues, phone: "" });
      return;
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

  const handleNavigation = (currentStep: number) => {
    // ?! check if the name and email and phone number it's not empty
    if (name === "" && email === "" && phone === "") {
      setPages(0);
      toast.error("All the field are required");
    } else {
      setPages(currentStep - 1);
    }
  };

  if (checkoutData.stepsNumber) {
    return (
      <form className="h-full max-w-5xl p-4 mx-auto">
        <div className="flex flex-col h-full md:flex-row">
          <div className="sideBar mb-14 md:mb-0 md:basis-1/3">
            <div className="hidden h-full rounded-md md:block md:relative md:bg-desktopImage md:bg-no-repeat md:bg-cover md:bg-center">
              <div className="steps-number w-10/12 mx-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[80%] space-y-8">
                {stepsNumber.map((step: any) => (
                  <div
                    className="flex items-center"
                    key={step.id}
                    onClick={() => handleNavigation(step.id)}
                  >
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
                  <div
                    className="flex items-center"
                    key={step.id}
                    onClick={() => handleNavigation(step.number)}
                  >
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
                    <div className="flex-col flex-1 hidden uppercase md:flex">
                      <h6 className="text-lightGray">Step {step.number}</h6>
                      <h2 className="font-medium text-white">{step.name}</h2>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex flex-col h-full py-6 mx-auto md:w-10/12">
              <div className="my-12">{formSteps()}</div>
              <div className="fixed bottom-0 left-0 flex flex-row justify-between w-full px-6 py-3 font-medium bg-white shadow-md md:py-0 md:shadow-none md:static md:bg-none md:mt-auto buttons-container">
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
                    className="px-4 py-2 ml-auto text-white rounded-md bg-marineBlue"
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
    return (
      <div className="flex items-center justify-center h-screen mx-auto loading loading-spinner"></div>
    );
  }
};

export default FormContainer;
