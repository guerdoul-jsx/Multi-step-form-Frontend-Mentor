import React, { createContext, useState, useEffect, ChangeEvent } from "react";
import { errorType, defaultProps, planType } from "../utils/types";
import { dataType } from "../utils/types";

export interface StepsProvider {
  children: React.ReactNode;
}

const initialState: defaultProps = {
  name: "",
  email: "",
  phone: "",
  selectedPlanId: 1,
  currentPlanItem: {} as planType,
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

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/db/data.json");
      const data = await response.json();
      const currentIdPlan = selectedPlanId + 1;
      setCheckoutData(data as dataType);
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
      if (!Array.isArray(currentPlanItem)) {
        setFormValues({
          ...formValues,
          selectedPlanId: parseInt(event.target.value, 10),
          totalPrice: billingType
            ? currentPlanItem.price.yearly
            : currentPlanItem.price.monthly,
        });
      }
    }
  };

  const validateForm = () => {
    const errors = {} as defaultProps;

    if (!formValues.name.trim()) {
      errors.name = "Name is required";
    } else if (!/^[A-Za-z ]+$/.test(formValues.name)) {
      errors.name = "Invalid Name";
    }

    if (!formValues.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      errors.email = "Invalid email address";
    }

    if (!formValues.phone.trim()) {
      errors.phone = "Phone Number is required";
    } else if (!/^\+?\d{1,3}-?\d{3}-?\d{3}-?\d{4}$/.test(formValues.phone)) {
      errors.phone = "Invalid Phone Number";
    }

    return errors;
  };

  const validatorsErrors: errorType = validateForm();

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
        validatorsErrors,
      }}
    >
      {children}
    </StepsContext.Provider>
  );
};
