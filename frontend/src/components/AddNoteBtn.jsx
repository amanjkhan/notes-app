import "./AddNoteBtn.css";

import { Link } from "react-router-dom";

export default function AddNoteBtn() {
  return (
    <Link to="/new" className="add-note-btn">
      <i className="fa-solid fa-plus"></i>
    </Link>
  );
}
