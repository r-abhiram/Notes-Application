import axios from "axios";
import React, { useEffect, useState } from "react";

const UpdateNote = (props) => {
  const [updatedContent, setUpdatedContent] = useState("");

  useEffect(() => {
    setUpdatedContent(props.note.content);
  }, [props.note.content]);

  const handleUpdate = async () => {
    try {
      if (updatedContent != props.note.content) {
        const res = await axios.put(
          `http://localhost:3000/api/v1/note/${props.note.id}`,
          { content: updatedContent }
        );
        window.location.reload();
      } else {
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Update Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleUpdate}>
              <div className="modal-body p-2rem">
                <div className="form-group mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={props.note.title}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Content</label>
                  <textarea
                    type="text"
                    className="form-control"
                    rows="8"
                    value={updatedContent}
                    onChange={(e) => setUpdatedContent(e.target.value)}
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
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateNote;
