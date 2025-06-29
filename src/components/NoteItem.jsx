import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import parser from "html-react-parser";

import LocaleContext from "../contexts/LocaleContext";
import { showFormattedDate } from "../utils";

function NoteItem({ id, title, body, createdAt }) {
  const { locale } = React.useContext(LocaleContext);

  return (
    <article className="note-item">
      <h3 className="note-item__title">
        <Link to={`/notes/${id}`} discover="none">
          {title}
        </Link>
      </h3>
      <p className="note-item__createdAt">
        {locale === "id"
          ? showFormattedDate(createdAt, "id-ID")
          : showFormattedDate(createdAt, "en-US")}
      </p>
      <div className="note-item__body">{parser(body)}</div>
    </article>
  );
}

NoteItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default NoteItem;
