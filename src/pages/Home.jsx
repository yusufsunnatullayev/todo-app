import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CreateTodoModal from "../components/layouts/AddTodoModal";
import TodoCard from "../components/layouts/TodoCard";
import emptyImage from "../assets/images/empty.png";
import { useTodosQuery } from "../services/todoApi";
import EditModal from "../components/layouts/EditModal";
import Loader from "../components/ui/Loader";

function Home() {
  const currentUser = useSelector((state) => state.currentUser.currentUser);
  const modal = useSelector((state) => state.modal.modal);
  const editModal = useSelector((state) => state.modal.editModal);
  const [sortedTodos, setSortedTodos] = useState([]);
  const {
    data: allTodos,
    isSuccess,
    isError,
    isLoading,
    error,
  } = useTodosQuery();

  useEffect(() => {
    if (allTodos && currentUser) {
      const filteredTodos = allTodos.filter(
        (todo) => todo.userId === currentUser.id
      );
      const uniqueDates = [...new Set(filteredTodos.map((todo) => todo.date))];
      const sorted = uniqueDates.map((date) => {
        const dateObj = new Date(date);
        const day = dateObj.toLocaleString("en-US", { weekday: "long" });
        return {
          date,
          day,
          todos: filteredTodos.filter((todo) => todo.date === date),
        };
      });
      setSortedTodos(sorted);
    } else {
      setSortedTodos([]);
    }
  }, [allTodos, currentUser]);

  return (
    <div className="dark:bg-black min-h-[87.5vh] flex flex-col py-10 px-5 md:px-10 md:py-20">
      {isLoading && <Loader />}
      {isError && (
        <h1 className="dark:text-white">
          Something went wrong! {error?.message}
        </h1>
      )}
      {isSuccess && (
        <>
          {sortedTodos.length > 0 ? (
            <div className="w-full flex flex-col gap-5">
              {sortedTodos.map((group, index) => (
                <TodoCard key={index} {...group} />
              ))}
            </div>
          ) : (
            <div className="w-full h-full flex flex-col gap-5 items-center">
              <h1 className="text-[64px] font-bold dark:text-purple-500 text-purple-100">
                empty todos
              </h1>
              <img
                className="w-[600px] h-[450px]"
                src={emptyImage}
                alt="No todos available"
              />
            </div>
          )}
          {modal && <CreateTodoModal />}
          {editModal && <EditModal />}
        </>
      )}
    </div>
  );
}

export default Home;
