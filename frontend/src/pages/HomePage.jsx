import axios from "axios";
import { useEffect, useState } from "react";

import Loading from "../components/Loading";
import NoteCard from "../components/NoteCard";
import AddNoteBtn from "../components/AddNoteBtn";
import MessageBox from "../components/MessageBox";

export default function HomePage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({});

  const fetchNotes = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/notes`,
      );
      setNotes(response.data.data);
    } catch (err) {
      setMessage({ success: false, message: err.message });
      setTimeout(() => {
        setMessage({});
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  if (loading) {
    return (
      <>
        <Loading />
        <AddNoteBtn />
      </>
    );
  }

  return (
    <>
      {Object.keys(message).length !== 0 && <MessageBox message={message} />}

      {notes.length === 0 ? (
        <h2 className="content-center">No Notes Found</h2>
      ) : (
        <div className="d-flex flex-column gap-1">
          {notes.map((note) => (
            <NoteCard key={note._id} note={note} />
          ))}
        </div>
      )}
      <AddNoteBtn />
    </>
  );
}
