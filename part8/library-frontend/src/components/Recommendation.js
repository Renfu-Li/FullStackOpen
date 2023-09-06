import { useQuery } from "@apollo/client";
import { ME, BOOKS } from "../queries";

const Recommendation = ({ show }) => {
  const userResult = useQuery(ME);
  const favoriteGenre = userResult.data?.me?.favoriteGenre || null;

  const bookResult = useQuery(BOOKS, {
    variables: { genre: favoriteGenre },
  });

  if (userResult.loading || bookResult.loading) return <p>Loading...</p>;

  const filteredBooks = bookResult.data?.allBooks;

  if (!show) return null;

  return (
    <div>
      <h2>Recommendations</h2>
      <p>
        books in your favorite genre <strong>{favoriteGenre}</strong>
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((b) => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendation;
