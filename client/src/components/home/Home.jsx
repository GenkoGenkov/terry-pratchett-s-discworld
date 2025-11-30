import { useEffect, useState } from "react";
import Book from "../book/Book";
import request from "../../utils/request";

export default function Home() {
    const [latestBooks, setLatestBooks] = useState([]);

    useEffect(() => {
        request('/books')
            .then(result => {
                const resultBooks = Object.values(result)
                    .sort((a, b) => b._createdOn - a._createdOn)
                    .slice(0, 3);

                setLatestBooks(resultBooks);
            })
            .catch(err => {
                alert(err.message);
            })
    }, []);

    return (
        <section id="welcome-world">
            <div className="welcome-message">
                <h2>ALL new books are</h2>
                <h3>Only in </h3>
                <img id="logo-left" src="./images/logo.png" alt="logo" />
            </div>

            <div id="home-page">
                <h1>Latest Books</h1>
                <div id="latest-wrap">
                    <div className="home-container">
                        {latestBooks.length === 0 && <p className="no-articles">No books yet</p>}

                        {latestBooks.map(book => <Book key={book._id} {...book} />)}
                    </div>

                </div>
            </div>
        </section>
    );
}