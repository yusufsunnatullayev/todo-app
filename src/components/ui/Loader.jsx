import React from "react";
import { ThreeDots } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="w-full h-screen bg-gray-300 bg-opacity-10 fixed top-0 left-0 flex items-center justify-center">
      <ThreeDots
        visible={true}
        height="50"
        width="50"
        color="#A855F7"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loader;
