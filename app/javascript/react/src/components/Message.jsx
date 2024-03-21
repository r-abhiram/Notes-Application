import React from "react";

const Message = (props) => {
  return (
    <div className="container mx-2">
      {props.type == "error" ? (
        props.msg.map((error, index) => (
          <p className="text-danger mt-1 mb-0" key={index}>
            {error}
          </p>
        ))
      ) : (
        <p className="text-success mt-1 mb-0">{props.msg}</p>
      )}
    </div>
  );
};

export default Message;
