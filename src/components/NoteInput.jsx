import React from "react";
import PropTypes from "prop-types";
import { MdOutlineDone } from "react-icons/md";

class NoteInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
    };

    this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
    this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onTitleChangeEventHandler(event) {
    this.setState(() => {
      return {
        title: event.target.value,
      };
    });
  }

  onBodyChangeEventHandler(event) {
    this.setState(() => {
      return {
        body: event.target.innerHTML,
      };
    });
  }

  onSubmitEventHandler(event) {
    event.preventDefault();
    this.props.addNote(this.state);
  }

  render() {
    return (
      <div className="add-new-page__input">
        <input
          type="text"
          placeholder="Catatan rahasia"
          className="add-new-page__input__title"
          value={this.state.title}
          onChange={this.onTitleChangeEventHandler}
        />

        <div
          className="add-new-page__input__body"
          data-placeholder="Sebenarnya saya adalah ...."
          contentEditable
          onInput={this.onBodyChangeEventHandler}
        />

        <div className="add-new-page__action">
          <button
            type="submit"
            onClick={this.onSubmitEventHandler}
            className="action"
            title="Simpan"
          >
            <MdOutlineDone />
          </button>
        </div>
      </div>
    );
  }
}

NoteInput.propTypes = {
  addNote: PropTypes.func.isRequired,
};

export default NoteInput;
