import React from "react";
import PropTypes from "prop-types";
import NoteItemContent from "./NoteItemContent";

const NoteItem = ({ note }) => {
  return (
    <article className="note-item">
      <NoteItemContent
        id={note.id}
        title={note.title}
        body={note.body}
        createdAt={note.createdAt}
      />
    </article>
  );
}

NoteItem.propTypes = {
  note: PropTypes.object.isRequired,
};

export default NoteItem;
