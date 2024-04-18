import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Restaurants from "./routes/Restaurants";
import Home from "./routes/Home";
import Orders from "./routes/Orders";
import Navbar from "./components/Navbar";
import "./App.css";
import Login from "./Auth/Login";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  useEffect(() => {
    const handleLocalStorageChange = () => {
      isLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };

    window.addEventListener("storage", handleLocalStorageChange);

    
  }, []);

 
    return (
    <>
    <Navbar />
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:restaurantId" element={<Orders />} />
    </Routes>
    </>
  );
}

export default App;