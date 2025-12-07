import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import DetailsComments from "./details-comments/DetailsComments";
import CreateComment from "./create-comment/CreateComment";


const baseUrl = `http://localhost:3030/jsonstore/books`;

export default function Details({
    user,
}) {
    const navigate = useNavigate();
    const { bookId } = useParams();
    const [book, setBoook] = useState({});
    const [refresh, setRefresh] = useState(false);
    

    useEffect(() => {
        fetch(`${baseUrl}/${bookId}`)
            .then(response => response.json())
            .then(result => setBoook(result))
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

    const refreshHandler = () => {
        setRefresh(state => !state);
    }

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

                <DetailsComments refresh={refresh} />
            </div>

            {user && <CreateComment user={user} onCreate={refreshHandler} />}
</section>
    );
}