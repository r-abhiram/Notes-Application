import React from "react";
import AllNotes from "./AllNotes";
import Header from "./Header";

const Home = () => {
  return (
    <div>
      <Header />
      <div className="container mt-3 mb-3">
        <AllNotes />
      </div>
    </div>
  );
};

export default Home;
