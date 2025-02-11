import { NavLink } from "react-router-dom";
import { useRef } from "react";
import { FiLogOut } from 'react-icons/fi';
import { useThemeContext } from "./context/Theme";
import { useLoggedInContext } from "./context/LoggedInContext";
import {BiHelpCircle} from 'react-icons/bi';

let showMenu = false;
export default function NavBar() {
    const { loggedIn } = useLoggedInContext();
    const { changeTheme, currentTheme } = useThemeContext();
    const { setLoggedIn } = useLoggedInContext();
    const menu = useRef();
    const humbger = useRef();
    function handleMenu(e) {
        if (!showMenu) {
            humbger.current.classList.add("open");
            showMenu = !showMenu
            menu.current.classList.add("nav-active");
            menu.current.classList.remove("nav-hidden");
        } else {
            showMenu = !showMenu
            humbger.current.classList.remove("open");
            menu.current.classList.add("nav-hidden");
            menu.current.classList.remove("nav-active");

        }
    }
    return (
        <>
            <nav
                className="main-nav" ref={menu} style={currentTheme}>
                <ul className="list-style-none">
                    <li>
                        <label className="switch">
                            <input
                                type="checkbox"
                                onChange={() => { changeTheme() }}
                                defaultChecked={false}
                            />
                            <span className="slider round"></span>
                        </label>
                    </li>
                    <li >
                        <NavLink to="/" onClick={handleMenu}>
                            <span>Home</span>
                        </NavLink>
                    </li>
                        <li>
                            <NavLink to="/markets" onClick={handleMenu}>
                                <span>Markets</span>
                            </NavLink>
                        </li>
                    {loggedIn ? <>
                        <li>
                            <NavLink to="/buy-crypto" onClick={handleMenu}>
                                <span>Buy Crypto</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/trades" onClick={handleMenu}>
                                <span>Trades</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/account" onClick={handleMenu}>
                                <span>Account</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/' onClick={() => {
                                localStorage.removeItem("user");
                                setLoggedIn(false);
                            }}>
                                <span><FiLogOut /></span>
                            </NavLink>
                        </li>
                    </> : <> <li>
                        <NavLink to='/login' onClick={handleMenu}>
                            <span>Login</span>
                        </NavLink>
                    </li>
                        <li>
                        <a href="https://wa.me/+254798450464/?text=HELP: Crypto-Trading-Appvtwo" target=" _blank" data-action="share/whatsapp/share"><BiHelpCircle fontSize="2rem"/></a>
                        </li>
                    </>}
                </ul>
            </nav>
            <div className="menu-btn" onClick={handleMenu}>
                <span className="menu-btn_burger" ref={humbger}></span>
            </div>
        </>
    )
}