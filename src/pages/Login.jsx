import React, { useState } from "react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { Link, useNavigate } from "react-router-dom";
import { useUsersQuery } from "../services/authApi";
import { useDispatch } from "react-redux";
import { setLoggedIn } from "../features/statusSlice";
import { setCurrentUser } from "../features/currentUserSlice";

const Login = () => {
  const { data: users } = useUsersQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const loginHandler = (e) => {
    e.preventDefault();
    const findUser = users.find((u) => u.email === user.email);
    if (findUser && findUser.password === user.password) {
      dispatch(setLoggedIn(true));
      dispatch(setCurrentUser(findUser));
      navigate("/");
    } else {
      alert("This user has not been found or the password is incorrect!");
    }
  };

  return (
    <div className="dark:bg-black w-full min-h-[87.5vh] flex justify-center py-20">
      <form
        onSubmit={loginHandler}
        className="p-5 w-3/4 md:w-[45%] xl:w-[450px] h-[330px] dark:bg-lightBlack rounded-md shadow flex flex-col items-start gap-3"
      >
        <h1 className="text-3xl font-semibold self-center dark:text-purple-600 text-purple-300 mb-3">
          Login
        </h1>
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
          Log in
        </Button>
        <span className="text-sm text-gray-400 self-center font-medium">
          if you don't have an account{" "}
          <Link
            to={"/register"}
            className="text-black dark:text-white underline"
          >
            register
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
