import React from "react";
import {
  UseFormRegister,
  FieldErrors,
  UseFormHandleSubmit,
  SubmitHandler,
} from "react-hook-form";
import { Formprops } from "./TestContainer";

interface FormTestProps {
  register: UseFormRegister<Formprops>;
  errors: FieldErrors<Formprops>;
}

const FormTest = ({ register, errors }: FormTestProps) => {
  return (
    <form className="h-full flex flex-col w-[300px] m-auto justify-center space-y-4">
      <h2 className="text-3xl font-bold text-marineBlue">Personal Info </h2>
      <div>
        <div className="flex items-center justify-between font-bold">
          <label htmlFor="fullName">Full Name: </label>
          {errors.fullName && (
            <span className="text-strawberrRed text-[10px]">
              {errors.fullName.message}
            </span>
          )}
        </div>
        <input type="text" className="w-full" {...register("fullName")} />
      </div>
      <div>
        <div className="flex items-center justify-between font-bold">
          <label htmlFor="email">Email Address: </label>
          {errors.email && (
            <span className="text-strawberrRed text-[10px]">
              {errors.email.message}
            </span>
          )}
        </div>
        <input type="text" className="w-full" {...register("email")} />
      </div>
      <div>
        <div className="flex items-center justify-between font-bold">
          <label htmlFor="phone">Phone Number: </label>
          {errors.phone && (
            <span className="text-strawberrRed text-[10px]">
              {errors.phone.message}
            </span>
          )}
        </div>
        <input type="text" className="w-full" {...register("phone")} />
      </div>
    </form>
  );
};

export default FormTest;
