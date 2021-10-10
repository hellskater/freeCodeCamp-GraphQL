import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery,
} from "../queries/queries";

function AddBook() {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");

  const { loading, error, data } = useQuery(getAuthorsQuery);

  const [addBook, { mdata, mloading, merror }] = useMutation(addBookMutation);

  const displayAuthors = () => {
    if (loading) return <option>Loading...</option>;
    else if (error) return <option>Error :(</option>;
    else {
      return data.authors.map((author) => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addBook({
      variables: {
        name: name,
        genre: genre,
        authorId: authorId,
      },
      refetchQueries: [{ query: getBooksQuery }],
    });
    setName("");
    setGenre("");
    setAuthorId("");
  };

  return (
    <form className="add_book">
      <div className="field">
        <label htmlFor="bookname">Book Name:</label>
        <input
          id="bookname"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="genre">Genre:</label>
        <input
          id="genre"
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="author">Author:</label>
        <select id="author" onChange={(e) => setAuthorId(e.target.value)}>
          <option>Select author</option>
          {displayAuthors()}
        </select>
      </div>
      <button type="submit" onClick={onSubmit}>
        +
      </button>
    </form>
  );
}

export default AddBook;
