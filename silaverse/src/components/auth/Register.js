import React, { useState } from 'reactn';

import firebase from '../../fbConfig';

import useForm from '../../hooks/useForm';

const Register = props => {

    firebase.auth.onAuthStateChanged(user => {
        if (!user) {
            props.history.push("/login");
        }
    });
    
    const [ errorMessage, setErrorMessage ] = useState("");

    const registry = () => {
        firebase.auth.createUserWithEmailAndPassword(inputs.email, inputs.password)
            .then(() => {
                firebase.auth.currentUser.updateProfile({
                    displayName: inputs.username
                });
                firebase.auth.signOut();
                props.history.push("/login");
            })
            .catch(err => {
                if (err.code && err.code === "auth/email-already-in-use") {
                    setErrorMessage("Email already in use.");
                } else {
                    setErrorMessage("Error registering.");
                    console.log("Miscellaneous error registering user.", err);
                }
            });
    }
    
    const { inputs, handleInputChange, handleSubmit } = useForm(registry);

    return(
        <form onSubmit={handleSubmit} className="login-form">
            <h1>Register</h1>
            <label htmlFor="email">Email</label>
            <input
                type="email"
                id="email"
                onChange={handleInputChange}
                value={inputs.email || ""}
                required
            />
            <label htmlFor="username">Username</label>
            <input
                type="text"
                id="username"
                onChange={handleInputChange}
                value={inputs.username || ""}
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
            <button type="submit">Register</button>
            <p className="buffer">Note: You will need to re-login after creating a new user.</p>
            <p className="error-message buffer">{errorMessage}</p>
        </form>
    )
}

export default Register;