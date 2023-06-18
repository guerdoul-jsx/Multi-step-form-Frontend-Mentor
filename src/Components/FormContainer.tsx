import { useContext, useEffect } from "react";
import Infos from "./Form/Infos";
import Plans from "./Form/Plans";
import AddOns from "./Form/AddOns";
import Summary from "./Form/Summary";
import desktopSideBar from "../assets/images/bg-sidebar-desktop.svg";
import { StepsContext } from "../Context/StepsContext";
import { formValidator } from "./Form/Infos";
import { toast } from "react-hot-toast";

export type defaultProps = {
  name: string;
  email: string;
  phoneNumber: string;
  plan: "arcade" | "advanced" | "pro";
  billingType: "montly" | "yearly";
  addOns: string[];
  totalPrice: number;
};

const FormContainer = () => {
  const {
    pages,
    stepsNumber,
    formValues,
    setPages,
    setErrors,
    setFormValues,
    enabled,
  } = useContext(StepsContext);

  const {
    name,
    email,
    phoneNumber,
    billingType,
    plan,
    totalPrice,
    // addOns: { service, profile, storage },
  } = formValues;

  const validatorsErrors = formValidator(name, email, phoneNumber);

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

  // useEffect(() => {
  //   if (service) {
  //     setFormValues({
  //       ...formValues,
  //       totalPrice:
  //         billingType === "montly" ? +totalPrice + 1 : +totalPrice + 10,
  //     });
  //   }
  // }, [service]);

  // useEffect(() => {
  //   if (profile) {
  //     setFormValues({
  //       ...formValues,
  //       totalPrice:
  //         billingType === "montly" ? +totalPrice + 2 : +totalPrice + 20,
  //     });
  //   }
  // }, [profile]);

  // useEffect(() => {
  //   if (storage) {
  //     setFormValues({
  //       ...formValues,
  //       totalPrice:
  //         billingType === "montly" ? +totalPrice + 2 : +totalPrice + 20,
  //     });
  //   }
  // }, [storage]);

  const handleNextBtn = (event: any) => {
    event.preventDefault();
    // if (pages === 0) {
    //   if (email === "" || phoneNumber === "" || name === "") {
    //     setErrors(validatorsErrors);
    //     return;
    //   }
    // }
    if (!plan) {
      toast.error("Please chose a plan");
      return;
    }
    if (!billingType) {
      toast.error("Please chose a billing type");
      return;
    }

    setPages(pages === stepsNumber.length ? 0 : pages + 1);
  };

  const handlePrevBtn = (event: any) => {
    event.preventDefault();
    setPages(pages === 0 ? 0 : pages - 1);
  };

  return (
    <form className="max-w-5xl p-4 mx-auto shadow-md">
      <div className="flex flex-row ">
        <div className="sideBar">
          <div className="relative">
            <img src={desktopSideBar} alt="Desktop Sidebar" />
            <div className="steps-number w-[200px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 space-y-4">
              {stepsNumber.map((step) => (
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
};

export default FormContainer;
