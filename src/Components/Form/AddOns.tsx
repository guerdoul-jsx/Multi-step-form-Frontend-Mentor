import { useContext, useState, useEffect } from "react";
import { StepsContext } from "../../Context/StepsContext";

type addOnsPacks = {
  id: number;
  key: string;
  name: string;
  description: string;
  price: number;
};

export type addOnsType = {
  service: boolean;
  storage: boolean;
  profile: boolean;
};

const AddOns = () => {
  const { setFormValues, formValues } = useContext(StepsContext);
  const [addOns, setAddOns] = useState<addOnsType>({
    service: false,
    storage: false,
    profile: false,
  });

  const [addOnsPacks, setAddOnsPacks] = useState<addOnsPacks[] | []>([]);

  const { billingType } = formValues;

  const handleCheck = (event: any) => {
    const { name, checked } = event.target;
    setAddOns({ ...addOns, [name]: checked });
  };

  useEffect(() => {
    setFormValues({ ...formValues, addOns: addOns });
  }, [addOns]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/db/addOns.json");
      const data = await response.json();
      setAddOnsPacks(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="my-2 text-3xl font-bold text-left form-title text-marineBlue">
        Pick add-ons
      </h1>
      <p className="leading-[1.8] text-[18px] w-10/12 form-desc text-coolGray">
        Add-ons help enhance your gaming experience
      </p>
      <div className="flex flex-col mt-4 options gap-y-4">
        {addOnsPacks.map((packs) => (
          <div className="w-full select-none option" key={packs.id}>
            <label
              htmlFor={packs.key}
              className={`option-info grid grid-cols-8 place-items-center  rounded-md border-[1px] ${
                addOns[packs.key as keyof typeof addOns]
                  ? "border-purplishBlue bg-magnolia"
                  : "border-lightGray"
              }`}
            >
              <input
                type="checkbox"
                className="col-span-1 add-ons checkbox checkbox-primary"
                id={packs.key}
                name={packs.key}
                onChange={handleCheck}
                checked={addOns[packs.key as keyof typeof addOns]}
              />
              <div className="flex flex-col justify-between w-full col-span-5 py-4">
                <div className="font-bold option-title text-marineBlue">
                  {packs.name}
                </div>
                <div className="add-ons-description text-coolGray">
                  {packs.description}
                </div>
              </div>
              <div className="col-span-2 font-medium text-center add-ons-price text-purplishBlue">
                {billingType
                  ? `+$${packs.price}/mo`
                  : `+$${+packs.price * 10}/yr`}
              </div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddOns;
