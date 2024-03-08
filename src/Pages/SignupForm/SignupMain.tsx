import classes from './SignupMain.module.css';
import SignIn from '../../Components/pages/Registration/Signin/SignIn';
import Signup from '../../Components/pages/Registration/Signup/Signup';
import { useEffect, useState } from 'react';


const SignupMain = () => {

    const [type, setType] = useState("signIn");
    const [scroll, setScroll] = useState("signIn");
    const handleOnClick = (text: string) => {
        if (text !== type) {
            setType(text);
            return;
        }
    };

    const scrollOnClick = (srl: string) => {
        if (srl !== scroll) {
            setScroll(srl);
            return;
        }
    }

    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    const updateWindowWidth = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', updateWindowWidth);

        // Cleanup function to remove event listener
        return () => {
            window.removeEventListener('resize', updateWindowWidth);
        };
    }, []);
    const containerClass = `${type === "signUp" ? classes["right-panel-active"] : ""}`;
    console.log(scroll);
    
    const scrollClass = `${scroll === "signUp" ? classes["bottom-panel-active"] : ""}`;
    return (
        <div id={classes.Regcontainer}>
            {window.innerWidth <= 768 &&
                <div className={classes['responsive-bar-button']}>
                    <button id="signIn"
                        onClick={() => scrollOnClick("signIn")}>Login</button>
                    <button
                        id="signUp"
                        onClick={() => scrollOnClick("signUp")}
                    >SignUp</button>
                </div>
            }
            <div className={`${classes.regForm} ${scrollClass}`}>
                <div className={classes.signin}><SignIn /></div>
                <div className={classes.signup}><Signup /></div>
            </div>
            <div className={`${classes['overlay-container']} ${containerClass}`}>
                <div className={classes["overlay"]}>
                    <div className={`${classes["overlay-panel"]} ${classes["overlay-left"]}`}>
                        <h1>Hello, Friend!</h1>
                        <p>Enter your personal details and start journey with us</p>
                        <button
                            className={classes.ghost}
                            id="signUp"
                            onClick={() => handleOnClick("signUp")}
                        >
                            Sign Up
                        </button>
                    </div>

                    <div className={`${classes["overlay-panel"]} ${classes["overlay-right"]}`}>
                        <h1>Welcome Back!</h1>
                        <p>
                            To keep connected with us please login with your personal info
                        </p>
                        <button
                            className={classes.ghost}
                            id="signIn"
                            onClick={() => handleOnClick("signIn")}
                        >
                            Sign In
                        </button>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default SignupMain;
