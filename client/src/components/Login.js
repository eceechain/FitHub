import React, { useState } from "react";

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
}

const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
}
 
