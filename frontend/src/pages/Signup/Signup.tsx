import React, { useState } from 'react';
import { Button } from '../../components';
//import './Signup.css';

const Signup: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ email, password, confirmPassword });
    };

    return (
        <div className="signup-container">
            <h1>Welcome to Synchro</h1>
            <p>Build your calendar and<br />keep track of your assignments effortlessly</p>

            <form onSubmit={handleSubmit}>
                <label>Login</label>
                <input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

                <label>Password</label>
                <div className="input-group">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <span onClick={() => setShowPassword(!showPassword)}>👁️</span>
                </div>

                <label>Confirm password</label>
                <div className="input-group">
                    <input
                        type={showConfirm ? 'text' : 'password'}
                        placeholder="Enter password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                    <span onClick={() => setShowConfirm(!showConfirm)}>👁️</span>
                </div>

                <Button type="submit" text="Sign up" />
            </form>

            <p className="login-redirect">
                Already have an account? <a href="/login">Login now</a>
            </p>
        </div>
    );
};

export default Signup;
