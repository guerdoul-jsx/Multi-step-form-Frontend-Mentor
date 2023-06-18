import React, { useContext } from "react";
import { StepsContext } from "../../Context/StepsContext";

const Summary = () => {
  const {
    setPages,
    formValues: {
      plan,
      billingType,
      totalPrice,
      addOns: { profile, service, storage },
    },
  } = useContext(StepsContext);

  const handleBtnChange = (event: any) => {
    setPages((prev) => prev - 2);
  };

  const getTheplan = (planObj: any) => {
    const keyPlan = Object.entries(planObj).map(([key, value]) => {
      if (value === true) {
        return key;
      }
    });
    const planValue = keyPlan.filter((a) => a !== undefined);
    return planValue;
  };

  return (
    <div>
      <h1 className="my-2 text-3xl font-bold text-left form-title text-marineBlue">
        Finishing up
      </h1>
      <p className="leading-[1.8] text-[18px] w-10/12 form-desc text-coolGray">
        Double-check everything looks Ok before confirming.
      </p>
      <div className="flex flex-col px-4 py-2 mt-4 rounded-md bg-magnolia">
        <div className="grid items-center justify-between grid-cols-2">
          <div className="py-2">
            <h1 className="font-bold text-marineBlue">
              {billingType ? `${getTheplan(plan)} (Monthly)` : getTheplan(plan)}
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
            <p className="font-bold text-marineBlue">${totalPrice}/mo</p>
          </div>
        </div>
        <hr className="text-lightGray" />
        <div className="mt-2">
          {service && (
            <div className="flex items-center justify-between py-2">
              <p className="text-coolGray">Online service</p>
              <p className="font-medium text-marineBlue">
                {billingType ? "+$1/mo" : "+$10/yr"}
              </p>
            </div>
          )}
          {storage && (
            <div className="flex items-center justify-between py-2">
              <p className="text-coolGray">Larger Storage</p>
              <p className="font-medium text-marineBlue">
                {" "}
                {billingType ? "+$2/mo" : "+$20/yr"}
              </p>
            </div>
          )}
          {profile && (
            <div className="flex items-center justify-between py-2">
              <p className="text-coolGray">Customizable profile</p>
              <p className="font-medium text-marineBlue">
                {" "}
                {billingType ? "+$2/mo" : "+$20/yr"}
              </p>
            </div>
          )}
        </div>
      </div>
      <section className="flex items-center justify-between px-6 mt-2">
        <h1 className="py-2 text-coolGray">Total (per month)</h1>
        <h1 className="text-xl font-semibold text-purplishBlue">
          +${totalPrice}/mo
        </h1>
      </section>
    </div>
  );
};

export default Summary;
