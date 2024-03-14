import React from "react";
import AllNotes from "./AllNotes";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Note from "./Note";

const Home = () => {
  return (
    <div className="container mt-3 mb-3">
      <h2 className="text-center">Notes Applicaton</h2>
      <AllNotes />
    </div>
  );
};

export default Home;

const root = createRoot(document.getElementById("home"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/note/:id" element={<Note />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
