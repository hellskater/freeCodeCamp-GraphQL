import { useQuery } from "@apollo/client";
import { getBookQuery } from "../queries/queries";

function BookDetails({ bookId }) {
  console.log(bookId);
  const { loading, error, data } = useQuery(getBookQuery, {
    variables: {
      id: bookId,
    },
  });
  console.log(data);

  const displayBookDetails = () => {
    if (data) {
      const { book } = data;
      if (book) {
        return (
          <div>
            <h2>{book.name}</h2>
            <p>Genre: {book.genre}</p>
            <p>Author: {book.author.name}</p>
            <p>All books by this author</p>
            <ul className="other-books">
              {book.author.books.map((item) => {
                return <li key={item.id}>{item.name}</li>;
              })}
            </ul>
          </div>
        );
      }
    } else {
      return <div>No books selected</div>;
    }
  };

  return <div className="book-details">{displayBookDetails()}</div>;
}

export default BookDetails;
