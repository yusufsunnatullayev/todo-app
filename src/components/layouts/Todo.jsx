import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { FaRegTrashCan } from "react-icons/fa6";
import { setCurrentTodoId, setEditModal } from "../../features/modalSlice";
import { useDispatch } from "react-redux";
import {
  useDeleteTodoMutation,
  useTodoDetailQuery,
  useUpdateTodoMutation,
} from "../../services/todoApi";

const Todo = ({ todo }) => {
  const dispatch = useDispatch();
  const [deleteTodo] = useDeleteTodoMutation(todo.id);
  const [updateTodo] = useUpdateTodoMutation();
  const [completed, setCompleted] = useState(todo.completed);
  const currentTodo = useTodoDetailQuery(todo.id);

  const handleChange = async (e) => {
    setCompleted((prev) => !prev);
    const updatedTodo = {
      title: currentTodo.title,
      date: currentTodo.date,
      time: currentTodo.time,
      userId: currentTodo.userId,
      completed: !completed,
      id: todo.id,
    };
    await updateTodo({ id: todo.id, ...updatedTodo });
  };

  return (
    <div
      className={`flex items-center justify-between p-3 dark:bg-purple-950 dark:text-purple-300 ${
        completed && "line-through opacity-50"
      } bg-purple-100 font-semibold text-purple-700 rounded-md shadow w-full`}
      key={todo.id}
    >
      <div className="flex items-center justify-center gap-3">
        <input
          type="checkbox"
          checked={completed}
          className="cursor-pointer"
          onChange={(e) => handleChange(e)}
        />
        <h1 className="text-sm font-medium md:font-semibold ">{todo.title}</h1>
      </div>
      <div className="flex items-center justify-center gap-5">
        <span className="text-sm font-medium md:font-semibold">
          {todo.time}
        </span>
        <div className="flex items-center justify-center gap-3">
          <CiEdit
            onClick={() => {
              dispatch(setEditModal(true));
              dispatch(setCurrentTodoId(todo.id));
            }}
            className="cursor-pointer"
          />
          <FaRegTrashCan
            onClick={() => deleteTodo(todo.id)}
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default Todo;
