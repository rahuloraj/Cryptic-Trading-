import { useThemeContext } from "./context/Theme"
import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import Parse from 'parse';

let randomUser = "";

randomUser = makeUser(32);

function makeUser(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}
export default function Trades({ userData, setuserData }) {
    const { currentTheme } = useThemeContext();
    const { coinAndPrice } = useParams();
    const [totalBuy, setTotalBuy] = useState(0);
    let str = "";
    let coinX = "";
    let amountX = "";
    let action = "";



    if (coinAndPrice) {
        if (coinAndPrice.includes(".Cur.")) {
            str = (coinAndPrice.split(".Cur."));
            coinX = str[0];
            amountX = str[1];
        } else {
            str = (coinAndPrice.split(":"));
            coinX = str[0];
            action = str[1]
        }
    }
    const [coinSell, setcoinSell] = useState(0);

    let coinAv = () => {
        if (!JSON.parse(localStorage.getItem("user")).boughtCoins.find(bCoin => bCoin.coin === coinX)) {
            localStorage.setItem("user", JSON.stringify({
                ...JSON.parse(localStorage.getItem("user")),
                'boughtCoins': [...JSON.parse(localStorage.getItem("user")).boughtCoins.filter(bCoin => bCoin.coin.toString() !== coinX.toString())
                    , { "coin": coinX, "amount": 0 }]
            }));
            return (0);
        }
        else
            return (JSON.parse(localStorage.getItem("user")).boughtCoins.find(bCoin => bCoin.coin === coinX).amount)
    }
    let coinLooked = JSON.parse(localStorage.getItem("coins")).find(coinA => coinA.symbol === coinX);
    function calc(e) {
        setcoinSell(() => parseFloat(e.target.value))
        setTotalBuy(() => parseFloat(e.target.value) * parseFloat(coinLooked.priceUsd));
    }
    const navigate = useNavigate();

    function handleCoinsUpdate() {

        let rem = action !== "" ? (parseFloat(coinAv()) - coinSell) : (parseFloat(coinAv()) + coinSell);
        // coinSell > coinAv ? alert("Maximum number you can sell is " + coinAv) : alert("You are remaining with " + parseFloat(rem) + " " + coinX);
        if (rem >= 0 &&coinSell > 0 &&rem !== parseFloat(coinAv())) {
            Parse.initialize(
                '6x0wgYd99Tukds3wL4FVeUIR3LG3MuVAMWmjUFsI', // This is your Application ID
                'puLScGf62dABq7n5OGKI0biH0tMPFMWZQIT5Nvxk', // This is your Javascript key
                'gZuYmhXEsEoPIzPNsuNtAa7m21knsAFKxsXz1nKz' // This is your Master key (never use it in the frontend)
            );
            //Point to Back4App Parse API address 
            Parse.serverURL = 'https://parseapi.back4app.com';
            (async () => {
                const User = new Parse.User();
                const query = new Parse.Query(User);

                try {
                    // Finds the user by its ID
                    let user = await query.get(Object.keys(JSON.parse(localStorage.getItem("user")).ACL)[1]);
                    // Updates the data we want
                    user.set('boughtCoins', [...JSON.parse(localStorage.getItem("user")).boughtCoins.filter(bCoin => bCoin.coin !== coinX)
                        , { "coin": coinX, "amount": rem }]);
                    try {
                        // Saves the user with the updated data
                        let response = await user.save();
                        console.log('Updated user', response);
                        localStorage.setItem("user", JSON.stringify({
                            ...JSON.parse(localStorage.getItem("user")),
                            'boughtCoins': [...JSON.parse(localStorage.getItem("user")).boughtCoins.filter(bCoin => bCoin.coin.toString() !== coinX.toString())
                                , { "coin": coinX, "amount": rem }]
                        }));
                        navigate('/account');
                    } catch (error) {
                        console.error('Error while updating user', error);
                    }
                } catch (error) {
                    console.error('Error while retrieving user', error);
                }
            })();
        }
        else {
            alert("You can't sell more than the availble coins in your wallet, zero,\n Or a negative amount.\n:)")
        }
    }
    return (
        <div className="trades" style={currentTheme}>
            <h1>{action !== "" ? "Sell" : "Buy"} {coinAndPrice && coinX} Cryptocurrency</h1>
            {coinAndPrice ?
                <>
                    <p>{action !== "" ? "Sell" : "Buy"} {amountX + " " + coinX} {action !== "" ? "to" : "from"} {coinAndPrice && randomUser}</p>
                    <input type="number" onChange={calc} placeholder={coinX} />
                    <p>$ {parseFloat(totalBuy).toFixed(2) > 0 ? parseFloat(totalBuy).toFixed(2) : 0}</p>
                    <button style={currentTheme} onClick={handleCoinsUpdate}>{action !== "" ? "Sell" : "Buy"}</button>
                </> :
                <p>There are no traders avilable for now.<br />Come back later :)</p>
            }
        </div>
    )
}