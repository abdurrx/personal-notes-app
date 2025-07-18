import React from "react";
import PropTypes from "prop-types";

import NoteItem from "./NoteItem";

import LocaleContext from "../contexts/LocaleContext";

function NoteList({ notes }) {
  const { locale } = React.useContext(LocaleContext);

  return (
    <>
      {notes.length ? (
        <section className="notes-list">
          {notes.map((note) => (
            <NoteItem
              key={note.id}
              id={note.id}
              title={note.title}
              body={note.body}
              createdAt={note.createdAt}
            />
          ))}
        </section>
      ) : (
        <section className="notes-list-empty">
          <p className="notes-list__empty">
            {locale === "id" ? "Tidak ada catatan" : "No notes"}
          </p>
        </section>
      )}
    </>
  );
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default NoteList;
