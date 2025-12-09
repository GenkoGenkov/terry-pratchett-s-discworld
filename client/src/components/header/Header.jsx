import { Link } from "react-router";

export default function Header(
    user,
) {
    return(
        <header>
        <nav>
            <Link className="home" to="/"> <img src="./images/logo.jpg" alt="logo"/> </Link>
            <Link to="/books">Catalog</Link>

            <div id="user">
                <Link to="/books/create">Add Book</Link>
                <Link to="/logout">Logout</Link>
            </div>

            <div id="guest">
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </div>
        </nav>
    </header>
    )
}