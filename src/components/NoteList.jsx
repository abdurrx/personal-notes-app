import React from "react";
import PropTypes from "prop-types";
import NoteItem from "./NoteItem";

const NoteList = ({ notes }) => {
  return (
    <>
      {notes.length ? (
        <section className="notes-list">
          {notes.map((note) => (
            <NoteItem key={note.id} note={note} />
          ))}
        </section>
      ) : (
        <section className="notes-list-empty">
          <p className="notes-list__empty">Tidak ada catatan</p>
        </section>
      )}
    </>
  );
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default NoteList;
