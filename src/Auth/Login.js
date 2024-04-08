import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Grid } from "@material-ui/core"
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import HaveKitchen from '../assets/HaveKitchen.png';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../store/reducers/userReducer';
import { getUserDetails } from "../store/actions";

function Login() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  //const [userDetails, setUserDetails] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("isLoggedIn", false);
  }, []);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  function sendLoginRequest() {
    setErrorMsg("");
    const reqBody = {
      username: username,
      password: password,
    };

    fetch("http://localhost:8081/ffc/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify(reqBody),
    })
      .then((response) => {
        console.log(response)
        if (response.status === 200) return response.text();
        else if (response.status === 401 || response.status === 403) {
          setErrorMsg("Invalid username or password");
        } else {
          setErrorMsg("Something went wrong..");
        }
      })
      .then((data) => {
        if (data && data.userId !== null) {
          //setUserDetails(data);
          const currentUserId = data; 
          console.log(currentUserId);
          localStorage.setItem("isLoggedIn", true);
          dispatch(getUserDetails(currentUserId));
          navigate("/home", { state: { userId: currentUserId } });
        }
      });
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
