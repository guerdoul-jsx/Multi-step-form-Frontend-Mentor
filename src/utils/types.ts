import { ChangeEvent } from "react";
import { UseFormRegister } from "react-hook-form";

export interface stepsType {
  id: number;
  number: number;
  name: string;
}

export interface addOns {
  service: boolean;
  storage: boolean;
  profile: boolean;
}

export interface defaultProps {
  name: string;
  email: string;
  phone: string;
  selectedPlanId: number;
  currentPlanItem: planType[] | planType;
  billingType: boolean;
  addOnsList: addOns;
  totalPrice: number;
}

export type personalForm = {
  name: string;
  email: string;
  phone: string;
};

export interface StepsProvider {
  children: React.ReactNode;
}

export type ContextType = {
  setPages: React.Dispatch<React.SetStateAction<number>>;
  setFormValues: React.Dispatch<React.SetStateAction<defaultProps>>;
  formValues: defaultProps;
  pages: number;
  enabled: boolean;
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  data: any;
};

export interface planType {
  id: number;
  name: string;
  icon: string;
  price: {
    monthly: number;
    yearly: number;
  };
  billingType: boolean;
}

export interface addOnsType {
  id: number;
  key: string;
  name: string;
  description: string;
  price: number;
}

export interface numberSteps {
  id: number;
  number: number;
  name: string;
}

export type dataType = {
  plans: planType[];
  Addons: addOnsType[];
  stepsNumber: numberSteps[];
};

export interface InfosProps {
  formValues: defaultProps;
  setFormValues: React.Dispatch<React.SetStateAction<defaultProps>>;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface PlansProps {
  checkoutData: dataType;
  setFormValues: React.Dispatch<React.SetStateAction<defaultProps>>;
  formValues: defaultProps;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface AddOnsProps {
  setFormValues: React.Dispatch<React.SetStateAction<defaultProps>>;
  formValues: defaultProps;
  checkoutData: dataType;
}

export interface SummaryProps {
  setPages: React.Dispatch<React.SetStateAction<number>>;
  formValues: defaultProps;
  setFormValues: React.Dispatch<React.SetStateAction<defaultProps>>;
}

// ** TYPES DOR STYLED COMPONENTS

export type AddOnLabelProps = {
  packsKey: boolean;
};

export type BillingProps = {
  billingType: boolean;
};

export type InfoComponentsType = {
  register: UseFormRegister<personalForm>;
};
