import React from "react";
import { Link } from "react-router-dom";
import parser from "html-react-parser";
import PropTypes from "prop-types";
import { showFormattedDate } from "../utils";

const NoteItemContent = ({ id, title, body, createdAt }) => {
  return (
    <>
      <h3 className="note-item__title">
        <Link to={`/notes/${id}`} discover="none">
          {title}
        </Link>
      </h3>
      <p className="note-item__createdAt">{showFormattedDate(createdAt)}</p>
      <div className="note-item__body">{parser(body)}</div>
    </>
  );
}

NoteItemContent.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default NoteItemContent;
