import { Route, Routes } from "react-router"
import { useState } from "react"

import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import Home from "./components/home/Home"
import Catalog from "./components/catalog/Catalog"
import Details from "./components/details/Details"
import BookCreate from "./components/book-create/BookCreate"
import Register from "./components/register/Register"
import Login from "./components/login/Login"
import Logout from "./components/logout/Logout"



function App() {
    const [registerdUsers, setRegisteredUsers] = useState([]);
    const [user, setUser] = useState(null);

    const registerHandler = (email, password) => {
        if (registerdUsers.some(user => user.email === email)) {
            throw new Error('Email is not avaliable!');
        }

        const newUser = { email, password };

        setRegisteredUsers(state => [...state, newUser]);

        setUser(newUser);
    };

    const loginHandler = (email, password) => {
        const user = registerdUsers.find(u => u.email === email && u.password === password);
        if (!user) {
            throw new Error('Invalid email or password')
        }

        setUser(user);
    };

    const logoutHandler = () => {
        setUser(null);
    };

    return (
    <>
     <Header user={user}/>

        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/books" element={<Catalog/>} />
            <Route path="/books/:bookId/details" element={<Details />} />
            <Route path="/books/create" element={<BookCreate />} />
            <Route path="/register" element={<Register onRegister={registerHandler} />} />
            <Route path="/login" element={<Login onLogin={loginHandler} />} />
            <Route path="/logout" element={<Logout onLogout={logoutHandler} />} />
        </Routes>

     <Footer/>
    </>
  )
}

export default App
