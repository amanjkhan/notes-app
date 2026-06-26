import "./App.css";

import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import NoteForm from "./components/NoteForm";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <div className="app-layout">
      <Navbar />
      <div className="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/new" element={<NoteForm formType={"new"} />} />
          <Route path="/edit/:id" element={<NoteForm formType={"edit"} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
