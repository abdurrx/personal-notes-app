import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Header";
import HomePage from "../pages/HomePage";
import AddPage from "../pages/AddPage";
import DetailPage from "../pages/DetailPage";
import ArchivePage from "../pages/ArchivePage";
import NotFoundPage from "../pages/NotFoundPage";

const NoteApp = () => {
  return (
    <div className="app-container">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/notes/new" element={<AddPage />} />
          <Route path="/notes/:id" element={<DetailPage />} />
          <Route path="/archives" element={<ArchivePage />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default NoteApp;
