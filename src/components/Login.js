import { useThemeContext } from "./context/Theme";
import { useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useLoggedInContext } from "./context/LoggedInContext";
import Parse from "parse";
export default function Login({ setuserData }) {
    const { currentTheme } = useThemeContext();
    const navigate = useNavigate();

    Parse.initialize(
        '6x0wgYd99Tukds3wL4FVeUIR3LG3MuVAMWmjUFsI',
        'puLScGf62dABq7n5OGKI0biH0tMPFMWZQIT5Nvxk',
        'gZuYmhXEsEoPIzPNsuNtAa7m21knsAFKxsXz1nKz' 
    );
    Parse.serverURL = 'https://parseapi.back4app.com'
    const username = useRef();
    const password = useRef();
    const { setLoggedIn } = useLoggedInContext();


    return (
        <div className="login" style={currentTheme}>
            <form >
                <input type="email"
                    placeholder="username" ref={username} required/><br />
                <input type="password"
                    placeholder="password" ref={password} required/>
                <button onClick={(e) => {
                    e.preventDefault();
                    (async () => {
                        try {
                            
                            let user = await Parse.User.logIn(username.current.value, password.current.value);
                            localStorage.setItem("user", JSON.stringify(user.attributes));
                            setuserData(() => user.attributes);
                            setLoggedIn(true);
                            navigate("/")
                        } catch (error) {
                            alert(error.message);
                        }
                    })();
                }}
                    style={currentTheme}>
                    Login</button>
            </form>
            <p>Not A Member?</p><NavLink to='/signup'>Register</NavLink>
        </div >
    )
}