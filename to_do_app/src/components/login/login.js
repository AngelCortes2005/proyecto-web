import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [user, setUser] = React.useState({
    username: "",
    password: "",
  });
  const [userAuth, setUserAuth] = React.useState();
  const navigate = useNavigate();

  const urlApi = "http://localhost/dashboard/apiDB.php/records";

  const onChangeInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    setUser({ ...user, [name]: value });
  };
  const getUsers = () =>{
    axios
    .get(`${urlApi}/users`, {
      params: {
        Username: user.username
      }
    })
    .then(function (response) {
      
      console.log(response.data.records[0]);
      setUserAuth(response.data.records[0]);
      consultar();
      
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {

      
    });
  };
  const consultar = () => {

    if(user.username === userAuth.Username && user.password === userAuth.Password){
      console.log("Usuario Correcto");
      navigate('/home')
    } else {
      console.log("Usuario o Contraseña incorrecto");
    }
  }
  
  return (
  <div className="login" data-testid="Login">
    <h1>Inicio de Sesión</h1>
    <br/>
    <TextField id="user-input" name="username" label="Usuario" variant="outlined" onChange={onChangeInput} />
    <br/><br/>
    <TextField id="pass-input" name="password" label="Contraseña" variant="outlined" onChange={onChangeInput}/>
    <br/><br/><br/>
    <Button variant="contained" onClick={getUsers}>Ingresar</Button>
    <br/>
    <a href='http://localhost:3000/register'>Registrar Usuario</a>
  </div> 

)};

Login.propTypes = {};

Login.defaultProps = {};

export default Login;
