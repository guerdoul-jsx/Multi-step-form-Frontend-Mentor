import { useContext } from "react";
import Infos from "./Form/info/Infos";
import Plans from "./Form/plans/Plans";
import AddOns from "./Form/addOns/AddOns";
import Summary from "./Form/summary/Summary";
import { StepsContext } from "../Context/StepsContext";
import { toast } from "react-hot-toast";
import ThanksPage from "./Form/thank/ThanksPage";
import {
  FormContainer as FConatiner,
  StepsContainer,
  SideBar,
  FormSection,
  MobileStepsContainer,
  DesktopStepsContainer,
  DesktopStepsHeader,
  MobileStepsHeader,
  StepCenter,
  StepItem,
  StepItemInfo,
  Loading,
  FormSectionContainer,
  Form,
  NavigationSection,
} from "../main.style";

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
    // if (pages === 0) {
    //   if (email === "" || phone === "" || name === "") {
    //     setErrors(validatorsErrors);
    //     return;
    //   }
    // }
    // if (/^[A-Za-z ]+$/.test(formValues.phone)) {
    //   setErrors({ ...validatorsErrors, phone: "Invalid Phone Number" });
    //   setFormValues({ ...formValues, phone: "" });
    //   return;
    // }

    // if (!currentPlanItem) {
    //   toast.error("Please chose a plan");
    //   return;
    // }
    // if (pages === 1) {
    //   const currentId = selectedPlanId + 1;
    //   const currentPrice = setCurrentPrice();

    //   // ?! added the current plan to the state and tis need to be separated
    //   const currentPlan = plans.find((plan: any) => plan.id === currentId);
    //   console.log(currentId);
    //   setFormValues({
    //     ...formValues,
    //     currentPlanItem: currentPlan,
    //     totalPrice: currentPrice,
    //   });
    // }
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
      <FConatiner>
        <StepsContainer>
          <SideBar>
            <DesktopStepsContainer>
              <DesktopStepsHeader>
                {stepsNumber.map((step: any) => (
                  <StepCenter
                    key={step.id}
                    onClick={() => handleNavigation(step.id)}
                  >
                    <StepItem pages={pages} stepId={step.id}>
                      {step.number}
                    </StepItem>
                    <StepItemInfo>
                      <h6>Step {step.number}</h6>
                      <h2>{step.name}</h2>
                    </StepItemInfo>
                  </StepCenter>
                ))}
              </DesktopStepsHeader>
            </DesktopStepsContainer>
            <MobileStepsContainer>
              <MobileStepsHeader>
                {stepsNumber.map((step: any) => (
                  <StepCenter
                    key={step.id}
                    onClick={() => handleNavigation(step.number)}
                  >
                    <StepItem pages={pages} stepId={step.id}>
                      {step.number}
                    </StepItem>
                    <StepItemInfo>
                      <h6>Step {step.number}</h6>
                      <h2>{step.name}</h2>
                    </StepItemInfo>
                  </StepCenter>
                ))}
              </MobileStepsHeader>
            </MobileStepsContainer>
          </SideBar>
          <FormSection>
            <FormSectionContainer>
              <Form>{formSteps()}</Form>
              <NavigationSection>
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
              </NavigationSection>
            </FormSectionContainer>
          </FormSection>
        </StepsContainer>
      </FConatiner>
    );
  } else {
    return <Loading />;
  }
};

export default FormContainer;
