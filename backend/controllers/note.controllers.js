import mongoose from "mongoose";

import Note from "../models/Note.model.js";

const createNote = async (req, res) => {
  const { title, content } = req.body;

  if (!title?.trim()) {
    return res.status(400).json({
      success: false,
      message: "Title is required",
    });
  }

  const note = await Note.create({
    title: title.trim(),
    content: content?.trim() || "",
  });

  res.status(201).json({
    success: true,
    message: "Note created",
    data: note,
  });
};

const getNotes = async (req, res) => {
  const notes = await Note.find().sort({ updatedAt: -1 });

  res.status(200).json({
    success: true,
    message: "Notes fetched",
    data: notes,
  });
};

const getSingleNote = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid note id",
    });
  }

  const note = await Note.findById(id);

  if (!note) {
    return res.status(404).json({
      success: false,
      message: "Note not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Note fetched",
    data: note,
  });
};

const updateNote = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid note id",
    });
  }

  const { title, content } = req.body;

  const updatedData = {};
  if (title !== undefined) {
    const trimmed = title.trim();
    if (!trimmed) {
      return res.status(400).json({
        success: false,
        message: "Title cannot be empty",
      });
    }
    updatedData.title = trimmed;
  }
  if (content !== undefined) {
    updatedData.content = content.trim();
  }

  const note = await Note.findByIdAndUpdate(id, updatedData, {
    returnDocument: "after",
    runValidators: true,
  });

  if (!note) {
    return res.status(404).json({
      success: false,
      message: "Note not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Note updated",
    data: note,
  });
};

const deleteNote = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid note id",
    });
  }

  const note = await Note.findByIdAndDelete(id);

  if (!note) {
    return res.status(404).json({
      success: false,
      message: "Note not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Note deleted",
    data: note,
  });
};

export { createNote, getNotes, getSingleNote, updateNote, deleteNote };
