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



function App() {
    const[user, setUser] = useState(null);

    const authHandler = (email) => {
      setUser({
        email,
      });
    }

    return (
    <>
     <Header user={user}/>

        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/books" element={<Catalog/>} />
            <Route path="/books/:bookId/details" element={<Details />} />
            <Route path="/books/create" element={<BookCreate />} />
            <Route path="/register" element={<Register onRegister={authHandler} />} />
            <Route path="/login" element={<Login onLogin={authHandler} />} />
        </Routes>

     <Footer/>
    </>
  )
}

export default App
