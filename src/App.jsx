import React, { useEffect, useState } from "react";
import Navbar from "./components/layouts/Navbar";
import { Route, Routes } from "react-router-dom";
import { routes } from "./routes/routes";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoutes from "./routes/protectedRoutes";
import { useSelector } from "react-redux";

function App() {
  const currentUser = useSelector((state) => state.currentUser.currentUser);
  const loggedIn = useSelector((state) => state.status.loggedIn);
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
  );

  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem("loggedIn", JSON.stringify(loggedIn));
  }, [loggedIn]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Routes>
        <Route element={<ProtectedRoutes />}>
          {routes.map((route) => (
            <Route
              key={route.id}
              path={route.path}
              element={<route.element />}
            />
          ))}
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
