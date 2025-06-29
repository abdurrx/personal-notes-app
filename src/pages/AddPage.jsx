import React from "react";
import { useNavigate } from "react-router-dom";
import NoteInput from "../components/NoteInput";
import { addNote } from "../utils/local-data";

const AddPage = () => {
  const navigate = useNavigate();

  const onAddNoteHandler = ({ title, body }) => {
    addNote({ title, body });
    navigate("/");
  };

  return (
    <section className="add-new-page">
      <NoteInput addNote={onAddNoteHandler} />
    </section>
  );
}

export default AddPage;
