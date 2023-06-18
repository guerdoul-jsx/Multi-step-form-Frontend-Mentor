import { useState, useEffect } from "react";
import { Switch } from "@headlessui/react";
import { useContext } from "react";
import { StepsContext } from "../../Context/StepsContext";

type PlanListType = {
  id: number;
  name: string;
  icon: string;
  price: {
    monthly: number;
    yearly: number;
  };
};

const Plans = () => {
  const { setFormValues, formValues, enabled, setEnabled } =
    useContext(StepsContext);

  const [planList, setPlanList] = useState<PlanListType[] | []>([]);

  const { plan, billingType } = formValues;

  useEffect(() => {
    const fetchData = async () => {
      const respose = await fetch("/db/plan.json");
      const jsonData = await respose.json();
      setPlanList(jsonData);
    };

    fetchData();
  }, []);

  const handleChange = (event: any) => {
    console.log("value: ", event.target.value);
    console.log("id: ", event.target.id);
    console.log("checked: ", event.target.checked);
    const { checked } = event.target;
    setFormValues({
      ...formValues,
      plan: {
        ...plan,
        [event.target.id]: checked,
      },
    });
  };

  useEffect(() => {}, []);

  const handleCheck = () => {
    setEnabled(!enabled);
    setFormValues({ ...formValues, billingType: !enabled });
  };

  return (
    <div>
      <h1 className="my-2 text-3xl font-bold text-left form-title text-marineBlue">
        Select your plan
      </h1>
      <p className="leading-[1.8] text-[18px] w-10/12 form-desc text-coolGray">
        You have the option of montly or yearly billing.
      </p>
      <div className="flex options gap-x-4">
        {planList.map(({ name, icon, price }, index) => (
          <div className="relative option h-[200px] basis-1/3" key={index}>
            <input
              type="radio"
              name="plan"
              id={name}
              onChange={handleChange}
              value={billingType ? price.yearly : price.monthly}
              className="absolute hidden w-full input-radio"
              checked={plan[name as keyof typeof plan]}
            />
            <label
              htmlFor={name}
              className="option-info cursor-pointer h-full flex flex-col items-start justify-around px-4 py-2 mt-3 rounded-md border-[1px] border-lightGray"
            >
              <img src={icon} alt={name} />
              <div className="mt-[30px] w-fullr">
                <div className="font-bold uppercase option-title text-marineBlue">
                  {name}
                </div>
                <div className="option-price text-coolGray">
                  ${price.monthly}/mo
                </div>
                {enabled && (
                  <div className="text-sm font-semibold option-price text-marineBlue">
                    2 months free
                  </div>
                )}
              </div>
            </label>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center py-2 mt-16 space-x-3 rounded-md billing-type bg-magnolia ">
        <h1
          className={`${
            enabled ? "text-coolGray" : "billing-type-active"
          } font-semibold my-2 text-right form-title`}
        >
          Montly
        </h1>
        <Switch
          checked={enabled}
          onChange={handleCheck}
          className={`${enabled ? "bg-lightGray" : "bg-marineBlue"}
          relative inline-flex ${
            enabled ? "border-lightGray" : "border-marineBlue"
          } h-[30px] w-[65px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
          <span
            aria-hidden="true"
            className={`${enabled ? "translate-x-9" : "translate-x-0"}
            pointer-events-none inline-block h-[26px] w-[25px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
          />
        </Switch>
        <h1
          className={`${
            enabled ? "billing-type-active" : "text-coolGray"
          } font-semibold my-2 text-left form-title`}
        >
          Yearly
        </h1>
      </div>
    </div>
  );
};

export default Plans;
