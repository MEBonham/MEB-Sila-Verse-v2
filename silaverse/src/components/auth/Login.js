import React, { useState } from 'reactn';
import { Link } from 'react-router-dom';

import firebase from '../../fbConfig';

import useForm from '../../hooks/useForm';

const Login = props => {

    firebase.auth.onAuthStateChanged(user => {
        if (user) {
            props.history.push("/");
        }
    });
    
    const [ errorMessage, setErrorMessage ] = useState("");

    const signIn = () => {
        firebase.auth.signInWithEmailAndPassword(inputs.email, inputs.password)
            .catch(err => {
                if (err.code && (err.code === "auth/user-not-found" || err.code === "auth/wrong-password")) {
                    setErrorMessage("Invalid username or password.");
                } else {
                    setErrorMessage("Error signing in.");
                    console.log("Miscellaneous error signing in.", err);
                }
            });
    }
    
    const { inputs, handleInputChange, handleSubmit } = useForm(signIn);

    return(
        <form onSubmit={handleSubmit} className="login-form">
            <h1>Login</h1>
            <label htmlFor="email">Email</label>
            <input
                type="email"
                id="email"
                onChange={handleInputChange}
                value={inputs.email || ""}
                required
            />
            <label htmlFor="password">Password</label>
            <input
                type="password"
                id="password"
                onChange={handleInputChange}
                value={inputs.password || ""}
                required
            />
            <button type="submit">Login</button>
            <p className="error-message buffer">{errorMessage}</p>
            <p className="buffer"><Link to="/forgot-password">Forgot password?</Link></p>
        </form>
    )
}

export default Login;