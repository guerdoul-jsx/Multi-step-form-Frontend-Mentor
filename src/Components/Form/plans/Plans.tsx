import { useEffect } from "react";
import { Switch } from "@headlessui/react";
import { useContext } from "react";
import { StepsContext } from "../../../Context/StepsContext";
import { PlansProps, planType } from "../../../utils/types";
import { StepContainer, StepDescription, StepTitle } from "../../../main.style";
import {
  PlansContainer,
  CheckboxContainer,
  PlanTitle,
  CheckBoxInfo,
  BillingSection,
  BillingMonthly,
  BillingYearly,
} from "./Plans.style";

import AdvancedIcons from "/assets/images/icon-advanced.svg";
import ArcadeIcons from "/assets/images/icon-arcade.svg";
import ProIcons from "/assets/images/icon-pro.svg";

const iconsList = [ArcadeIcons, AdvancedIcons, ProIcons];

const Plans = () => {
  const {
    checkoutData: { plans },
    setFormValues,
    formValues,
    handleChange,
  }: PlansProps = useContext(StepsContext);

  const { billingType, selectedPlanId } = formValues;

  // TODO: FUNCTION TO GET THE CURRENT PLAN NEED TO BE SEPARATED
  const getCurrentPlan = (selectedPlanId: number) => {
    const currentPlan = plans.find(
      (plan: planType) => plan.id === selectedPlanId
    );
    return currentPlan;
  };

  const currentPlan = getCurrentPlan(selectedPlanId + 1);

  useEffect(() => {
    // ?! added the current plan to the state and tis need to be separated
    if (currentPlan && !Array.isArray(currentPlan)) {
      setFormValues({
        ...formValues,
        currentPlanItem: currentPlan,
      });
    }
  }, []);

  useEffect(() => {
    if (currentPlan && !Array.isArray(currentPlan)) {
      setFormValues({
        ...formValues,
        currentPlanItem: currentPlan,
        totalPrice: billingType
          ? currentPlan.price.yearly
          : currentPlan.price.monthly,
      });
    }
  }, [selectedPlanId, billingType]);

  const handleCheck = (event: boolean) => {
    setFormValues({ ...formValues, billingType: event });
  };

  return (
    <StepContainer>
      <StepTitle>Select your plan</StepTitle>
      <StepDescription>
        You have the option of montly or yearly billing.
      </StepDescription>
      <PlansContainer>
        {plans.map(({ name, price }: planType, index: number) => (
          <CheckboxContainer key={index}>
            <input
              type="radio"
              name="plan"
              id={name}
              onChange={handleChange}
              checked={selectedPlanId == index}
              value={index}
              className="absolute hidden w-full input-radio"
            />
            <PlanTitle htmlFor={name} className="option-info">
              <img src={iconsList[index]} alt={name} className="mr-3 md:mr-0" />
              <CheckBoxInfo>
                <div>{name}</div>
                <div>
                  ${billingType ? `${price.yearly}/yr` : `${price.monthly}/mo`}
                </div>
                {billingType && <div>2 months free</div>}
              </CheckBoxInfo>
            </PlanTitle>
          </CheckboxContainer>
        ))}
      </PlansContainer>
      <BillingSection>
        <BillingMonthly billingType={billingType}>Montly</BillingMonthly>
        <Switch
          checked={billingType}
          onChange={handleCheck}
          className={`${billingType ? "bg-lightGray" : "bg-marineBlue"}
          relative inline-flex ${
            billingType ? "border-lightGray" : "border-marineBlue"
          } h-[30px] w-[65px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
          <span
            aria-hidden="true"
            className={`${billingType ? "translate-x-9" : "translate-x-0"}
            pointer-events-none inline-block h-[26px] w-[25px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
          />
        </Switch>
        <BillingYearly billingType={billingType}>Yearly</BillingYearly>
      </BillingSection>
    </StepContainer>
  );
};

export default Plans;
