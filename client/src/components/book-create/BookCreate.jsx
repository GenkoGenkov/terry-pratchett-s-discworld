import { useNavigate } from "react-router";

export default function BookCreate() {
    const navigate = useNavigate();

    const createBookHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const data = Object.fromEntries(formData);

        data._createdOn = Date.now();

        const response = await fetch('http://localhost:3030/jsonstore/books', {
             method: 'POST',
             headers: {
                'content-type': 'application/json'
             },
             body: JSON.stringify(data),
         });
        
         navigate('/books');   
        }

    return(

        <section id="add-page">
            <form id="add-new-book" onSubmit={createBookHandler}>
                <div className="container">

                    <h1>Add New Book</h1>

                    <div className="form-group-half">
                        <label htmlFor="bookName">Book Name:</label>
                        <input type="text" id="bookName" name="title" placeholder="Enter book title..." />
                    </div>

                    <div className="form-group-half">
                        <label htmlFor="genre">Genre:</label>
                        <input type="text" id="genre" name="genre" placeholder="Enter book genre..." />
                    </div>

                    <div className="form-group-half">
                        <label htmlFor="subseries">Subseries:</label>
                        <input type="text" id="subseries" name="subseries" placeholder="Enter book subseries..." />
                    </div>

                    <div className="form-group-half">
                        <label htmlFor="characters">Characters:</label>
                        <input type="text" id="characters" name="characters" placeholder="Enter book characters..." />
                    </div>

                    <div className="form-group-half">
                        <label htmlFor="locations">Locations:</label>
                        <input type="text" id="locations" name="locations" placeholder="Enter book locations..." />
                    </div>

                    <div className="form-group-half">
                        <label htmlFor="releaseDate">Release Date:</label>
                        <input type="date" id="releaseDate" name="date" />
                    </div>

                    <div className="form-group-full">
                        <label htmlFor="image">Image Url:</label>
                        <input type="text" id="image" name="imageUrl" placeholder="Enter image URL..." />
                    </div>

                    <div className="form-group-full">
                        <label htmlFor="summary">Summary:</label>
                        <textarea name="summary" id="summary" rows="5" placeholder="Write a brief summary..."></textarea>
                    </div>

                    <input className="btn submit" type="submit" value="ADD BOOK" />
                </div>
            </form>
        </section>
    )
}