const supertest = require("supertest");
const mongoose = require("mongoose");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const Note = require("../models/note");

beforeEach(async () => {
  await Note.deleteMany({});

  for (let note of helper.initialNotes) {
    let noteObject = new Note(note);
    await noteObject.save();
  }
});

describe("when there is initially some notes saved", () => {
  test("notes are returned as json", async () => {
    await api
      .get("/api/notes")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all notes are returned", async () => {
    const response = await api.get("/api/notes");
    expect(response.body).toHaveLength(helper.initialNotes.length);
  });

  test("a specific note is within the returned notes", async () => {
    const response = await api.get("/api/notes");
    const contents = response.body.map((note) => note.content);
    expect(contents).toContain("Browser can execute only JavaScript");
  });
});

describe("viewing a specific ntoe", () => {
  test("succeed with a valid id", async () => {
    const notesAtStart = await helper.notesInDb();
    const noteToView = notesAtStart[0];
    const resultNote = await api
      .get(`/api/notes/${noteToView.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(resultNote.body).toEqual(noteToView);
  });

  test("fails with status code 404 if note doesn't exist", async () => {
    const nonExistingId = await helper.nonExistingId();
    console.log(nonExistingId);
    console.log(mongoose.isValidObjectId(nonExistingId));
    await api.get(`/api/notes/${nonExistingId}`).expect(404);
  });

  test("fails with status code 400 if id is invalid", async () => {
    const invalidId = "5a3d5da59070081a82a3445";
    await api.get(`/api/notes/:${invalidId}`).expect(400);
  });
});

describe("addition of a new note", () => {
  test("a valid note can be added", async () => {
    const newNote = {
      content: "async/await simplifies making async calls",
      important: true,
    };

    await api
      .post("/api/notes")
      .send(newNote)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const notesAtEnd = await helper.notesInDb();
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1);

    const contents = notesAtEnd.map((note) => note.content);
    expect(contents).toContain("async/await simplifies making async calls");
  });

  test("fails with status code 400 if data invalid", async () => {
    const newNote = {
      important: true,
    };
    await api.post("/api/notes").send(newNote).expect(400);

    const notesAtEnd = await helper.notesInDb();

    expect(notesAtEnd).toHaveLength(helper.initialNotes.length);
  });
});

describe("deletion of a note", () => {
  test("a note can be deleted", async () => {
    const notesAtStart = await helper.notesInDb();
    const noteToDelete = notesAtStart[0];

    await api.delete(`/api/notes/${noteToDelete.id}`).expect(204);

    const notesAtEnd = await helper.notesInDb();
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length - 1);

    const contents = notesAtEnd.map((note) => note.content);
    expect(contents).not.toContain(noteToDelete.content);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});