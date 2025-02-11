import { useThemeContext } from "./context/Theme";
import { NavLink, useNavigate } from "react-router-dom";
import { useRef } from "react";
import Parse from "parse";


export default function Signup() {
    const { currentTheme } = useThemeContext();
    const navigate = useNavigate();
    const fName = useRef(null);
    const lName = useRef(null);
    const userName = useRef(null);
    const email = useRef(null);
    const password1 = useRef(null);
    const password2 = useRef(null);
    // eslint-disable-next-line
    const specialXs = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    // eslint-disable-next-line
    const hasNumber = /\d/;


    function post() {
        Parse.initialize(
            '6x0wgYd99Tukds3wL4FVeUIR3LG3MuVAMWmjUFsI',
            'puLScGf62dABq7n5OGKI0biH0tMPFMWZQIT5Nvxk',
            'gZuYmhXEsEoPIzPNsuNtAa7m21knsAFKxsXz1nKz'
        );
        Parse.serverURL = 'https://parseapi.back4app.com';
        (async () => {
            const user = new Parse.User();
            user.set('username', userName.current.value);
            user.set('email', email.current.value);
            user.set('avatar_url', "https://cdn.pixabay.com/photo/2014/11/16/23/39/superhero-534120_960_720.jpg");
            user.set('boughtCoins', [{ coin: "BTC", amount: 0 }]);
            user.set('password', password1.current.value);

            try {
                let userResult = await user.signUp();
                console.log('User signed up', userResult);
                localStorage.setItem("user", JSON.stringify({
                    "password": password1.current.value,
                    "email": email.current.value,
                    // "objectId": result.objectId
                }))
                navigate("/");
            } catch (error) {
                console.error('Error while signing up user', error);
            }
        })();

    }


    return (
        <div className="signup" style={currentTheme}>
            <form>
                <div>
                    <label>First Name</label><input type="text" placeholder="Jonh" ref={fName} required />
                    <label>Last Name</label><input type="text" placeholder="Doe" ref={lName} required />
                </div>
                <div>
                    <label>User Name</label><input type="text" placeholder="johnDoe14fsx" ref={userName} required />
                    <label>Email</label><input type="email" placeholder="Doe" ref={email} required /><br />
                    <label>Password</label>
                    <label><small>8 Or More Characters, Including Numbers And Special Characters</small></label>
                    <input type="password" placeholder="Password" ref={password1} required />
                    <label>Confirm Password</label><input type="password" placeholder="Password" ref={password2} required />
                </div>
                <button
                    style={currentTheme}
                    className="signbutton"
                    onClick={(e) => {
                        e.preventDefault();
                        if (
                            email.current.value.includes("@") &&
                            password1.current.value === password2.current.value &&
                            password1.current.value.length > 7 &&
                            specialXs.test(password1.current.value) &&
                            hasNumber.test(password1.current.value)) {
                            post()
                            console.log("Signed")
                            navigate("/")
                        }
                        else {
                            alert("Wrong input... Try again \n :)")
                        }
                    }}
                >Sign up</button>
            </form>
            <p>Already Have An Account?</p><NavLink to='/login'>
                Login</NavLink>
        </div >
    )
}