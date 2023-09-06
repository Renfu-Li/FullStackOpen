import { useState } from "react";
import { BOOKS } from "../queries";
import { useQuery } from "@apollo/client";

const Books = ({ show }) => {
  const [showGenre, setShowGenre] = useState(null);
  const filteredResult = useQuery(BOOKS, {
    variables: {
      genre: showGenre,
    },
  });

  const allResult = useQuery(BOOKS);

  if (!show) {
    return null;
  }

  if (filteredResult.loading || allResult.loading) return <p>Loading...</p>;

  const filteredBooks = filteredResult.data.allBooks;
  const allBooks = allResult.data.allBooks;

  // const filteredBooks =
  //   showGenre === "all"
  //     ? books
  //     : books.filter((book) => book.genres.includes(showGenre));

  const allGenres = allBooks.reduce(
    (genres, book) => genres.concat(...book.genres),
    []
  );

  const uniqueGenres = [...new Set(allGenres)];

  const booksToShow = showGenre === "all" ? allBooks : filteredBooks;

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToShow.map((b) => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {uniqueGenres.map((genre) => (
        <button key={genre} onClick={() => setShowGenre(genre)}>
          {genre}
        </button>
      ))}
      <button onClick={() => setShowGenre("all")}>All genres</button>
    </div>
  );
};

export default Books;
