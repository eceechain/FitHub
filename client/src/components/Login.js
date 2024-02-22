import React, { useState } from "react";

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
}
const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
}

return (
    <div className="auth-form-container">
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="email">email</label>

        </form>

    </div>
)
  


 
