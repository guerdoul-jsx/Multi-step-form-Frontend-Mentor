import { ChangeEvent } from "react";

const handleKeyUpPhone = (event: ChangeEvent<HTMLInputElement>) => {
  let inputValue = event.target.value;
  const onlyNumber = inputValue.replace(/\D/g, "");
  event.target.value = onlyNumber;
};
