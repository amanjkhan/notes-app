import "./App.css";

import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ServerStartingPage from "./pages/ServerStartingPage";
import HomePage from "./pages/HomePage";
import NoteForm from "./components/NoteForm";
import NotFoundPage from "./pages/NotFoundPage";
import { useState } from "react";

function App() {
  const [serverReady, setServerReady] = useState(false);

  if (!serverReady) {
    return <ServerStartingPage onServerReady={() => setServerReady(true)} />;
  }

  return (
    <div className="app-layout">
      <Navbar />
      <div className="main">
        <Routes>
          <Route
            path="/"
            element={<HomePage onServerDown={() => setServerReady(false)} />}
          />
          <Route path="/new" element={<NoteForm formType={"new"} />} />
          <Route path="/edit/:id" element={<NoteForm formType={"edit"} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
