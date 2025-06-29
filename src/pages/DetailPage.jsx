import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import parser from "html-react-parser";
import PropTypes from "prop-types";
import NoteAction from "../components/NoteAction";
import { showFormattedDate } from "../utils";
import { getNote, archiveNote, unarchiveNote, deleteNote, } from "../utils/local-data";

const DetailPageWrapper = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return <DetailPage id={id} navigate={navigate} />;
}

class DetailPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      note: getNote(props.id),
    };

    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onArchiveHandler = this.onArchiveHandler.bind(this);
  }

  onDeleteHandler(id) {
    deleteNote(id);
    this.props.navigate("/");
  }

  onArchiveHandler(id) {
    if (!this.state.note.archived) {
      archiveNote(id);
    } else {
      unarchiveNote(id);
    }
    this.props.navigate("/");
  }

  render() {
    const { note } = this.state;
    if (!note) {
      return (
        <section>
          <h2>404</h2>
          <p>Page not found</p>
        </section>
      );
    }

    const { id, title, body, archived, createdAt } = note;

    return (
      <section className="detail-page">
        <h3 className="detail-page__title">{title}</h3>
        <p className="detail-page__createdAt">{showFormattedDate(createdAt)}</p>
        <div className="detail-page__body">{parser(body)}</div>
        <NoteAction
          id={id}
          archived={archived}
          onArchive={this.onArchiveHandler}
          onDelete={this.onDeleteHandler}
        />
      </section>
    );
  }
}

DetailPage.propTypes = {
  id: PropTypes.string.isRequired,
  navigate: PropTypes.func.isRequired,
};

export default DetailPageWrapper;
