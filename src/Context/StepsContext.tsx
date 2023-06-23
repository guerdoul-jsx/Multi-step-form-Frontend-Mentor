import React, { createContext, useState, useEffect, ChangeEvent } from "react";
import { defaultProps, planType } from "../utils/types";
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

  const { selectedPlanId, billingType, currentPlanItem } = formValues;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(import.meta.env.VITE_DATA_API);
      const apiData = await response.json();
      const currentIdPlan = selectedPlanId + 1;
      const data = apiData.record;
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

  return (
    <StepsContext.Provider
      value={{
        setPages,
        pages,
        setFormValues,
        formValues,
        checkoutData,
        handleChange,
      }}
    >
      {children}
    </StepsContext.Provider>
  );
};
