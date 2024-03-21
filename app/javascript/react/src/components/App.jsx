import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { createRoot } from "react-dom/client";
import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";
import Note from "./Note";
import axios from "axios";

const App = () => {
  const [user, setUser] = useState("");

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("user"));

    if (userDetails) {
      setUser(userDetails.email);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <SignUp />}
        />
        <Route path="/note/:id" element={<Note />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
const root = createRoot(document.getElementById("home"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
