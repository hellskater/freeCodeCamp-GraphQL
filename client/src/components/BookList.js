import { useQuery } from "@apollo/client";
import { useState } from "react";
import { getBooksQuery } from "../queries/queries";
import BookDetails from "./BookDetails";

function BookList() {
  const [selectedId, setSelectedId] = useState("");

  const { loading, error, data } = useQuery(getBooksQuery);

  const displayBooks = () => {
    if (loading) return <div>Loading...</div>;
    else if (error) return <div>Error :(</div>;
    else {
      return data.books.map((book) => {
        return (
          <li key={book.id} onClick={(e) => setSelectedId(book.id)}>
            {book.name}
          </li>
        );
      });
    }
  };

  return (
    <div className="bookList">
      <ul className="book-list">{displayBooks()}</ul>
      <BookDetails bookId={selectedId} />
    </div>
  );
}

export default BookList;
