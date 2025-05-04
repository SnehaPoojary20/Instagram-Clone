import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../pages/firebase.js";
import { useStateValue } from "../pages/Account/StateProvider.jsx";
import "./Styling.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [{}, dispatch] = useStateValue();
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const newUser = {
          userName: userCredential.user.displayName,
          photoURL: userCredential.user.photoURL,
          email: userCredential.user.email,
          uid: userCredential.user.uid,
        };

        dispatch({
          type: "SET_USER",
          user: newUser,
        });

        localStorage.setItem("user", JSON.stringify(newUser));
        navigate("/");
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="login-container">
      <main className="login-main">
        <form className="login-form" onSubmit={login}>
          <div className="login-logo">
            <img src="./image2" alt="" />
          </div>

          <div className="login-inputContainer">
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="login-inputContainer">
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <button type="submit">Log In</button>
        </form>

        <div className="login-signUpContainer">
          <p>
            Don't Have an account ?{" "}
            <span onClick={() => navigate("/signup")}>Sign Up</span>
          </p>
        </div>
      </main>
    </div>
  );
}

export default Login;
