import { useContext, FocusEvent, KeyboardEvent } from "react";
import { StepsContext } from "../../Context/StepsContext";
import { InfosProps } from "../../utils/types";

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
    <div className="px-6 py-4 bg-white rounded-md shadow-md animate-fade-right md:shadow-none md:bg-none animate-delay-200">
      <h1 className="my-2 text-3xl font-bold text-left form-title text-marineBlue">
        Personal Info
      </h1>
      <p className="leading-[1.8] md:text-[18px] w-10/12 form-desc text-coolGray">
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
              <div className="animate-fade-left text-[10px] font-semibold italic text-strawberrRed errorMsg">
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
            onBlur={handleBlur}
            placeholder="e.g . Stephen King"
            className={`block rounded-md border-[1px] ${
              errors.name ? "border-strawberrRed" : "border-lightGray"
            } `}
            required
          />
        </div>
        <div className="flex flex-col my-2 mt-3 space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="email"
              className="text-marineBlue font-medium text-[15px]"
            >
              Email Address
            </label>
            {errors.email && (
              <div className="animate-fade-left text-[10px] font-semibold italic text-strawberrRed errorMsg">
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
            onBlur={handleBlur}
            placeholder="e.g . stephen@lorem.com"
            className={`block rounded-md border-[1px] ${
              errors.email ? "border-strawberrRed" : "border-lightGray"
            }`}
            required
          />
        </div>
        <div className="flex flex-col my-2 mt-3 space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="phone"
              className="text-marineBlue font-medium text-[15px]"
            >
              Phone Number
            </label>
            {errors.phone && (
              <div className="animate-fade-left text-[10px] font-semibold italic text-strawberrRed errorMsg">
                {errors.phone}
              </div>
            )}
          </div>
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
        </div>
      </div>
    </div>
  );
};

export default Infos;
