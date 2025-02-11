import { useRef, useState } from "react";
import { useThemeContext } from "./context/Theme";
import BoughtCoincard from "./BoughtCoincard";
import Parse from "parse";
import { useNavigate } from "react-router";

export default function Account({ allCoins, userData, setuserData }) {
    const { currentTheme } = useThemeContext();
    const navigate = useNavigate();
    const avator = useRef();
    const avatar_url = useRef();
    const email = useRef();
    const username = useRef();
    const updateUrl = useRef();
    const [uploadText, setuploadText] = useState("Update Profile");
    const user = JSON.parse(localStorage.getItem("user"));
    const boughtCoinsData = user !== null && user.boughtCoins.map(bCoin => ({ ...allCoins.find(aCoin => bCoin.coin === aCoin.symbol) }))

    Parse.initialize(
        '6x0wgYd99Tukds3wL4FVeUIR3LG3MuVAMWmjUFsI', // This is your Application ID
        'puLScGf62dABq7n5OGKI0biH0tMPFMWZQIT5Nvxk', // This is your Javascript key
        'gZuYmhXEsEoPIzPNsuNtAa7m21knsAFKxsXz1nKz' // This is your Master key (never use it in the frontend)
    );
    //Point to Back4App Parse API address 
    Parse.serverURL = 'https://parseapi.back4app.com';

    function handleUpdate() {
        (async () => {
            const User = new Parse.User();
            const query = new Parse.Query(User);

            try {
                // Finds the user by its ID
                const someData = JSON.parse(localStorage.getItem("user"));
                console.log(someData);
                let user = await query.get(Object.keys(JSON.parse(localStorage.getItem("user")).ACL)[1]);
                // Updates the data we want
                user.set('username', username.current.value);
                user.set('email', email.current.value);
                user.set('avatar_url', avatar_url.current.value);
                try {
                    // Saves the user with the updated data
                    let response = await user.save();
                    console.log('Updated user', response);
                    localStorage.setItem("user", JSON.stringify({
                        ...JSON.parse(localStorage.getItem("user")),
                        'username': username.current.value === "" ? someData.username : username.current.value,
                        'email': email.current.value === "" ? someData.email : email.current.value,
                        'avatar_url': avatar_url.current.value === "" ? someData.avatar_url : avatar_url.current.value
                    }));
                    navigate("/")
                } catch (error) {
                    alert("Fill all fileds for changes to activate.\n:)")
                    console.error('Error while updating user', error);
                    console.log(someData);
                }
            } catch (error) {
                console.error('Error while retrieving user', error);
            }
        })();

    }
    let styles = {};
    if (user.avatar_url !== "" && user.avatar_url !== undefined) {
        styles = { backgroundImage: `url("+user.avatar_url+")` }
    }

    return (
        <div className="account" style={currentTheme}>
            <h1>{user.username}</h1>
            <div
                className="avator"
                ref={avator}
                style={{ ...styles, backgroundImage: `url(${user.avatar_url})` }}>
            </div>
            <input
                ref={avatar_url}
                name="avatar_url"
                placeholder="Avavator Url"
                className="imgUrl" type="text" />
            <input
                ref={email}
                name="email"
                placeholder="Email"
                className="imgUrl" type="text" />
            <input
                ref={username}
                name="username"
                placeholder="username"
                className="imgUrl" type="text" />
            <button style={currentTheme}
                ref={updateUrl}
                onClick={handleUpdate}
                className="updateUrl"
            >Update Profile</button>
            <button style={currentTheme}
                className="uploadUrl"
                onClick={() => {
                    if (!([...document.querySelector('.updateUrl').classList].includes("open"))) {
                        document.querySelectorAll('.imgUrl')
                            .forEach(node => node.classList.add("open"));
                        updateUrl.current.classList.add("open");
                        setuploadText(() => "Close Form");

                    } else {
                        updateUrl.current.classList.remove("open");
                        document.querySelectorAll('.imgUrl')
                            .forEach(node => node.classList.remove("open"));
                        setuploadText(() => "Update Profile");
                    }
                }}
            >{uploadText}</button>
            <table>
                <tbody style={currentTheme}>
                    <tr>
                        <th><h3>Coins</h3></th>
                        <th><h3>Amount</h3></th>
                        <th style={{ maxWidth: "max-content" }}></th>
                        <th></th>
                    </tr>
                    {user.boughtCoins.map(coin =>
                        <BoughtCoincard
                            key={coin.coin}
                            coin={coin}
                            currentTheme={currentTheme}
                            coinData={boughtCoinsData.find(bCoin => bCoin.symbol === coin.coin)}
                        />)}
                </tbody>

            </table>
        </div>
    )
}