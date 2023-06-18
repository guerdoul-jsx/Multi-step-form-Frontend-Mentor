import React, { createContext, useState, ChangeEvent } from "react";
import { addOnsType } from "../Components/Form/AddOns";

type StepsProvider = {
  children: React.ReactNode;
};

export type errorType = {
  name: string;
  email: string;
  phoneNumber: string;
};

export type defaultProps = {
  name: string;
  email: string;
  phoneNumber: string;
  plan: {
    arcade: boolean;
    advanced: boolean;
    pro: boolean;
  };
  billingType: boolean;
  addOns: addOnsType;
  totalPrice: number;
};

type stepsType = {
  id: number;
  number: number;
  name: string;
};

const steps: stepsType[] = [
  {
    id: 0,
    number: 1,
    name: "Your Info",
  },
  {
    id: 1,
    number: 2,
    name: "Select a Plan",
  },
  {
    id: 2,
    number: 3,
    name: "add-on",
  },
  {
    id: 3,
    number: 4,
    name: "Summary",
  },
];

type ContextType = {
  setPages: React.Dispatch<React.SetStateAction<number>>;
  setFormValues: React.Dispatch<React.SetStateAction<defaultProps>>;
  formValues: defaultProps;
  stepsNumber: stepsType[];
  setErrors: React.Dispatch<React.SetStateAction<errorType>>;
  errors: errorType;
  pages: number;
  enabled: boolean;
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>;
};

const initialState: defaultProps = {
  name: "",
  email: "",
  phoneNumber: "",
  plan: {
    arcade: false,
    advanced: true,
    pro: false,
  },
  billingType: true,
  addOns: {
    service: false,
    storage: false,
    profile: false,
  },
  totalPrice: 9,
};

export const StepsContext = createContext({} as ContextType);

export const StepsProvider = ({ children }: StepsProvider) => {
  const [stepsNumber, setStepsNumber] = useState(steps);
  const [pages, setPages] = useState(0);
  const [formValues, setFormValues] = useState(initialState);
  const [enabled, setEnabled] = useState(true);
  const [errors, setErrors] = useState({} as errorType);

  return (
    <StepsContext.Provider
      value={{
        setPages,
        pages,
        setFormValues,
        formValues,
        stepsNumber,
        setErrors,
        errors,
        enabled,
        setEnabled,
      }}
    >
      {children}
    </StepsContext.Provider>
  );
};
