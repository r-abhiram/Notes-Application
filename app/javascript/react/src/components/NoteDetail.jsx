import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import UpdateNote from "./UpdateNote";

const NoteDetail = (params) => {
  const truncateWords = () => {
    const words = params.note.content.split(" ");
    const truncated = words.slice(0, 30).join(" ");
    return truncated;
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/v1/destroy/${params.note.id}`
      );
      console.log(res.data);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="p-4 mt-3 mb-2 bg-body-tertiary rounded-3">
        <div className="container-fluid py-3">
          <div className="d-flex justify-content-between">
            <h3 className="display-7 fw-bold">{params.note.title}</h3>
            <button
              className="btn btn-danger"
              type="button"
              onClick={handleDelete}
            >
              <i className="bi bi-trash3"></i>
            </button>
          </div>
          <p className="fs-6 my-4" style={{ overflowWrap: "break-word" }}>
            {truncateWords()}
          </p>
          <Link to={"/note/" + params.note.id}>
            <button className="btn btn-primary" type="button">
              See more...
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NoteDetail;
