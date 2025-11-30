import { useEffect, useState } from "react";
import Book from "../book/Book";

const BASE_URL = 'http://localhost:3030/jsonstore/books';

export default function Catalog() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(BASE_URL);
                const result = await response.json();

                setBooks(Object.values(result));
            } catch (err) {
                alert(err.message);
            }
        })();
    }, []);

    return (
        <section id="catalog-page">
            <h1>Catalog</h1>

            {books.length === 0 && <h3 className="no-articles">No Added Books Yet</h3>}

            <div className="catalog-container">
                {books.map(book => <Book key={book._id} {...book} />)}
            </div>

        </section>
    );
}