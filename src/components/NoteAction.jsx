import React from "react";
import PropTypes from "prop-types";
import { MdOutlineArchive, MdOutlineUnarchive, MdOutlineDelete, } from "react-icons/md";

const NoteAction = ({ id, archived, onArchive, onDelete }) => {
  return (
    <div className="detail-page__action">
      <button type="button" onClick={() => onArchive(id)} className="action">
        {archived ? <MdOutlineUnarchive /> : <MdOutlineArchive />}
      </button>

      <button type="button" onClick={() => onDelete(id)} className="action">
        <MdOutlineDelete />
      </button>
    </div>
  );
}

NoteAction.propTypes = {
  id: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  onArchive: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default NoteAction;
