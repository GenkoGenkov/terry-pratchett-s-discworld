import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";

const baseUrl = `http://localhost:3030/jsonstore/books`;

export default function Details() {

    const navigate = useNavigate();
    const { bookId  } = useParams();
    const[book, setBook] = useState({});
    

    useEffect(() => {
        fetch(`${baseUrl}/${bookId}`)
            .then(response => response.json())
            .then(result => setBook(result))
            .catch(err => alert(err.message));
    }, [bookId]);

    const deleteBookHandler = async () => {
        const isConfirmed = confirm(`Are you sure you want to delete book: ${book.title}`);

        if (!isConfirmed) {
            return;
        }

        try {
            await fetch(`${baseUrl}/${bookId}`, {
                method: 'DELETE',
            });

            navigate('/books');
        } catch (err) {
            alert('Unable to delete book: ', err.message);
        }
    };

    return(
<section id="book-details">
            <h1>Book Details</h1>
            <div className="info-section">

                <div className="header-and-image">
                    <img className="book-img" src={book.imageUrl} alt={book.title} />

                    <div className="meta-info">
                        <h1 className="book-name">{book.title}</h1>

                        <p className="data-row">
                            <span className="label">Genre:</span>
                            <span className="value">{book.genre}</span>
                        </p>

                        <p className="data-row">
                            <span className="label">Subseries:</span>
                            <span className="value">{book.subseries}</span>
                        </p>

                        <p className="data-row">
                            <span className="label">Characters:</span>
                            <span className="value">{book.characters}</span>
                        </p>

                        <p className="data-row">
                            <span className="label">Locations:</span>
                            <span className="value">{book.locations}</span>
                        </p>

                        <p className="data-row">
                            <span className="label">Release Date:</span>
                            <span className="value">{book.date}</span>
                        </p>
                    </div>
                    <div className="summary-section">
                        <h2>Summary:</h2>
                        <p className="text-summary">{book.summary}</p>
                    </div>
                </div>

    
        <div className="buttons">
            <Link to={`/books/${bookId}/edit`} className="button">Edit</Link>
            <button className="button" onClick={deleteBookHandler}>Delete</button>
        </div>
        
        <div className="details-comments">
            <h2>Comments:</h2>
            <ul>
                <li className="comment">
                    <p>Content: A masterpiece of world design, though the boss fights are brutal.</p>
                </li>
                <li className="comment">
                    <p>Content: Truly feels like a next-gen evolution of the Souls formula!</p>
                </li>
            </ul>
               <p className="no-comment">No comments.</p>
        </div>

    </div>
 {/* <!-- Add Comment ( Only for logged-in users, which is not creators of the current book ) --> */}
    <article className="create-comment">
        <label>Add new comment:</label>
        <form className="form">
            <textarea name="comment" placeholder="Comment......"></textarea>
            <input className="btn submit" type="submit" value="Add Comment"/>
        </form>
    </article>
</section>
    );
}