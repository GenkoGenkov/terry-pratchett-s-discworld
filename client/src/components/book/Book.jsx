import { Link } from 'react-router';

export default function Book({
    _id,
    title,
    genre,
    imageUrl,
}) {
    return (
        <div className="book">
            <img src={imageUrl} alt={title} />
            <div className="details-overlay">
                <p className="name">{title}</p>
                <p className="genre">{genre}</p>
                <Link to={`/books/${_id}/details`} className="details-button">Details</Link>
            </div>
        </div>
    );
}