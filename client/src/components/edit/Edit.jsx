import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import request from "../../utils/request";

const initialValues = {
    title: '',
    genre: '',
    subseries: '',
    characters: '',
    locations: '',
    date: '',
    imageUrl: '',
    summary: '',
};

export default function Edit() {
    const navigate = useNavigate();
    const { bookId } = useParams();
    const [values, setValues] = useState(initialValues);

    const changeHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
    };

    useEffect(() => {
        request(`/books/${bookId}`)
            .then(result => {
                setValues(result);
            })
            .catch(err => {
                alert(err.message);
            })
    }, [bookId]);

    const editBookHandler = async () => {
        try {
            await request(`/books/${bookId}`, 'PUT', values);

            navigate(`/books/${bookId}/details`);
        } catch (err) {
            alert(err.message);
        }
    }

    return (
        <section id="edit-page">
            <form id="add-new-book" action={editBookHandler}>
                <div className="container">

                    <h1>Edit Book</h1>

                    <div className="form-group-half">
                        <label htmlFor="bookName">Book Name:</label>
                        <input
                            type="text"
                            id="bookName"
                            name="title"
                            onChange={changeHandler}
                            value={values.title}
                            placeholder="Enter book title..."
                        />
                    </div>

                    <div className="form-group-half">
                        <label htmlFor="genre">Genre:</label>
                        <input
                            type="text"
                            id="genre"
                            name="genre"
                            onChange={changeHandler}
                            value={values.genre}
                            placeholder="Enter book genre..."
                        />
                    </div>

                    <div className="form-group-half">
                        <label htmlFor="subseries">Subseries:</label>
                        <input
                            type="text"
                            id="subseries"
                            name="subseries"
                            onChange={changeHandler}
                            value={values.subseries}
                            placeholder="Enter book subseries..."
                        />
                    </div>

                    <div className="form-group-half">
                        <label htmlFor="characters">Characters:</label>
                        <input
                            type="text"
                            id="characters"
                            name="characters"
                            onChange={changeHandler}
                            value={values.characters}
                        />
                    </div>

                    <div className="form-group-full">
                        <label htmlFor="locations">Locations:</label>
                        <input
                            type="text"
                            id="locations"
                            name="locations"
                            onChange={changeHandler}
                            value={values.locations}
                            placeholder="Enter book locations..."
                        />
                    </div>

                    <div className="form-group-half">
                        <label htmlFor="releaseDate">Release Date:</label>
                        <input
                            type="date"
                            id="releaseDate"
                            name="date"
                            onChange={changeHandler}
                            value={values.date}
                        />
                    </div>

                    <div className="form-group-full">
                        <label htmlFor="imageUrl">Image URL:</label>
                        <input
                            type="text"
                            id="image"
                            name="imageUrl"
                            onChange={changeHandler}
                            value={values.imageUrl}
                            placeholder="Enter image URL..."
                        />
                    </div>

                    <div className="form-group-full">
                        <label htmlFor="summary">Summary:</label>
                        <textarea
                            id="summary"
                            name="summary"
                            onChange={changeHandler}
                            value={values.summary}
                            rows="5"
                            placeholder="Write a brief summary..."
                        ></textarea>
                    </div>

                    <input className="btn submit" type="submit" value="EDIT BOOK" />
                </div>
            </form>
        </section>

    );
}
