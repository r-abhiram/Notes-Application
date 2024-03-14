import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Note = () => {
  const currLocation = useRef(window.location.pathname);
  const [data, setData] = useState({});
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNote = async () => {
      const id = String(currLocation.current).split("/")[2];
      try {
        const res = await axios.get(`http://localhost:3000/api/v1/note/${id}`);
        setData(res.data.data);
      } catch (err) {
        console.log(err);
        setIsError(true);
        setError(err.response.data.data);
      }
    };
    fetchNote();
  }, []);

  return (
    <div>
      {!isError ? (
        <div className="container">
          <div className="p-4 mt-3 mb-2 bg-body-tertiary rounded-3">
            <div className="container-fluid py-3">
              <div className="head-container d-flex justify-content-between">
                <h3 className="display-7 fw-bold">{data.title}</h3>
                <button className="btn btn-primary" type="button">
                  <i className="bi bi-pencil me-2"></i>Update
                </button>
              </div>
              <p className="fs-6 my-4">{data.content}</p>
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
