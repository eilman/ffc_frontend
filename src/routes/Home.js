import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { getRestaurants } from '../store/actions/restaurantActions';
import { getOrders } from '../store/actions/orderActions';
import { getUserList } from "../store/actions";
import Navbar from "../components/Navbar";

function Home() {
  const [openNavbar, setOpenNavbar] = useState(false);

  const dispatch = useDispatch();

  //After login, users, orders and restaurants will be requested from backend.
  //Their states will be updated.
  useEffect(() => {
    dispatch(getUserList());
    dispatch(getRestaurants());
    dispatch(getOrders());
  }, [dispatch]);

  //To make visible the navbar
  useEffect(() => {
    localStorage.setItem("isLoggedIn", true);
    if(localStorage.getItem("isLoggedIn")){
      setOpenNavbar(true);
    }
  }, []);

  return (
    <div>
      <Navbar open={openNavbar} />
      <div className="home">
        <p>Welcome to the HaveKitchen Application</p>
      </div>
    </div>
  )
}

export default Home;
