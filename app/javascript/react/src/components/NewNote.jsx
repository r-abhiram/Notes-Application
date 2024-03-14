import axios from "axios";
import React, { useEffect, useState } from "react";
import Errors from "./Errors";

const NewNote = () => {
  const emptyFields = {
    title: "",
    content: "",
  };

  const [formFields, setFormFields] = useState(emptyFields);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState([]);

  const postData = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/notes/create",
        formFields
      );
      console.log(res.data);
      setFormFields(emptyFields);
      setIsError(false);
      window.location.reload();
    } catch (err) {
      console.log(err);
      setIsError(true);
      setError(err.response.data.data);
    }
  };

  return (
    <div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Create New Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            {isError && <Errors error={error} />}
            <form onSubmit={postData}>
              <div className="modal-body p-2rem">
                <div className="form-group mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formFields.title}
                    onChange={(e) =>
                      setFormFields({ ...formFields, title: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Content</label>
                  <textarea
                    type="text"
                    className="form-control"
                    rows="8"
                    value={formFields.content}
                    onChange={(e) =>
                      setFormFields({ ...formFields, content: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewNote;
