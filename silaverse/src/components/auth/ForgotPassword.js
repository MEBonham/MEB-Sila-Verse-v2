import React, { useState } from 'react';

import firebase from '../../fbConfig';

import useForm from '../../hooks/useForm';

const ForgotPassword = () => {

    const [ confirmMessage, setConfirmMessage ] = useState("");
    const [ errorMessage, setErrorMessage ] = useState("");

    const sendPasswordReset = () => {
        firebase.auth.sendPasswordResetEmail(inputs.email)
            .then(() => {
                setConfirmMessage("Password Reset Email sent.");
            })
            .catch(err => {
                setErrorMessage("An error occurred.");
                console.log("An error occurred in sending the password reset email.", err);
            });
    }

    const { inputs, handleInputChange, handleSubmit } = useForm(sendPasswordReset);

    return(
        <form onSubmit={handleSubmit} className="login-form">
            <h1>Reset Password</h1>
            <label htmlFor="email">Email</label>
            <input
                type="email"
                id="email"
                onChange={handleInputChange}
                value={inputs.email || ""}
                required
            />
            <button type="submit">Send Password Reset</button>
            <p className="error-message buffer">{errorMessage}</p>
            <p>{confirmMessage}</p>
        </form>
    )
}

export default ForgotPassword;