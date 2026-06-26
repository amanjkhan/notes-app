import express from "express";

import asyncHandler from "../utils/asyncHandler.js";
import {
  createNote,
  getNotes,
  getSingleNote,
  updateNote,
  deleteNote,
} from "../controllers/note.controllers.js";

const router = express.Router();

router.route("/").post(asyncHandler(createNote)).get(asyncHandler(getNotes));

router
  .route("/:id")
  .get(asyncHandler(getSingleNote))
  .put(asyncHandler(updateNote))
  .delete(asyncHandler(deleteNote));

export default router;
