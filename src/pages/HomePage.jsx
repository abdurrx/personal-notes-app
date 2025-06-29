import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { MdOutlineAdd } from "react-icons/md";
import SearchBar from "../components/SearchBar";
import NoteList from "../components/NoteList";
import { getActiveNotes } from "../utils/local-data";

function HomePageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");

  const navigate = useNavigate();

  const changeSearchParams = (keyword) => {
    setSearchParams({ keyword });
  };

  return (
    <HomePage
      defaultKeyword={keyword}
      keywordChange={changeSearchParams}
      navigate={navigate}
    />
  );
}

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getActiveNotes(),
      keyword: props.defaultKeyword || "",
    };

    this.onSearchHandler = this.onSearchHandler.bind(this);
  }

  onSearchHandler(keyword) {
    this.setState(() => {
      return {
        keyword,
      };
    });

    this.props.keywordChange(keyword);
  }

  render() {
    const notes = this.state.notes.filter((note) => {
      return note.title
        .toLowerCase()
        .includes(this.state.keyword.toLowerCase());
    });

    return (
      <section className="homepage">
        <h2>Catatan Aktif</h2>
        <SearchBar
          keyword={this.state.keyword}
          keywordChange={this.onSearchHandler}
        />
        <NoteList notes={notes} />

        <div className="homepage__action">
          <button
            type="button"
            onClick={() => this.props.navigate("/notes/new")}
            className="action"
            title="Tambah"
          >
            <MdOutlineAdd />
          </button>
        </div>
      </section>
    );
  }
}

HomePage.propTypes = {
  defaultKeyword: PropTypes.string,
  keywordChange: PropTypes.func.isRequired,
};

export default HomePageWrapper;
