import { useContext, useEffect, useState, ChangeEvent } from "react";
import { StepsContext } from "../../../Context/StepsContext";
import { AddOnsProps, addOns } from "../../../utils/types";
import { StepContainer, StepDescription, StepTitle } from "../../../main.style";

import {
  AddOnsContainer,
  AddOnsPack,
  AddOnLabel,
  AddOnsInfo,
  PacksPrice,
} from "./AddOns.styles";

const AddOns = () => {
  const { setFormValues, formValues, checkoutData }: AddOnsProps =
    useContext(StepsContext);
  const { Addons } = checkoutData;

  const { billingType, addOnsList, totalPrice } = formValues;

  const { service, storage, profile } = addOnsList;

  const [serviceCounter, setServiceCounter] = useState(0);
  const [storageCounter, setStorageCounter] = useState(0);
  const [profileCounter, setProfileCounter] = useState(0);

  const handleCheck = (event: ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      addOnsList: {
        ...addOnsList,
        [event.target.name]: event.target.checked,
      },
    });
    setServiceCounter((prev) => prev + 1);
    setStorageCounter((prev) => prev + 1);
    setProfileCounter((prev) => prev + 1);
  };

  // ?! UPDATE THE PRICING VALUE BY SERVICE
  useEffect(() => {
    if (serviceCounter > 0) {
      if (service === false) {
        setFormValues({
          ...formValues,
          totalPrice: billingType === true ? totalPrice - 10 : totalPrice - 1,
        });
      }
      if (service === true) {
        setFormValues({
          ...formValues,
          totalPrice: billingType === true ? totalPrice + 10 : totalPrice + 1,
        });
      }
    }
  }, [service]);

  // ?! UPDATE THE PRICING VALUE BY STORAGE
  useEffect(() => {
    if (storageCounter > 0) {
      if (storage === false) {
        setFormValues({
          ...formValues,
          totalPrice: billingType === true ? totalPrice - 20 : totalPrice - 2,
        });
      }
      if (storage === true) {
        setFormValues({
          ...formValues,
          totalPrice: billingType === true ? totalPrice + 20 : totalPrice + 2,
        });
      }
    }
  }, [storage]);

  // ?! UPDATE THE PRICING VALUE BY PROFILE
  useEffect(() => {
    if (profileCounter > 0) {
      if (profile === false) {
        setFormValues({
          ...formValues,
          totalPrice: billingType === true ? totalPrice - 20 : totalPrice - 2,
        });
      }
      if (profile === true) {
        setFormValues({
          ...formValues,
          totalPrice: billingType === true ? totalPrice + 20 : totalPrice + 2,
        });
      }
    }
  }, [profile]);

  return (
    <StepContainer>
      <StepTitle>Pick add-ons</StepTitle>
      <StepDescription>
        Add-ons help enhance your gaming experience
      </StepDescription>
      <AddOnsContainer>
        {Addons.map((packs) => (
          <AddOnsPack key={packs.id}>
            <AddOnLabel
              htmlFor={packs.key}
              packsKey={addOnsList[packs.key as keyof addOns]}
            >
              <input
                type="checkbox"
                className="col-span-1 add-ons checkbox checkbox-primary"
                id={packs.key}
                name={packs.key}
                onChange={handleCheck}
                checked={addOnsList[packs.key as keyof addOns]}
              />
              <AddOnsInfo>
                <div>{packs.name}</div>
                <div>{packs.description}</div>
              </AddOnsInfo>
              <PacksPrice>
                {billingType
                  ? `+$${+packs.price * 10}/yr`
                  : `+$${packs.price}/mo`}
              </PacksPrice>
            </AddOnLabel>
          </AddOnsPack>
        ))}
      </AddOnsContainer>
    </StepContainer>
  );
};

export default AddOns;
