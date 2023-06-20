import { useContext, useEffect } from "react";
import { StepsContext } from "../../Context/StepsContext";

const Summary = () => {
  const { setPages, formValues, setFormValues } = useContext(StepsContext);

  const {
    currentPlanItem: { name, price },
    billingType,
    totalPrice,
    addOnsList: { service, storage, profile },
  } = formValues;

  const handleBtnChange = () => {
    setPages((prev: number) => prev - 2);
  };

  useEffect(() => {
    setFormValues({ ...formValues });
  }, []);

  return (
    <div className="animate-fade-right animate-delay-200 bg-white px-6 py-4 shadow-md md:shadow-none rounded-md md:bg-none ">
      <h1 className="my-2 text-3xl font-bold text-left form-title text-marineBlue">
        Finishing up
      </h1>
      <p className="leading-[1.8] text-[18px] w-10/12 form-desc text-coolGray">
        Double-check everything looks Ok before confirming.
      </p>
      <div className="flex flex-col px-6 py-2 mt-4 rounded-md bg-magnolia">
        <div className="grid items-center justify-between grid-cols-2">
          <div className="py-2">
            <h1 className="font-bold capitalize text-marineBlue">
              {billingType ? name : `${name} (Monthly)`}
            </h1>
            <button
              type="button"
              className="mb-2 underline"
              onClick={handleBtnChange}
            >
              Change
            </button>
          </div>
          <div className="text-right">
            <p className="font-bold text-marineBlue">
              {billingType ? `${price.yearly}/yr` : `${price.monthly}/mo`}
            </p>
          </div>
        </div>
        <hr className="text-lightGray" />
        <div className="mt-2">
          {service && (
            <div className="flex items-center justify-between py-2">
              <p className="text-coolGray">Online service</p>
              <p className="text-sm md:font-medium font-semibold text-marineBlue">
                {billingType ? "+$10/yr" : "+$1/mo"}
              </p>
            </div>
          )}
          {storage && (
            <div className="flex items-center justify-between py-2">
              <p className="text-coolGray">Larger Storage</p>
              <p className="text-sm md:font-medium font-semibold text-marineBlue">
                {" "}
                {billingType ? "+$20/yr" : "+$2/mo"}
              </p>
            </div>
          )}
          {profile && (
            <div className="flex items-center justify-between py-2">
              <p className="text-coolGray">Customizable profile</p>
              <p className="text-sm md:font-medium font-semibold text-marineBlue">
                {" "}
                {billingType ? "+$20/yr" : "+$2/mo"}
              </p>
            </div>
          )}
        </div>
      </div>
      <section className="flex items-center justify-between px-6 mt-2">
        <h1 className="py-2 text-coolGray">
          Total {billingType ? "(per year)" : "(per month)"}{" "}
        </h1>
        <h1 className="text-xl font-semibold text-purplishBlue">
          {billingType ? `$${totalPrice}/year` : `$${totalPrice}/month`}
        </h1>
      </section>
    </div>
  );
};

export default Summary;
