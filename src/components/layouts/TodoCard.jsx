import React, { useState, useEffect } from "react";
import Todo from "./Todo";

const TodoCard = ({ date, day, todos }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="shadow rounded-[15px] mb-2 dark:shadow-purple-800">
      <button
        className="flex justify-between items-center w-full p-6 rounded-[15px]"
        onClick={toggleAccordion}
      >
        <div className="flex items-center justify-center gap-5">
          <span className="text-lg md:text-xl font-medium md:font-semibold dark:text-purple-500 text-purple-700">
            {date}
          </span>
          <span className="text-sm md:text-base font-normal md:font-medium dark:text-purple-500 text-purple-700">
            {day}
          </span>
        </div>
        <svg
          className={`w-5 h-5 transform text-purple-500 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="p-4 flex flex-col items-start gap-2 text-gray-700 w-full">
          {todos.map((todo) => (
            <Todo key={todo.id} todo={todo} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoCard;
