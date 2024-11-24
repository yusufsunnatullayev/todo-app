import React, { useState } from "react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { Link, useNavigate } from "react-router-dom";
import { useAddUserMutation, useUsersQuery } from "../services/authApi";

const Register = () => {
  const { data: users } = useUsersQuery();
  const [addUser] = useAddUserMutation();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const registerHandler = async (e) => {
    e.preventDefault();
    if (
      users.some((u) => u.username === user.username || u.email === user.email)
    ) {
      alert("This username or email has already been taken!");
      return;
    }
    await addUser(user);
    navigate("/login");
    e.target.reset();
  };

  return (
    <div className="w-full dark:bg-black h-[87.5vh] flex justify-center py-20">
      <form
        onSubmit={registerHandler}
        className="p-5 w-3/4 md:w-[45%] xl:w-[450px] h-[400px] rounded-md shadow dark:bg-lightBlack flex flex-col items-start gap-3"
      >
        <h1 className="text-3xl font-semibold self-center dark:text-purple-600 text-purple-300 mb-3">
          Register
        </h1>
        <div className="flex flex-col gap-1 items-start w-full">
          <label className="dark:text-white text-sm font-semibold" htmlFor="">
            Username
          </label>
          <Input
            changeHandler={handleChange}
            name={"username"}
            styles={"w-full"}
          />
        </div>
        <div className="flex flex-col gap-1 items-start w-full">
          <label className="dark:text-white text-sm font-semibold" htmlFor="">
            Email
          </label>
          <Input
            changeHandler={handleChange}
            name={"email"}
            styles={"w-full"}
          />
        </div>
        <div className="flex flex-col gap-1 items-start w-full">
          <label className="dark:text-white text-sm font-semibold" htmlFor="">
            Password
          </label>
          <Input
            changeHandler={handleChange}
            name={"password"}
            styles={"w-full"}
            type={"password"}
          />
        </div>
        <Button styles={"bg-purple-700 w-full text-white mt-2 py-[6px]"}>
          Register
        </Button>
        <span className="text-sm text-gray-400 self-center font-medium">
          if you have an account{" "}
          <Link to={"/login"} className="text-black dark:text-white underline">
            log in
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
