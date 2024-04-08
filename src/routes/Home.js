import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { getRestaurants } from '../store/actions/restaurantActions';
import { getOrders } from '../store/actions/orderActions';
import { getUserList } from "../store/actions";
import Navbar from "../components/Navbar";

function Home() {
  const [openNavbar, setOpenNavbar] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserList());
    dispatch(getRestaurants());
    dispatch(getOrders());
  }, [dispatch]);

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
        <p>Welcome to the Fast Food Chain Application</p>
      </div>
    </div>
  )
}

export default Home;
