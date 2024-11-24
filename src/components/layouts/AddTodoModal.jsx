import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { setModal } from "../../features/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { nanoid } from "@reduxjs/toolkit";
import { useAddTodoMutation } from "../../services/todoApi";

const AddTodoModal = () => {
  const currentUser = useSelector((state) => state.currentUser.currentUser);
  const [addTodo] = useAddTodoMutation();
  const dispatch = useDispatch();
  const [todo, setTodo] = useState({
    title: "",
    date: "",
    time: "",
    completed: false,
    userId: "",
    id: nanoid(),
  });

  console.log(currentUser);

  const handleChange = (e) => {
    setTodo({
      ...todo,
      [e.target.name]: e.target.value,
    });
  };

  const addTodoHandler = async (e) => {
    e.preventDefault();
    await addTodo({ ...todo, userId: currentUser.id });
    dispatch(setModal(false));
    e.target.reset();
  };

  return (
    <div className="w-full h-full fixed top-0 left-0 bg-gray-500 dark:bg-opacity-10 bg-opacity-30 flex justify-center items-center">
      <form
        onSubmit={addTodoHandler}
        className="relative p-5 rounded-md flex flex-col gap-10 items-start  w-3/4 md:w-[45%] xl:w-[450px] dark:bg-lightBlack bg-white"
      >
        <IoClose
          onClick={() => dispatch(setModal(false))}
          className="absolute dark:text-purple-500 top-5 right-5 text-lg cursor-pointer"
        />
        <h1 className="text-3xl font-semibold self-center dark:text-purple-700 text-purple-300">
          add todo
        </h1>
        <div className="flex flex-col gap-5 items-start w-full">
          <div className="flex flex-col gap-1 w-full items-start">
            <label className="dark:text-white text-sm font-semibold" htmlFor="">
              Title
            </label>
            <Input
              changeHandler={handleChange}
              styles={"w-full bg-transparent dark:text-white"}
              type={"text"}
              name={"title"}
            />
          </div>
          <div className="flex flex-col gap-1 w-full items-start">
            <label className="dark:text-white text-sm font-semibold" htmlFor="">
              Date
            </label>
            <Input
              changeHandler={handleChange}
              styles={"w-full bg-transparent dark:text-white"}
              type={"date"}
              name={"date"}
            />
          </div>
          <div className="flex flex-col gap-1 w-full items-start">
            <label className="dark:text-white text-sm font-semibold" htmlFor="">
              Time
            </label>
            <Input
              changeHandler={handleChange}
              styles={"w-full dark:bg-transparent dark:text-white"}
              type={"time"}
              name={"time"}
            />
          </div>
          <div className="flex items-center justify-center gap-2 w-full">
            <Button
              styles={"bg-red-600 text-white  w-full mt-2 py-[6px]"}
              clickHandler={() => dispatch(setModal(false))}
            >
              Cancel
            </Button>

            <Button
              styles={"bg-purple-700 w-full text-white mt-2 py-[6px]"}
              type="submit"
            >
              +Add
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddTodoModal;
