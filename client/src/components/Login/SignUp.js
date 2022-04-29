import React, { useState, useEffect } from "react";
import Navbar2 from '../Navbar/Navbar2';
import SignUpForm from './SignUpForm';
import { useHistory } from "react-router-dom";
import { signUp } from "./AuthService";

export default function SignUp() {
  const history = useHistory();
  const [newUser, setNewUser] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confPassword: ""
  });
  const [add, setAdd] = useState(false);


  useEffect(() => {

    if (newUser && (newUser.password === newUser.confPassword) && add) {
      signUp(newUser).then(
        data => {
          if(data.hasOwnProperty("error")) {
            alert(data.error);
          }
          else {
            alert(`Congrats ${newUser.firstName}, you have succesfully created a new user! Now you will be redirected to the login page so you can log in and browse some great listings!`);
            history.push('/login');
          }
        }
      )
    }
    if (add && (newUser.password !== newUser.confPassword)) {
      alert("Passwords don't match");
    }
    setAdd(false);
  }, [newUser, add]);

  const onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value: newValue } = e.target;

    setNewUser({
      ...newUser,
      [name]: newValue
    });
  };

  const onClickHandler = (e) => {
    e.preventDefault();
    setAdd(true);
  }


  return (
    <div >
     
      <Navbar2/>

      <SignUpForm  onChange={onChangeHandler} onClick={onClickHandler}/>
      
        
    </div>
        
  );
}