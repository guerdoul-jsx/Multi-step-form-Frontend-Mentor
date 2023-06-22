import { personalForm } from "../../../utils/types";

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

import { UseFormRegister, FieldErrors } from "react-hook-form";

interface InfosFormProps {
  register: UseFormRegister<personalForm>;
  errors: FieldErrors<personalForm>;
}

const Infos = ({ register, errors }: InfosFormProps) => {
  return (
    <>
      <StepContainer>
        <StepTitle>Personal Info</StepTitle>
        <StepDescription>
          Please provide your name, email address, and phone number.
        </StepDescription>
        <StepInputContainer>
          <InputContainer>
            <CenterItems>
              <InputTitle htmlFor="name">Name</InputTitle>
              {errors.name && (
                <ErrorInputTitle>{errors.name.message}</ErrorInputTitle>
              )}
            </CenterItems>
            <input
              type="text"
              {...register("name")}
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
              {errors.email && (
                <ErrorInputTitle>{errors.email.message}</ErrorInputTitle>
              )}
            </CenterItems>
            <input
              type="email"
              {...register("email")}
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
              {errors.phone && (
                <ErrorInputTitle>{errors.phone.message}</ErrorInputTitle>
              )}
            </CenterItems>
            <input
              type="text"
              {...register("phone")}
              placeholder="e.g + 1 234 567 890"
              className={`block rounded-md border-[1px]  ${
                errors.phone ? "border-strawberrRed" : "border-lightGray"
              } `}
              required
            />
          </InputContainer>
        </StepInputContainer>
      </StepContainer>
    </>
  );
};

export default Infos;
