import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "./App";

export default function Register() {

  const navigate = useNavigate();
  const {saveAcessToken} = useAuthContext();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  console.log(name);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    // Send register request to the server
    fetch("https://fithub-kl23.onrender.com/Register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: name, email: email, password: password }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Invalid credentials");
        }
        return res.json();
      })
      .then((result) => {
        // onLogin(user);
        saveAcessToken(result.access_token);
        navigate('/');
      })
      .catch((error) => {
        alert(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }


  return (
    <div className="wrapper signUp">
      <div className="illustration">
        {/* <img src="https://source.unsplash.com/random" alt="illustration" /> */}
      </div>
      <div className="form">
        <div className="heading">CREATE AN ACCOUNT</div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input required type="text" id="name" placeholder="Enter your name" value={name} onChange={(e) => setname(e.target.value)} />
          </div>
          <div>
            <label htmlFor="emial">E-Mail</label>
            <input required type="text" id="email" placeholder="Enter your mail" value={email} onChange={(e) => setemail(e.target.value)} />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              required
              type="password"
              id="password"
              placeholder="Enter you password"
              value={password} onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">{isLoading ? "Please wait..." : "Submit"}</button>
          <h2 align="center" className="or">
            OR
          </h2>
        </form>
        <p>
          Have an account ? <Link to="/account/login"> Login </Link>
        </p>
      </div>
    </div>
  );
}
