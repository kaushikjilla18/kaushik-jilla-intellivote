import React, { useState } from "react";
import { Link } from 'react-router-dom';
import './SignUp.scss';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const validateInputs = () => {
        const errors = {};
        let isValid = true;

        if (!username.trim()) {
            errors.username = "Username is required";
            isValid = false;
        }

        if (!name.trim()) {
            errors.name = "Name is required";
            isValid = false;
        }

        if (!password.trim()) {
            errors.password = "Password is required";
            isValid = false;
        } else if (password.trim().length < 6) {
            errors.password = "Password must be at least 6 characters long";
            isValid = false;
        }

        if (password !== confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateInputs()) {
            setSubmitted(true);
        } else {
            console.log("Form has errors");
        }
    };

    return (
        <form className="signUp" onSubmit={handleSubmit}>
            <h2 className="signUp__title">Sign Up page</h2>
            <div className="signUp__field">
                <label className="signUp__label">Username</label>
                <input
                    className="signUp__input"
                    placeholder="Username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                {errors.username && <p className="signUp__error">{errors.username}</p>}
            </div>
            <div className="signUp__field">
                <label className="signUp__label">Name</label>
                <input
                    className="signUp__input"
                    placeholder="Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <p className="signUp__error">{errors.name}</p>}
            </div>
            <div className="signUp__field">
                <label className="signUp__label">Create a Password</label>
                <input
                    className="signUp__input"
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <p className="signUp__error">{errors.password}</p>}
            </div>
            <div className="signUp__field">
                <label className="signUp__label">Re-type Password</label>
                <input
                    className="signUp__input"
                    placeholder="Password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {errors.confirmPassword && <p className="signUp__error">{errors.confirmPassword}</p>}
            </div>
            <div className="signUp__button-group">
                <button className="signUp__button" type="submit">Sign up</button>
            </div>
            {<p className="signUp__login-text"> Already a user? <Link to='/login' className="signUp__login">Login</Link></p>}
            {submitted && <p className="signUp__submitted-text">Sign up successful! You can now log in. <Link to='/login' className="signUp__login-link">Login here</Link></p>}
        </form>
    );
}

export default SignUp;
