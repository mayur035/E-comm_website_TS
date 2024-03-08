import React, { ChangeEvent } from 'react'
import classes from './Signup.module.css'
import { Facebook, Google, LinkedIn } from '@mui/icons-material'

const Signup = () => {

    const [state, setState] = React.useState({
        name: "",
        email: "",
        password: ""
      });
      const handleChange = (evt:ChangeEvent<HTMLInputElement>) => {
        const value = evt.target.value;
        setState({
          ...state,
          [evt.target.name]: value
        });
      };

    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('submit')
    }
    return (
        <div className={classes['signup-main-container']}>
            <form onSubmit={handleSubmit} className={classes.from_control}>
                <h1 className={classes.heading}>Create Account</h1>
                <div className={classes['social-container']}
                >
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
                    <button>Sign Up</button>

                </div>
            </form>
        </div>
    )
}

export default Signup