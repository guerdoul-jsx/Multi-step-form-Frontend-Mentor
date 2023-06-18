import { useState, useContext, ChangeEvent } from "react";
import { StepsContext } from "../../Context/StepsContext";
import { errorType } from "../../Context/StepsContext";

export const formValidator = (
  name: string,
  email: string,
  phoneNumber: string
) => {
  const errors = {} as errorType;
  if (!name.trim()) {
    errors.name = "Name is required";
  }

  if (!email.trim()) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "Invalid email address";
  }

  if (!phoneNumber.trim()) {
    errors.phoneNumber = "Phone Number is required";
  }

  return errors;
};

const Infos = () => {
  const { formValues, setFormValues, errors, setErrors } =
    useContext(StepsContext);

  const { name, email, phoneNumber } = formValues;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const validatorsErrors = formValidator(name, email, phoneNumber);

  const validatorHandler = () => {
    setErrors(validatorsErrors);
  };

  return (
    <div>
      <h1 className="my-2 text-3xl font-bold text-left form-title text-marineBlue">
        Personal Info
      </h1>
      <p className="leading-[1.8] text-[18px] w-10/12 form-desc text-coolGray">
        Please provide your name, email address, and phone number.
      </p>
      <div className="flex flex-col">
        <div className="flex flex-col my-2 mt-3 space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="name"
              className="text-marineBlue font-medium text-[15px]"
            >
              Name
            </label>
            {errors.name && (
              <div className="text-[12px] text-strawberrRed font-medium errorMsg">
                {errors.name}
              </div>
            )}
          </div>
          <input
            type="text"
            id="name"
            onChange={handleChange}
            value={name}
            name="name"
            onBlur={validatorHandler}
            placeholder="e.g . Stephen King"
            className="block rounded-md border-[1px] border-lightGray"
            required
          />
        </div>
        <div className="flex flex-col my-2 mt-3 space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="name"
              className="text-marineBlue font-medium text-[15px]"
            >
              Email Address
            </label>
            {errors.email && (
              <div className="text-[12px] text-strawberrRed font-medium errorMsg">
                {errors.email}
              </div>
            )}
          </div>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleChange}
            name="email"
            onBlur={validatorHandler}
            placeholder="e.g . stephen@lorem.com"
            className="block rounded-md border-[1px] border-lightGray"
            required
          />
        </div>
        <div className="flex flex-col my-2 mt-3 space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="name"
              className="text-marineBlue font-medium text-[15px]"
            >
              Phone Number
            </label>
            {errors.phoneNumber && (
              <div className="text-[12px] text-strawberrRed font-medium errorMsg">
                {errors.phoneNumber}
              </div>
            )}
          </div>
          <input
            type="text"
            id="phone"
            name="phoneNumber"
            value={phoneNumber}
            onChange={handleChange}
            onBlur={validatorHandler}
            min={9}
            placeholder="e.g + 1 234 567 890"
            className="block rounded-md border-[1px] border-lightGray"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default Infos;
