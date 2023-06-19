import { useContext } from "react";
import { StepsContext } from "../../Context/StepsContext";

const Infos = () => {
  const { formValues, errors, handleChange } = useContext(StepsContext);

  const { name, email, phone } = formValues;

  return (
    <div className="animate-fade-right animate-delay-200">
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
            placeholder="e.g . Stephen King"
            className="block rounded-md border-[1px] border-lightGray"
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
            // onBlur={validatorHandler}
            placeholder="e.g . stephen@lorem.com"
            className="block rounded-md border-[1px] border-lightGray"
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
            // onBlur={validatorHandler}
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
