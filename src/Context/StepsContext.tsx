import React, { createContext, useState, useEffect, ChangeEvent } from "react";
import { errorType, defaultProps, ContextType, planType } from "../utils/types";
import { dataType } from "../utils/types";

export interface StepsProvider {
  children: React.ReactNode;
}

const initialState: defaultProps = {
  name: "",
  email: "",
  phone: "",
  selectedPlanId: 1,
  currentPlanItem: {},
  billingType: true,
  addOnsList: {
    service: true,
    storage: true,
    profile: true,
  },
  totalPrice: 0,
};

export const StepsContext = createContext({} as any);

export const StepsProvider = ({ children }: StepsProvider) => {
  const [pages, setPages] = useState(0);
  const [formValues, setFormValues] = useState(initialState);
  const [checkoutData, setCheckoutData] = useState<dataType | []>([]);
  const [errors, setErrors] = useState({} as errorType);

  const { selectedPlanId, billingType, currentPlanItem } = formValues;

  const setPrice = (BillingType: boolean, currentItem: any) =>
    billingType ? currentItem.price.yearly : currentItem.price.montly;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/db/data.json");
      const data = await response.json();
      const currentIdPlan = selectedPlanId + 1;
      setCheckoutData(data);
      setFormValues({
        ...formValues,
        currentPlanItem: data.plans,
        totalPrice: data.plans.find((plan: any) => plan.id === currentIdPlan)
          .price.yearly,
      });
    };
    fetchData();
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.type === "text" || event.target.type === "email") {
      setFormValues({
        ...formValues,
        [event.target.name]: event.target.value,
      });
    }
    if (event.target.type === "radio") {
      setFormValues({
        ...formValues,
        selectedPlanId: parseInt(event.target.value, 10),
        totalPrice: setPrice(billingType, currentPlanItem),
      });
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

  const validatorsErrors = validateForm();

  return (
    <StepsContext.Provider
      value={{
        setPages,
        pages,
        setFormValues,
        formValues,
        setErrors,
        errors,
        checkoutData,
        handleChange,
        setPrice,
        validatorsErrors,
      }}
    >
      {children}
    </StepsContext.Provider>
  );
};
