import React from "react";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import { useForm, SubmitHandler } from "react-hook-form";
import FormTest from "./FormTest";

export interface Formprops {
  fullName: string;
  email: string;
  phone: string;
}

const TestContainer = () => {
  const formShecma = yup.object().shape({
    fullName: yup
      .string()
      .required("Full name is required")
      .min(3, "Full name must be at least 3 characters"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phone: yup
      .string()
      .matches(/\d{1,14}$/, "Invalid phone number")
      .required("Phone number is required")
      .min(10, "Phone number must be at least 10 characters"),
  });
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<Formprops>({
    resolver: yupResolver(formShecma),
  });

  const onSubmit: SubmitHandler<Formprops> = (data) => {
    console.log(data);
  };

  // console.log({ ...register("phone") });

  return (
    <div className="h-screen">
      <FormTest errors={errors} register={register} />
      <input
        type="submit"
        value="Send"
        className="btn btn-primary"
        onClick={handleSubmit(onSubmit)}
      />
    </div>
  );
};

export default TestContainer;
