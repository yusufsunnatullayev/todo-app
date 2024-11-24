import React from "react";

const Input = ({
  type,
  name,
  placeholder,
  styles,
  changeHandler,
  defaultValue,
  checked,
}) => {
  return (
    <input
      className={`py-1 px-3 rounded-md text-base font-medium border border-purple-700 outline-none ${styles}`}
      type={type || "text"}
      name={name}
      placeholder={placeholder}
      onChange={changeHandler}
      defaultValue={defaultValue}
      defaultChecked={checked}
      required
    />
  );
};

export default Input;
