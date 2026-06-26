import "./NoteCard.css";

import { Link } from "react-router-dom";

import formatDate from "../utils/formatDate.js";

export default function NoteCard({ note }) {
  return (
    <Link to={`/edit/${note._id}`} className="note-card">
      <h4>{note.title}</h4>
      <p className="m-0">{formatDate(note.updatedAt)}</p>
    </Link>
  );
}
