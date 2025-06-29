import React from "react";
import PropTypes from "prop-types";
import { useParams, useNavigate } from "react-router-dom";
import parser from "html-react-parser";

import Loading from "../components/Loading";
import NoteAction from "../components/NoteAction";

import LocaleContext from "../contexts/LocaleContext";
import { getNote, archiveNote, unarchiveNote, deleteNote, } from "../utils/network-data";
import { showFormattedDate } from "../utils";

function DetailPage() {
  const { id } = useParams();
  const [loading, setLoading] = React.useState(true);
  const [notes, setNotes] = React.useState([]);

  const navigate = useNavigate();
  const { locale } = React.useContext(LocaleContext);

  React.useEffect(() => {
    getNote(id).then((notes) => {
      setNotes(notes.data);
      setLoading(false);
    });

    return () => {
      setLoading(true);
      setNotes([]);
    };
  }, []);

  async function onArchiveHandler() {
    if (!notes.archived) {
      await archiveNote(notes.id);
    } else {
      await unarchiveNote(notes.id);
    }

    navigate("/");
  }

  async function onDeleteHandler() {
    await deleteNote(notes.id);
    navigate("/");
  }

  if (loading) return <Loading />;

  return (
    <>
      {!notes && (
        <section>
          <h2>404</h2>
          <p>Page not found</p>
        </section>
      )}

      {notes && (
        <section className="detail-page">
          <h3 className="detail-page__title">{notes.title}</h3>
          <p className="detail-page__createdAt">
            {locale === "id"
              ? showFormattedDate(notes.createdAt, "id-ID")
              : showFormattedDate(notes.createdAt, "en-US")}
          </p>
          <div className="detail-page__body">{parser(notes.body)}</div>
          <NoteAction
            id={notes.id}
            archived={notes.archived}
            onArchive={onArchiveHandler}
            onDelete={onDeleteHandler}
          />
        </section>
      )}
    </>
  );
}

DetailPage.propTypes = {
  id: PropTypes.string,
};

export default DetailPage;
