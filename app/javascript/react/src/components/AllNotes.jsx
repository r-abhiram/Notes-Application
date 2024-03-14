import axios from "axios";
import React, { useState, useEffect } from "react";
import NewNote from "./NewNote";
import NoteDetail from "./NoteDetail";

const AllNotes = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/notes");
        setNotes(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="container">
      <div className="button-container d-md-flex justify-content-md-end">
        <button
          type="button"
          className="btn btn-primary mt-1 mb-1"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          <i className="bi bi-plus-lg"></i> Create new note
        </button>
      </div>
      {notes.map((note) => (
        <NoteDetail note={note} key={note.id} />
      ))}
      <NewNote />
    </div>
  );
};

export default AllNotes;
