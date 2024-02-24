import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from './App';


export default function Login() {
  const navigate = useNavigate();
  const {isAuthenticated, setIsAuthenticated} = useAuthContext();
  console.log(isAuthenticated);
  
  const preventRefresh = (e) => {
    e.preventDefault();
    setIsAuthenticated(true);
    navigate('/');
  };
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
					<button type="submit" onClick={preventRefresh}>
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
