import React from "react";

const Errors = (props) => {
  return (
    <div className="container mx-2">
      {props.error.map((error, index) => (
        <p className="text-danger mt-1 mb-0" key={index}>
          {error}
        </p>
      ))}
    </div>
  );
};

export default Errors;
