import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from './App';


export default function Login() {
  const navigate = useNavigate();
  const {isAuthenticated, setIsAuthenticated} = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  console.log(isAuthenticated);

  const preventRefresh = (e) => {
    e.preventDefault();
    setIsAuthenticated(true);
    navigate('/');
  };

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    // Send login request to the server
    fetch("http://localhost:5001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: "john", password: "password123" }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Invalid credentials");
        }
        return res.json();
      })
      .then((user) => {
        // onLogin(user);
        // navigate("/exercises");
        console.log(user);
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
				<form>
					<div>
						<label htmlFor="name">Name</label>
						<input type="text" id="name" placeholder="Enter your name" />
					</div>
					<div>
						<label htmlFor="password">Password</label>
						<input type="password" id="password" placeholder="****************" />
					</div>
					<button type="submit" onClick={handleSubmit}>
						Submit
					</button>
				</form>
				<p>
					Don't have an account ? <Link to="/account/register"> Sign Up </Link>
				</p>
			</div>
		</div>
	);
}
