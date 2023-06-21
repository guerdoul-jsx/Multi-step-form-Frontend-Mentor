import { ChangeEvent } from "react";

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

export interface errorType {
  name: string | null;
  email: string | null;
  phone: string | null;
}

export interface StepsProvider {
  children: React.ReactNode;
}

export type ContextType = {
  setPages: React.Dispatch<React.SetStateAction<number>>;
  setFormValues: React.Dispatch<React.SetStateAction<defaultProps>>;
  formValues: defaultProps;
  setErrors: React.Dispatch<React.SetStateAction<errorType>>;
  errors: errorType;
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

  errors: errorType;
  setErrors: React.Dispatch<React.SetStateAction<errorType>>;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  validatorsErrors: errorType;
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
