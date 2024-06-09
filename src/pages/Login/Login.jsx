import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './Login.scss';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();

    const validateInputs = () => {
        const errors = {};
        let isValid = true;

        if (!username.trim()) {
            errors.username = "Username is required";
            isValid = false;
        }

        if (!password.trim()) {
            errors.password = "Password is required";
            isValid = false;
        } else if (password.trim().length < 6) {
            errors.password = "Wrong Password";
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateInputs()) {
            // Perform login action
            console.log("Form submitted successfully");
            setSubmitted(true);
            //Navigate to results page instead
            setTimeout(() => navigate('/'), 2500);
        } else {
            console.log("Form has errors");
        }
    };

    return (
        <form className="login" onSubmit={handleSubmit}>
            <h2 className="login__title">Login Page</h2>
            <div className="login__input-group">
                <label className="login__label">Username</label>
                <input
                    className="login__input"
                    placeholder="Username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                {errors.username && <p className="login__error">{errors.username}</p>}
            </div>
            <div className="login__input-group">
                <label className="login__label">Password</label>
                <input
                    className="login__input"
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <p className="login__error">{errors.password}</p>}
            </div>
            <div className="login__button-group">
                <button className="login__button" type="submit">Login</button>
            </div>
            {submitted && <p className="login__submitted-text">Login successful! You are now logged in.</p>}
        </form>
    );
}

export default Login;
