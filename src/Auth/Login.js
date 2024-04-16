import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { auth, resetState } from '../store/actions/auth';
import { Container, TextField, Button, Grid } from "@material-ui/core"
import { useNavigate } from 'react-router-dom';
import HaveKitchen from '../assets/HaveKitchen.png';
import { getUserDetails } from "../store/actions";

function Login() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  const userDetails = useSelector(state => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("isLoggedIn", false);
    dispatch(resetState());
  }, []);

  useEffect(() => {
    if(userDetails.userId !== null && userDetails.userId !== undefined){
      localStorage.setItem("isLoggedIn", true);
      // Navigation to the Home page after login.
      navigate("/home");
    }
  }, [userDetails]);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  function sendLoginRequest() {
    const reqBody = {
      username: username,
      password: password,
    };

    dispatch(auth(reqBody));
    /*
    fetch("http://localhost:8081/ffc/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify(reqBody),
    })
      .then((response) => {
        if (response.status === 200) return response.text();
        else if (response.status === 401 || response.status === 403) {
          setErrorMsg("Invalid username or password");
        } else {
          setErrorMsg("Something went wrong..");
        }
      })
      .then((data) => {
        if (data && data.userId !== null) {
          const currentUserId = data; 
          localStorage.setItem("isLoggedIn", true);
          dispatch(getUserDetails(currentUserId));
          // Navigation to the Home page after login.
          navigate("/home", { state: { userId: currentUserId } });
        }
      });*/
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    sendLoginRequest();
  };

  return (
  <div className="login-container">
    <Container maxWidth="xs">
      <div>
        <img src={HaveKitchen} alt="logo" className="logo"/>
      </div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Username"
              fullWidth
              value={username}
              onChange={handleUsernameChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="password"
              label="Password"
              fullWidth
              value={password}
              onChange={handlePasswordChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  </div>
  );
};

export default Login;
