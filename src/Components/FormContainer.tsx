import { useContext } from "react";
import Infos from "./Form/Infos";
import Plans from "./Form/Plans";
import AddOns from "./Form/AddOns";
import Summary from "./Form/Summary";
import desktopSideBar from "../assets/images/bg-sidebar-desktop.svg";
import { StepsContext } from "../Context/StepsContext";
import { toast } from "react-hot-toast";
import { defaultProps } from "../utils/types";

const FormContainer = () => {
  const {
    pages,
    setPages,
    setErrors,
    checkoutData,
    formValues,
    setFormValues,
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
        return null;
    }
  };

  const validateForm = () => {
    const errors = {} as defaultProps;

    if (!formValues.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formValues.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      errors.email = "Invalid email address";
    }

    if (!formValues.phone.trim()) {
      errors.phone = "Phone Number is required";
    }

    return errors;
  };

  const handleNextBtn = (event: any) => {
    event.preventDefault();
    const validatorsErrors = validateForm();
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
    if (!billingType) {
      toast.error("Please chose a billing type");
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

  if (checkoutData.stepsNumber) {
    return (
      <form className="max-w-5xl p-4 mx-auto shadow-md">
        <div className="flex flex-row ">
          <div className="sideBar">
            <div className="relative">
              <img src={desktopSideBar} alt="Desktop Sidebar" />
              <div className="steps-number w-[200px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 space-y-4">
                {stepsNumber.map((step: any) => (
                  <div className="flex items-center" key={step.id}>
                    <li
                      className={`list-none mr-4 ${
                        step.id === pages ? "active" : "text-white"
                      } border-white cursor-pointer font-semibold border-2 rounded-full w-[40px] h-[40px] flex items-center justify-center`}
                    >
                      {step.number}
                    </li>
                    <div className="flex flex-col flex-1 uppercase">
                      <h6 className="text-lightGray">Step {step.number}</h6>
                      <h2 className="font-bold text-white">{step.name}</h2>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex flex-col w-8/12 h-full py-6 mx-auto">
              <>{formSteps()}</>
              <div className="flex flex-row justify-between px-6 mt-auto font-medium buttons-container">
                <button
                  onClick={handlePrevBtn}
                  disabled={pages === 0 ? true : false}
                  className="text-coolGray"
                >
                  Go Back
                </button>

                {pages === 3 ? (
                  <button className="px-4 py-2 text-white rounded-md bg-purplishBlue">
                    Confirm
                  </button>
                ) : (
                  <button
                    onClick={handleNextBtn}
                    className="px-4 py-2 text-white rounded-md bg-marineBlue"
                  >
                    Next Step
                  </button>
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
