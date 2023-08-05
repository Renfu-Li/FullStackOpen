const notesRouter = require("express").Router();
const mongoose = require("mongoose");
const Note = require("../models/note");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");

  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    return authorization.substring(7);
  }
  return null;
};

notesRouter.get("/", async (req, res) => {
  const notes = await Note.find({}).populate("user", { username: 1, name: 1 });
  res.status(200).json(notes);
});

notesRouter.get("/:id", async (req, res) => {
  const id = req.params.id;

  const note = await Note.findById(id);

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).end();
  } else if (!note) {
    return res.status(404).end();
  } else {
    res.status(200).json(note);
  }
});

notesRouter.post("", async (req, res) => {
  const body = req.body;

  const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET);

  if (!decodedToken.id) {
    return res.status(401).json({ error: "token invalid" });
  }

  const user = await User.findById(decodedToken.id);

  const newNote = new Note({
    content: body.content,
    important: body.important || false,
    user: user._id,
  });

  const savedNote = await newNote.save();
  user.notes = user.notes.concat(savedNote._id);
  await user.save();

  res.status(201).json(savedNote);
});

notesRouter.put("/:id", async (req, res) => {
  const documentId = req.params.id;
  const { content, important } = req.body;
  const updatedNote = await Note.findOneAndReplace(
    { _id: documentId },
    { content, important },
    {
      new: true,
      runValidators: true,
      context: "query",
    }
  );

  res.status(200).json(updatedNote);
});

notesRouter.delete("/:id", async (req, res) => {
  const deletedNote = await Note.deleteOne({ _id: req.params.id });
  res.status(204).json(deletedNote);
});

module.exports = notesRouter;
