import React from "react";
import { useSearchParams } from "react-router-dom";

import Loading from "../components/Loading";
import SearchBar from "../components/SearchBar";
import NoteList from "../components/NoteList";

import LocaleContext from "../contexts/LocaleContext";
import { getArchivedNotes } from "../utils/network-data";

function ArchivePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = React.useState(true);
  const [notes, setNotes] = React.useState([]);

  const [keyword, setKeyword] = React.useState(() => {
    return searchParams.get("keyword") || "";
  });

  const { locale } = React.useContext(LocaleContext);

  React.useEffect(() => {
    getArchivedNotes().then(({ data }) => {
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
    <section className="archives-page">
      <h2>{locale === "id" ? "Catatan Arsip" : "Archived Notes"}</h2>
      <SearchBar keyword={keyword} keywordChange={onSearchHandler} />
      <NoteList notes={filteredNotes} loading={loading} />
    </section>
  );
}

export default ArchivePage;
