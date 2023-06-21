import { useContext, useEffect, useState, ChangeEvent } from "react";
import { StepsContext } from "../../Context/StepsContext";
import { AddOnsProps, addOns } from "../../utils/types";

const AddOns = () => {
  const { setFormValues, formValues, checkoutData }: AddOnsProps =
    useContext(StepsContext);
  const { Addons } = checkoutData;

  const { billingType, addOnsList, totalPrice } = formValues;

  const { service, storage, profile } = addOnsList;

  const [serviceCounter, setServiceCounter] = useState(0);
  const [storageCounter, setStorageCounter] = useState(0);
  const [profileCounter, setProfileCounter] = useState(0);

  const handleCheck = (event: ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      addOnsList: {
        ...addOnsList,
        [event.target.name]: event.target.checked,
      },
    });
    setServiceCounter((prev) => prev + 1);
    setStorageCounter((prev) => prev + 1);
    setProfileCounter((prev) => prev + 1);
  };

  // ?! UPDATE THE PRICING VALUE BY SERVICE
  useEffect(() => {
    if (serviceCounter > 0) {
      if (service === false) {
        setFormValues({
          ...formValues,
          totalPrice: billingType === true ? totalPrice - 10 : totalPrice - 1,
        });
      }
      if (service === true) {
        setFormValues({
          ...formValues,
          totalPrice: billingType === true ? totalPrice + 10 : totalPrice + 1,
        });
      }
    }
  }, [service]);

  // ?! UPDATE THE PRICING VALUE BY STORAGE
  useEffect(() => {
    if (storageCounter > 0) {
      if (storage === false) {
        setFormValues({
          ...formValues,
          totalPrice: billingType === true ? totalPrice - 20 : totalPrice - 2,
        });
      }
      if (storage === true) {
        setFormValues({
          ...formValues,
          totalPrice: billingType === true ? totalPrice + 20 : totalPrice + 2,
        });
      }
    }
  }, [storage]);

  // ?! UPDATE THE PRICING VALUE BY PROFILE
  useEffect(() => {
    if (profileCounter > 0) {
      if (profile === false) {
        setFormValues({
          ...formValues,
          totalPrice: billingType === true ? totalPrice - 20 : totalPrice - 2,
        });
      }
      if (profile === true) {
        setFormValues({
          ...formValues,
          totalPrice: billingType === true ? totalPrice + 20 : totalPrice + 2,
        });
      }
    }
  }, [profile]);

  return (
    <div className="px-6 py-4 bg-white rounded-md shadow-md animate-fade-right animate-delay-200 md:shadow-none md:bg-none ">
      <h1 className="my-2 text-3xl font-bold text-left form-title text-marineBlue">
        Pick add-ons
      </h1>
      <p className="leading-[1.8] text-[18px] w-10/12 form-desc text-coolGray">
        Add-ons help enhance your gaming experience
      </p>
      <div className="flex flex-col mt-4 options gap-y-4">
        {Addons.map((packs) => (
          <div className="w-full select-none option" key={packs.id}>
            <label
              htmlFor={packs.key}
              className={`option-info grid grid-cols-8 gap-x-2 px-2 place-items-center  rounded-md border-[1px] cursor-pointer
                ${
                  addOnsList[packs.key as keyof addOns]
                    ? "border-purplishBlue bg-magnolia"
                    : "border-lightGray"
                }
              `}
            >
              <input
                type="checkbox"
                className="col-span-1 add-ons checkbox checkbox-primary"
                id={packs.key}
                name={packs.key}
                onChange={handleCheck}
                checked={addOnsList[packs.key as keyof addOns]}
              />
              <div className="flex flex-col justify-between w-full col-span-5 py-2 md:py-4">
                <div className="font-bold option-title text-marineBlue">
                  {packs.name}
                </div>
                <div className="add-ons-description text-[12px] text-coolGray">
                  {packs.description}
                </div>
              </div>
              <div className="col-span-1 ml-8 text-sm font-medium text-center add-ons-price text-purplishBlue">
                {billingType
                  ? `+$${+packs.price * 10}/yr`
                  : `+$${packs.price}/mo`}
              </div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddOns;
