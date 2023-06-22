import { useContext, FocusEvent, KeyboardEvent } from "react";
import { StepsContext } from "../../../Context/StepsContext";
import { InfosProps } from "../../../utils/types";

// STYLED COMPONENTS //
import {
  StepInputContainer,
  InputContainer,
  CenterItems,
  InputTitle,
  ErrorInputTitle,
} from "./Infos.style";
import { StepContainer } from "../../../main.style";
import { StepDescription } from "../../../main.style";
import { StepTitle } from "../../../main.style";

const Infos = () => {
  const { formValues, errors, setErrors, handleChange }: InfosProps =
    useContext(StepsContext);

  const { name, email, phone } = formValues;

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    // ** REMMOVE THE ERROR MESSAGE FROM THE NAME IF THE FIELD IS NOT EMPTY
    if (name === "name") {
      if (value !== "") {
        setErrors({ ...errors, name: null });
      }
    }
    // ** REMMOVE THE ERROR MESSAGE FROM THE EMAIL IF THE FIELD IS NOT EMPTY
    if (name === "email") {
      if (value !== "") {
        setErrors({ ...errors, email: null });
      }
    }
    // ** REMMOVE THE ERROR MESSAGE FROM THE PHONE IF THE FIELD IS NOT EMPTY
    if (name === "phone") {
      if (value !== "") {
        setErrors({ ...errors, phone: null });
      }
    }
  };

  const handleKeyUpPhone = (event: KeyboardEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    let inputValue = target.value;
    const onlyNumber = inputValue.replace(/\D/g, "");
    target.value = onlyNumber;
  };

  return (
    <StepContainer>
      <StepTitle>Personal Info</StepTitle>
      <StepDescription>
        Please provide your name, email address, and phone number.
      </StepDescription>
      <StepInputContainer>
        <InputContainer>
          <CenterItems>
            <InputTitle htmlFor="name">Name</InputTitle>
            {errors.name && <ErrorInputTitle>{errors.name}</ErrorInputTitle>}
          </CenterItems>
          <input
            type="text"
            id="name"
            onChange={handleChange}
            value={name}
            name="name"
            onBlur={handleBlur}
            placeholder="e.g . Stephen King"
            className={`block rounded-md border-[1px] ${
              errors.name ? "border-strawberrRed" : "border-lightGray"
            } `}
            required
          />
        </InputContainer>
        <InputContainer>
          <CenterItems>
            <InputTitle htmlFor="email">Email Address</InputTitle>
            {errors.email && <ErrorInputTitle>{errors.email}</ErrorInputTitle>}
          </CenterItems>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleChange}
            name="email"
            onBlur={handleBlur}
            placeholder="e.g . stephen@lorem.com"
            className={`block rounded-md border-[1px] ${
              errors.email ? "border-strawberrRed" : "border-lightGray"
            }`}
            required
          />
        </InputContainer>
        <InputContainer>
          <CenterItems>
            <InputTitle htmlFor="phone">Phone Number</InputTitle>
            {errors.phone && <ErrorInputTitle>{errors.phone}</ErrorInputTitle>}
          </CenterItems>
          <input
            type="text"
            id="phone"
            name="phone"
            value={phone}
            onChange={handleChange}
            onBlur={handleBlur}
            min={9}
            onKeyUp={handleKeyUpPhone}
            placeholder="e.g + 1 234 567 890"
            className={`block rounded-md border-[1px]  ${
              errors.phone ? "border-strawberrRed" : "border-lightGray"
            } `}
            required
          />
        </InputContainer>
      </StepInputContainer>
    </StepContainer>
  );
};

export default Infos;
