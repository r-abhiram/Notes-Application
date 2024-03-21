import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import UpdateNote from "./UpdateNote";
import Header from "./Header";
import { format } from "timeago.js";

const Note = () => {
  const currLocation = useRef(window.location.pathname);
  const [data, setData] = useState({ title: "", content: "", img: "" });
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState([]);

  useEffect(() => {
    const fetchNote = async () => {
      const id = String(currLocation.current).split("/")[2];
      try {
        const res = await axios.get(`http://localhost:3000/api/v1/note/${id}`);
        setData(res.data.data);
      } catch (err) {
        setIsError(true);
        setError(err.response.data.data);
      }
    };
    fetchNote();
  }, []);

  return (
    <div>
      <Header />
      {!isError ? (
        <div className="container">
          <div className="p-4 mt-3 mb-2 bg-body-tertiary rounded-3">
            <div className="container-fluid py-3">
              <div className="head-container d-flex justify-content-between">
                <div className="container p-0 d-flex align-items-center">
                  <h3 className="display-7 fw-bold me-3">{data.title}</h3>
                  <p className="fw-lighter fs-6 text-sm m-0">
                    {format(data.created_at)}
                  </p>
                </div>
                <button
                  className="btn btn-primary d-flex"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                >
                  <i className="bi bi-pencil me-2"></i>Update
                </button>
              </div>
              <UpdateNote note={data} />
              <p className="fs-6 my-4">{data.content}</p>
              {data.img && <img src={data.img} />}
            </div>
          </div>
        </div>
      ) : (
        <div className="container mt-4">
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
          <Link to="/">
            <button className="btn btn-primary" type="button">
              Goto homepage
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Note;
