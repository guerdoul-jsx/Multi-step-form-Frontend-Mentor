import { useContext, useEffect } from "react";
import { StepsContext } from "../../../Context/StepsContext";
import { SummaryProps, planType } from "../../../utils/types";

import { StepContainer, StepDescription, StepTitle } from "../../../main.style";

import {
  SummaryContainer,
  PackInfoSection,
  SummaryInfoSection,
  SummaryInfoPrice,
  SummaryAddonsList,
  SummaryTotalPrice,
} from "./Summary.style";

const Summary = () => {
  const { setPages, formValues, setFormValues }: SummaryProps =
    useContext(StepsContext);

  const {
    currentPlanItem,
    billingType,
    totalPrice,
    addOnsList: { service, storage, profile },
  } = formValues;

  const { name, price } = !Array.isArray(currentPlanItem)
    ? currentPlanItem
    : ({} as planType);

  const handleBtnChange = () => {
    setPages((prev: number) => prev - 2);
  };

  useEffect(() => {
    setFormValues({ ...formValues });
  }, []);

  return (
    <StepContainer>
      <StepTitle>Finishing up</StepTitle>
      <StepDescription>
        Double-check everything looks Ok before confirming.
      </StepDescription>
      <SummaryContainer>
        <PackInfoSection>
          <SummaryInfoSection>
            <h1>{billingType ? name : `${name} (Monthly)`}</h1>
            <button type="button" onClick={handleBtnChange}>
              Change
            </button>
          </SummaryInfoSection>
          <SummaryInfoPrice>
            <p>{billingType ? `${price.yearly}/yr` : `${price.monthly}/mo`}</p>
          </SummaryInfoPrice>
        </PackInfoSection>
        <hr className="text-lightGray" />
        <SummaryAddonsList>
          {service && (
            <div>
              <p>Online service</p>
              <p>{billingType ? "+$10/yr" : "+$1/mo"}</p>
            </div>
          )}
          {storage && (
            <div>
              <p>Larger Storage</p>
              <p> {billingType ? "+$20/yr" : "+$2/mo"}</p>
            </div>
          )}
          {profile && (
            <div>
              <p>Customizable profile</p>
              <p> {billingType ? "+$20/yr" : "+$2/mo"}</p>
            </div>
          )}
        </SummaryAddonsList>
      </SummaryContainer>
      <SummaryTotalPrice>
        <h1>Total {billingType ? "(per year)" : "(per month)"} </h1>
        <h1>{billingType ? `$${totalPrice}/year` : `$${totalPrice}/month`}</h1>
      </SummaryTotalPrice>
    </StepContainer>
  );
};

export default Summary;
