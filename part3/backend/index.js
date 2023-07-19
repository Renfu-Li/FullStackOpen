import express from "express";

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

const app = express();

// express.json() parse JSON data into JS object (request.body)
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/notes", (req, res) => {
  res.json(notes);
});

app.get("/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find((note) => note.id === id);
  if (note) {
    res.send(note);
  } else {
    res.status(404).end();
  }
});

const generateId = () => {
  const maxId =
    notes.length > 0 ? Math.max(...notes.map((note) => note.id)) : 0;

  return maxId + 1;
};

app.post("/notes", (req, res) => {
  const body = req.body;
  if (!body.content) {
    return res.status(400).json({ error: "content property missing" });
  }

  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId(),
  };

  console.log(note);
  notes.concat(note);

  res.json(note);
});

app.delete("/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = notes.findIndex((note) => note.id === id);
  if (index !== -1) {
    notes.splice(index, 1);
    res.status(200).send("note successfully deleted");
  } else {
    res.status(404).end();
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
