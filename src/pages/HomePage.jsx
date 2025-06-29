import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { MdOutlineAdd } from "react-icons/md";

import Loading from "../components/Loading";
import SearchBar from "../components/SearchBar";
import NoteList from "../components/NoteList";

import LocaleContext from "../contexts/LocaleContext";
import { getActiveNotes } from "../utils/network-data";

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = React.useState(true);
  const [notes, setNotes] = React.useState([]);

  const [keyword, setKeyword] = React.useState(() => {
    return searchParams.get("keyword") || "";
  });

  const navigate = useNavigate();
  const { locale } = React.useContext(LocaleContext);

  React.useEffect(() => {
    getActiveNotes().then(({ data }) => {
      setNotes(data);
      setLoading(false);
    });

    return () => {
      setLoading(true);
      setNotes([]);
    };
  }, []);

  async function onSearchHandler(keyword) {
    setSearchParams({ keyword });
    setKeyword(keyword);
  }

  const filteredNotes = notes.filter((note) => {
    return note.title.toLowerCase().includes(keyword.toLowerCase());
  });

  if (loading) return <Loading />;

  return (
    <section className="homepage">
      <h2>{locale === "id" ? "Catatan Aktif" : "Active Notes"}</h2>
      <SearchBar keyword={keyword} keywordChange={onSearchHandler} />
      <NoteList notes={filteredNotes} loading={loading} />

      <div className="homepage__action">
        <button
          type="button"
          onClick={() => navigate("/notes/new")}
          className="action"
          title="Tambah"
        >
          <MdOutlineAdd />
        </button>
      </div>
    </section>
  );
}

export default HomePage;
