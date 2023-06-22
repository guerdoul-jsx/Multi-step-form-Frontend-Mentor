import { useContext } from "react";
import Infos from "./Form/info/Infos";
import Plans from "./Form/plans/Plans";
import AddOns from "./Form/addOns/AddOns";
import Summary from "./Form/summary/Summary";
import { StepsContext } from "../Context/StepsContext";
import { toast } from "react-hot-toast";
import ThanksPage from "./Form/thank/ThanksPage";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import { useForm, SubmitHandler } from "react-hook-form";
import { personalForm, planType } from "../utils/types";

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
  const { pages, setPages, checkoutData, formValues, setFormValues } =
    useContext(StepsContext);

  const { stepsNumber, plans } = checkoutData;
  const {
    selectedPlanId,
    addOnsList,
    billingType,
    totalPrice,
    name,
    email,
    phone,
  } = formValues;

  //?! YUP validation

  const formShecma = yup.object().shape({
    name: yup
      .string()
      .required("Full name is required")
      .min(3, "Full name must be at least 3 characters"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phone: yup
      .string()
      .matches(/\d{1,14}$/, "Invalid phone number")
      .required("Phone number is required")
      .min(10, "Phone number must be at least 10 characters"),
  });
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<personalForm>({
    resolver: yupResolver(formShecma),
  });

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
  const onSubmit: SubmitHandler<personalForm> = (data) => {
    const { name, email, phone } = data;
    if (pages === 0) {
      if (name && email && phone) {
        setFormValues({ ...formValues, name, email, phone });
      } else {
        toast.error("All fields are required ;;");
        return;
      }
    }

    if (pages === 1) {
      const currentId = selectedPlanId + 1;
      const currentPrice = setCurrentPrice();

      // ?! added the current plan to the state and tis need to be separated
      const currentPlan = plans.find((plan: planType) => plan.id === currentId);
      console.log(currentId);
      setFormValues({
        ...formValues,
        currentPlanItem: currentPlan,
        totalPrice: currentPrice,
      });
    }
    setPages(pages === stepsNumber.length ? 0 : pages + 1);
  };

  const formSteps = () => {
    switch (pages) {
      case 0:
        return <Infos errors={errors} register={register} />;
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

  const handlePrevBtn = (event: any) => {
    event.preventDefault();
    setPages(pages === 0 ? 0 : pages - 1);
  };

  const handleNavigation = (currentStep: number) => {
    // ?! check if the name and email and phone number it's not empty
    if (name === "" && email === "" && phone === "") {
      setPages(0);
      toast.error("All the field are required");
    } else {
      setPages(currentStep);
    }
  };

  if (checkoutData.stepsNumber) {
    return (
      <FConatiner>
        <StepsContainer>
          <SideBar>
            <DesktopStepsContainer
              style={{ backgroundImage: "url(https://svgshare.com/i/uZN.svg)" }}
            >
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
                {pages < 4 && (
                  <button
                    type="submit"
                    onClick={handleSubmit(onSubmit)}
                    className={`px-4 py-2 ml-auto text-white rounded-md ${
                      pages < 3 ? "bg-marineBlue" : "bg-purplishBlue"
                    } `}
                  >
                    {pages < 3 ? "Next Step" : "Confirm"}
                  </button>
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
