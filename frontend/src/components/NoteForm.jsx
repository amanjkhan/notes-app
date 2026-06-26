import "./NoteForm.css";

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Loading from "./Loading";
import SaveBtn from "./SaveBtn";
import MessageBox from "./MessageBox";
import ConfirmationBox from "./ConfirmationBox";

export default function NewNotePage({ formType }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(formType === "edit");
  const [originalNote, setOriginalNote] = useState({ title: "", content: "" });
  const [message, setMessage] = useState({});
  const [showConfirmBox, setShowConfirmBox] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setMessage({ success: false, message: "Title is required" });
      setTimeout(() => {
        setMessage({});
      });
      return;
    }

    try {
      if (formType === "new") {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/notes`,
          { title, content },
        );
        setMessage(response.data);
        setLoading(true);
        setTimeout(() => {
          setMessage({});
          setLoading(false);
          navigate("/");
        }, 1000);
      } else {
        const response = await axios.put(
          `${import.meta.env.VITE_API_URL}/api/notes/${id}`,
          { title, content },
        );
        setOriginalNote(response.data.data);
        setMessage(response.data);
        setTimeout(() => {
          setMessage({});
        }, 3000);
      }
    } catch (err) {
      setMessage({ success: false, message: err.message });
      setTimeout(() => {
        setMessage({});
      }, 3000);
    }
  };

  const handleDelete = () => {
    setShowConfirmBox(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/notes/${id}`,
      );
      setMessage(response.data);
      setLoading(true);
      setTimeout(() => {
        setMessage({});
        setLoading(false);
        navigate("/");
      }, 1000);
    } catch (err) {
      setMessage({ success: false, message: err.message });
      setTimeout(() => {
        setMessage({});
      }, 3000);
    }
  };

  const fetchNote = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/notes/${id}`,
      );
      setOriginalNote(response.data.data);
      setTitle(response.data.data.title);
      setContent(response.data.data.content);
    } catch (err) {
      console.log(err);
      setMessage({ success: false, message: err.message });
      setTimeout(() => {
        setMessage({});
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (formType === "edit") {
      fetchNote();
    }
  }, [id, formType]);

  if (loading) {
    return (
      <>
        {Object.keys(message).length !== 0 && <MessageBox message={message} />}
        <Loading />
      </>
    );
  }

  const isUnchanged =
    originalNote.title === title.trim() &&
    originalNote.content === content.trim();

  return (
    <form className="new-note-form" onSubmit={handleSubmit}>
      <div className="d-flex justify-content-between">
        <Link to={"/"}>
          <button type="button" className="back-btn">
            <i className="fa-solid fa-arrow-left"></i>
          </button>
        </Link>

        {Object.keys(message).length !== 0 && <MessageBox message={message} />}

        <div className="d-flex gap-2">
          {formType === "edit" && (
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDelete}
            >
              <i className="fa-solid fa-trash"></i>
            </button>
          )}
          <SaveBtn disabled={!title.trim() || isUnchanged} />
        </div>
      </div>
      <input
        className="form-control"
        value={title}
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="form-control custom-textarea"
        value={content}
        placeholder="Content"
        onChange={(e) => setContent(e.target.value)}
      ></textarea>

      {showConfirmBox && (
        <ConfirmationBox
          onConfirm={confirmDelete}
          onCancel={() => setShowConfirmBox(false)}
        />
      )}
    </form>
  );
}
