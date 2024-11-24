import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { setEditModal } from "../../features/modalSlice";
import {
  useTodoDetailQuery,
  useUpdateTodoMutation,
} from "../../services/todoApi";
import Loader from "../ui/Loader";

const EditModal = () => {
  const id = useSelector((state) => state.modal.currentTodoId);
  const {
    data: currentTodo,
    isError,
    isSuccess,
    isLoading,
  } = useTodoDetailQuery(id);
  const dispatch = useDispatch();
  const [updateTodo] = useUpdateTodoMutation();
  const [editted, setEditted] = useState({
    title: "",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    setEditted({
      id: id,
      completed: currentTodo.completed,
      userId: currentTodo.userId,
      [e.target.name]: e.target.value,
    });
  };

  const editHandler = async (e) => {
    e.preventDefault();
    await updateTodo({ id, ...editted });
    dispatch(setEditModal(false));
  };

  return (
    <div className="w-full h-full fixed top-0 left-0 bg-gray-500 dark:bg-opacity-10 bg-opacity-30 flex justify-center items-center">
      {isError && <h1>Somwthing went wrong!</h1>}
      {isLoading && <Loader />}
      {isSuccess && (
        <form
          onSubmit={editHandler}
          className="relative p-5 rounded-md flex flex-col gap-10 items-start dark:bg-lightBlack w-3/4 md:w-[45%] xl:w-[450px] bg-white"
        >
          <IoClose
            onClick={() => dispatch(setEditModal(false))}
            className="absolute dark:text-purple-500 top-5 right-5 text-lg cursor-pointer"
          />
          <h1 className="text-3xl font-semibold self-center dark:text-purple-600 text-purple-300">
            edit todo
          </h1>
          <div className="flex flex-col gap-5 items-start w-full">
            <div className="flex flex-col gap-1 w-full items-start">
              <label
                className="dark:text-white text-sm font-semibold"
                htmlFor=""
              >
                Title
              </label>
              <Input
                defaultValue={currentTodo?.title}
                changeHandler={handleChange}
                styles={"w-full dark:bg-transparent dark:text-white"}
                type={"text"}
                name={"title"}
              />
            </div>
            <div className="flex flex-col gap-1 w-full items-start">
              <label
                className="dark:text-white text-sm font-semibold"
                htmlFor=""
              >
                Date
              </label>
              <Input
                defaultValue={currentTodo?.date}
                changeHandler={handleChange}
                styles={"w-full dark:bg-transparent dark:text-white"}
                type={"date"}
                name={"date"}
              />
            </div>
            <div className="flex flex-col gap-1 w-full items-start">
              <label
                className="dark:text-white text-sm font-semibold"
                htmlFor=""
              >
                Time
              </label>
              <Input
                defaultValue={currentTodo?.time}
                changeHandler={handleChange}
                styles={"w-full dark:bg-transparent dark:text-white"}
                type={"time"}
                name={"time"}
              />
            </div>
            <div className="flex items-center justify-center gap-2 w-full">
              <Button
                styles={"bg-red-600 text-white w-full mt-2 py-[6px]"}
                clickHandler={() => dispatch(setEditModal(false))}
              >
                Cancel
              </Button>

              <Button
                styles={"bg-purple-700 w-full text-white mt-2 py-[6px]"}
                type="submit"
              >
                Edit
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditModal;
