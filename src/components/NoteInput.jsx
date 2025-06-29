import React from "react";
import PropTypes from "prop-types";
import { MdOutlineDone } from "react-icons/md";

import useInput from "../hooks/useInput";

function NoteInput({ addNote }) {
  const [title, setTitle] = useInput("");
  const [body, setBody] = React.useState("");

  const onBodyInputHandler = (event) => {
    setBody(event.target.innerText);
  };

  async function onSubmitEventHandler(event) {
    event.preventDefault();
    addNote({ title, body });
  }

  return (
    <div className="add-new-page__input">
      <input
        type="text"
        placeholder="Catatan rahasia"
        className="add-new-page__input__title"
        value={title}
        onChange={setTitle}
      />

      <div
        className="add-new-page__input__body"
        data-placeholder="Sebenarnya saya adalah ...."
        contentEditable
        onInput={onBodyInputHandler}
      />

      <div className="add-new-page__action">
        <button
          type="submit"
          onClick={onSubmitEventHandler}
          className="action"
          title="Simpan"
        >
          <MdOutlineDone />
        </button>
      </div>
    </div>
  );
}

NoteInput.propTypes = {
  addNote: PropTypes.func.isRequired,
};

export default NoteInput;
