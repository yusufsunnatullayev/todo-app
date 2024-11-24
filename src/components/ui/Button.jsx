import React from "react";

const Button = ({ children, type, clickHandler, styles }) => {
  return (
    <button
      className={`py-1 px-3 text-base rounded-md hover:opacity-80 duration-150 font-semibold ${styles}`}
      onClick={clickHandler}
      type={type || "submit"}
    >
      {children}
    </button>
  );
};

export default Button;
