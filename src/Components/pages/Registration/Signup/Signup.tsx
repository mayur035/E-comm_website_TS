import React, { ChangeEvent } from 'react'
import classes from './Signup.module.css'
import { Facebook, Google, LinkedIn } from '@mui/icons-material'
import { ToastFunc } from '../../../../utils/ToastFun'
import Button from '../../../UI/Button/PrimaryButton'

const Signup = () => {
    const [state, setState] = React.useState({
        name: "",
        email: "",
        password: ""
    });
    const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Password validation regex
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        // Check if name, email, and password are not empty
        if (state.name.trim() === '' || state.email.trim() === '' || state.password.trim() === '') {
            ToastFunc("Please fill in all fields", "warn");
            return;
        }

        // Check if email is valid
        if (!emailRegex.test(state.email)) {
            ToastFunc("Email is not valid", "warn");
            return;
        }

        // Check if password matches the regex
        if (!passwordRegex.test(state.password)) {
            ToastFunc("Password must be at least 8 characters long and contain at least one uppercase letter, one digit, and one special character", "warn");
            return;
        }

        // If all validations pass, submit the form
        console.log('submit');
    };
    return (
        <div className={classes['signup-main-container']}>
            <form onSubmit={handleSubmit} className={classes.from_control}>
                <h1 className={classes.heading}>Create Account</h1>
                <div className={classes['social-container']}>
                    <a href=""><Facebook className={classes.social} /></a>
                    <a href=""><Google className={classes.social} /></a>
                    <a href=""><LinkedIn className={classes.social} /></a>
                </div>
                <span>or use your email for registration</span>
                <div className={classes['form-input-container']}>
                    <input
                        type="text"
                        name="name"
                        value={state.name}
                        onChange={handleChange}
                        placeholder="Name"
                    />
                    <input
                        type="email"
                        name="email"
                        value={state.email}
                        onChange={handleChange}
                        placeholder="Email"
                    />
                    <input
                        type="password"
                        name="password"
                        value={state.password}
                        onChange={handleChange}
                        placeholder="Password"
                    />
                    <div className={classes.regBtn}>
                    <Button type="submit">Sign Up</Button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Signup;
