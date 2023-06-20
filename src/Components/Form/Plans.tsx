import { useEffect } from "react";
import { Switch } from "@headlessui/react";
import { useContext } from "react";
import { StepsContext } from "../../Context/StepsContext";

const Plans = () => {
  const {
    checkoutData: { plans },
    setFormValues,
    formValues,
    handleChange,
  } = useContext(StepsContext);

  const { billingType, selectedPlanId, addOnsList, totalPrice } = formValues;

  // TODO: FUNCTION TO GET THE CURRENT PLAN NEED TO BE SEPARATED
  const getCurrentPlan = (selectedPlanId: number) => {
    const currentPlan = plans.find((plan: any) => plan.id === selectedPlanId);
    return currentPlan;
  };

  const currentPlan = getCurrentPlan(selectedPlanId + 1);

  useEffect(() => {
    // ?! added the current plan to the state and tis need to be separated
    setFormValues({
      ...formValues,
      currentPlanItem: currentPlan,
    });
  }, []);

  useEffect(() => {
    setFormValues({
      ...formValues,
      currentPlanItem: currentPlan,
      totalPrice: billingType
        ? currentPlan.price.yearly
        : currentPlan.price.monthly,
    });
  }, [selectedPlanId, billingType]);

  const handleCheck = (event: boolean) => {
    setFormValues({ ...formValues, billingType: event });
  };

  return (
    <div className="animate-fade-right bg-white px-6 py-4 shadow-md md:shadow-none rounded-md md:bg-none  animate-delay-200">
      <h1 className="my-2 text-3xl font-bold text-left form-title text-marineBlue">
        Select your plan
      </h1>
      <p className="leading-[1.8] md:text-[18px] w-10/12 form-desc text-coolGray">
        You have the option of montly or yearly billing.
      </p>
      <div className="flex flex-col md:flex-row options gap-x-4">
        {plans.map(({ name, icon, price }: any, index: number) => (
          <div
            className="relative option h-[170px] basis-1/3 gap-x-2"
            key={index}
          >
            <input
              type="radio"
              name="plan"
              id={name}
              onChange={handleChange}
              checked={selectedPlanId == index}
              value={index}
              className="absolute hidden w-full input-radio"
            />
            <label
              htmlFor={name}
              className="option-info cursor-pointer h-full flex flex-row items-center md:flex-col md:items-start md:justify-around px-4 py-2 mt-3 rounded-md border-[1px] border-lightGray"
            >
              <img src={icon} alt={name} className="mr-3 md:mr-0" />
              <div className="mt[15px] md:mt-[30px] w-fullr">
                <div className="font-bold uppercase option-title text-marineBlue">
                  {name}
                </div>
                <div className="option-price text-coolGray">
                  ${price.monthly}/mo
                </div>
                {billingType && (
                  <div className="text-sm font-semibold option-price text-marineBlue">
                    2 months free
                  </div>
                )}
              </div>
            </label>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center py-2 mt-8 md:mt-16 space-x-3 rounded-md billing-type bg-magnolia ">
        <h1
          className={`${
            billingType ? "text-coolGray" : "billing-type-active"
          } font-semibold my-2 text-right form-title`}
        >
          Montly
        </h1>
        <Switch
          checked={billingType}
          onChange={handleCheck}
          className={`${billingType ? "bg-lightGray" : "bg-marineBlue"}
          relative inline-flex ${
            billingType ? "border-lightGray" : "border-marineBlue"
          } h-[30px] w-[65px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
          <span
            aria-hidden="true"
            className={`${billingType ? "translate-x-9" : "translate-x-0"}
            pointer-events-none inline-block h-[26px] w-[25px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
          />
        </Switch>
        <h1
          className={`${
            billingType ? "billing-type-active" : "text-coolGray"
          } font-semibold my-2 text-left form-title`}
        >
          Yearly
        </h1>
      </div>
    </div>
  );
};

export default Plans;
