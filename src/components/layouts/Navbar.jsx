import React from "react";
import { FcTodoList } from "react-icons/fc";
import { IoIosMoon } from "react-icons/io";
import { IoSunny } from "react-icons/io5";
import Button from "../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../features/modalSlice";
import { Link } from "react-router-dom";
import { setLoggedIn } from "../../features/statusSlice";

function Navbar({ darkMode, setDarkMode }) {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.status.loggedIn);
  const currentUser = useSelector((state) => state.currentUser.currentUser);

  const deleteUserHandler = async () => {
    dispatch(setLoggedIn(false));
  };

  return (
    <div className="dark:bg-black w-full py-3 px-5 md:py-5 md:px-10 flex flex-col items-start gap-4 md:flex-row md:items-center justify-between">
      <div className="w-full md:w-auto flex items-center justify-between">
        <Link
          to="/"
          className="cursor-pointer flex items-center justify-center gap-2"
        >
          <FcTodoList className="text-5xl" />
          <h1 className="font-bold text-4xl md:text-5xl dark:text-purple-500 text-purple-800">
            todo
          </h1>
        </Link>
        <div className="flex items-center gap-3 md:hidden">
          <button
            className="text-2xl dark:text-purple-500 text-purple-700 font-semibold"
            onClick={() => setDarkMode((prev) => !prev)}
          >
            {darkMode ? <IoSunny /> : <IoIosMoon />}
          </button>
          {loggedIn && (
            <h1 className="font-semibold text-sm md:text-base dark:text-purple-500 text-purple-800">
              {currentUser?.username}
            </h1>
          )}
        </div>
      </div>

      <div className="flex items-center w-full md:w-auto justify-between md:justify-center gap-5">
        <button
          className="hidden md:flex text-2xl dark:text-purple-500 text-purple-700 font-semibold"
          onClick={() => setDarkMode((prev) => !prev)}
        >
          {darkMode ? <IoSunny /> : <IoIosMoon />}
        </button>
        {loggedIn && (
          <h1 className="hidden md:flex font-semibold dark:text-purple-500 text-purple-800">
            {currentUser?.username}
          </h1>
        )}
        {loggedIn && (
          <Button
            clickHandler={() => dispatch(setModal(true))}
            styles="bg-purple-700 text-white !text-sm md:text-base"
          >
            +add todo
          </Button>
        )}
        {loggedIn && (
          <Button
            styles="bg-red-600 text-white"
            clickHandler={deleteUserHandler}
          >
            Log out
          </Button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
