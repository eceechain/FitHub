import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from './App';
import '../styles/Login.css'

export default function Login() {
  const navigate = useNavigate();
  const {saveAcessToken} = useAuthContext();
  const [name, setname] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  console.log(name);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    // Send login request to the server
    fetch("https://fithub-kl23.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: name, password: password }),
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
		<div className="wrapper signIn">
			<div className="illustration">
				{/* <img src="https://source.unsplash.com/random" alt="illustration" /> */}
			</div>
			<div className="form">
				<div className="heading">LOGIN</div>
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor="name">Name</label>
						<input required type="text" id="name" placeholder="Enter your name" value={name} onChange={(e) => setname(e.target.value)} />
					</div>
					<div>
						<label htmlFor="password">Password</label>
						<input required type="password" id="password" placeholder="****************" value={password} onChange={(e) => setPassword(e.target.value)} />
					</div>
					<button type="Login">
						{isLoading ? "Please wait..." : "Login"}
					</button>
				</form>
				<p>
					Don't have an account ? <Link to="/account/register"> Sign Up </Link>
				</p>
			</div>
		</div>
	);
}
