import { useContext, useState } from 'react';
import { useHistory, useLocation } from "react-router";
import './Login.css';
import { createSignInAndPasswordHandler, firebaseInitializeLogIn, handleFbSignIn, handleGooglesignIn, handleGooglesignOut, signInAndPasswordHandler,storeAuthToken } from './firebase';
import NavbarComponent from '../../Shared/Navbar/NavbarComponent';
import { Context } from './../../../context/Context';
 
function Login() {

  const [newUser, setnewUser] = useState(false);
  const {dispatch,isFetching}=useContext(Context);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photoURL: '',
    error: '',
    success: false
  })
  firebaseInitializeLogIn();
 
  // Google signInMethod firebase.

  const googleSignIn = () => {
    dispatch({ type:"LOGIN_START" })
    handleGooglesignIn()
      .then(res => {
        setUser(res);
        dispatch({ type:"LOGIN_SUCCESS", payload:res })
        
      })

  }

  // Google signOutMethod firebase.

  const googleSignOut = () => {
    handleGooglesignOut()
      .then(res => {
        setUser(res);
         
      })
  }

  // This is Email and Password validation section.

  const handleBlur = (e) => {
    let checkValidate = true;
    if (e.target.name === 'email') {
      checkValidate = /\S+@\S+\.\S+/.test(e.target.value);

    }
    if (e.target.name === 'password') {
      const passwordValidation = e.target.value.length > 6;
      const passwordValidationNumber = /\d{1}/.test(e.target.value);
      checkValidate = passwordValidation && passwordValidationNumber
    }
    if (checkValidate) {
      const userInfo = { ...user };
      userInfo[e.target.name] = e.target.value;
      setUser(userInfo)
    }
  }
  const submitFormHandler = (e) => {
    // Sign up for new user.
    dispatch({ type:"LOGIN_START" });
    if (newUser && user.email && user.password) {
      createSignInAndPasswordHandler(user.name, user.email, user.password )
        .then((res) => {
          setUser(res);
          dispatch({ type:"LOGIN_SUCCESS", payload:res });
          
        })
    }

    // Sign in for existing user.

    if (!newUser && user.email && user.password) {
      dispatch({ type:"LOGIN_START" });
      signInAndPasswordHandler(user.email, user.password)
        .then((res) => {
          setUser(res);
          dispatch({ type:"LOGIN_SUCCESS", payload:res })
           
        })
    }
    e.preventDefault();
  }
 
  return (
    <>
     <NavbarComponent/>
    {/* This login form */}

     <div className="mx-auto mt-5 full-body">
     <form onSubmit={submitFormHandler} action="" className="form-container w-50 mx-auto mt-5">
        {newUser && <input className=" same-input-field same-input" type="text" name="name" onBlur={handleBlur} placeholder="Your name" required></input>}<br></br>
         
         <input className=" same-input-field same-input" type="text" name="email" onBlur={handleBlur} placeholder="Your Email" required></input> 
        <br></br>
        <input className="same-input-field same-input" type="password" onBlur={handleBlur} name="password" placeholder="Your Password" required></input>
        <br></br>
        {newUser && <input className="same-input-field same-input" type="password" onBlur={handleBlur} name="password" placeholder="Confirm Password" required></input>
        }<br></br>
        <input className="same-input" type="checkBox" name="newUser" id=""></input>
        <label htmlFor="newUser">Remember Me</label>
        <a className="forgate-container"><u>Forgot  Password</u></a>
        <br></br>

        <input className="same-input login-btn" type="submit" value={newUser ? 'Create an account' : 'login'}></input><br></br>
        {
          newUser ? <p className="mt-2">Already have an account? <u><span className="same-input mt-2" style={{ color: 'blue', cursor: 'pointer' }} onClick={() => setnewUser(!newUser)} >login</span></u></p> : <p className="mt-2">Don't have an account? <u><span className="same-input mt-2" style={{ color: 'blue', cursor: 'pointer' }} onClick={() => setnewUser(!newUser)} >Create an account</span></u></p>
        }
        <br></br>
        <p style={{ color: 'red', fontSize: '15px' }}>{user.error}</p>
      
      </form>
      
      <div className="fbGoogle-container mt-5">
        {
          user.isSignedIn ? <button className="btn google same-btn" onClick={googleSignOut}>Sign out</button> : <button className="btn google same-btn" onClick={googleSignIn}>   Continue With google</button>
        }
        <br></br>
        
      </div>
     </div>
    </>
  );
}

export default Login;

