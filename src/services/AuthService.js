// src/services/AuthService.js
import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_BASE_URL}`;

const login = (email, password) => {

  return axios.post(`${API_URL}/signin`, { email, password });
};

const logout = () => {
  sessionStorage.removeItem('user');
};

const isAuthenticated = () => {
  const token = sessionStorage.getItem('user');
  if(token !== null){
  return true;
  }
  else{
    return false;
  }
};
const getCurrentUserToken = () => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  return user ? user.accessToken : null;
};

export default {
  login,
  logout,
  isAuthenticated,
  getCurrentUserToken,
};
