import React, { useContext } from "react";
import { StepsContext } from "../Context/StepsContext";

const TestContainer = () => {
  const { checkoutData } = useContext(StepsContext);

  if (checkoutData) {
    console.log(checkoutData.stepsNumber);
  }
  return <div>TestContainer</div>;
};

export default TestContainer;
