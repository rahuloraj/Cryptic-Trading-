import { useThemeContext } from "./context/Theme"
import { TiChartPie } from 'react-icons/ti'
import { RiLock2Line } from 'react-icons/ri'
import { AiOutlineMobile } from 'react-icons/ai';
import { SiBitcoincash } from 'react-icons/si';
import { BsEmojiAngry, BsEmojiExpressionless, BsFillEmojiSunglassesFill, BsEmojiHeartEyes } from 'react-icons/bs';
import { useNavigate } from "react-router";
import { useLoggedInContext } from "./context/LoggedInContext";

export default function Home({ allCoins }) {
    const { currentTheme } = useThemeContext();
    const { loggedIn } = useLoggedInContext();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    let userNameHolder = "Esther Howard";
    let userEmailHolder = "estherhoward01@gmail.com";
    let imageUrl = "https://rockiereact.surielementor.com/static/media/user.50ae0b5cba24500443ed.jpg"
    let totalAm = loggedIn && (localStorage.getItem("user")) && allCoins.length!==0 && user.boughtCoins.reduce((total, bCoin) => total +
        parseFloat(bCoin.amount * allCoins.find(coin => coin.symbol === bCoin.coin).priceUsd), 0);
    let totalPer = loggedIn && (localStorage.getItem("user")) && allCoins.length!==0 && user.boughtCoins.reduce((total, bCoin) => total +
        parseFloat(allCoins.find(coin => coin.symbol === bCoin.coin).changePercent24Hr), 0) / user.boughtCoins.length;
    if (localStorage.getItem("user") !== null) {
        userNameHolder = user.username;
        userEmailHolder = user.email;
        imageUrl = user.avatar_url;
    }
    return (
        <div style={currentTheme} className="home">
            <div className="start-trading">
                <h1>Learn, buy & sell crypto easily</h1>
                <div>
                    <p>Crypto-Trade is the easiest place to buy and sell cryptocurrency.<br />
                        Sign up and get started today.
                    </p>
                    <button onClick={() => navigate(loggedIn ? "/buy-crypto" : "/login")}>{loggedIn ? "Buy" : "Start trading"}</button>
                </div>
                <img src="https://rockiereact.surielementor.com/static/media/banner-03.e73e194292317d284a55.png" alt="crypto-trade handshake" />
            </div>
            <div className="crypto-main">
                <div className="why-content">
                    <h1>Why Crypto-Trade</h1>
                    <p>Crypto-Trade has a variety of features that <br />
                        make it the best place to start trading</p>
                    <ul>
                        <li>
                            <div className="icon-div">
                                <TiChartPie fontSize={"3rem"} color={"pink"} /></div>
                            <div className="why-content">
                                <h3>Recurring buys</h3>
                                <p>Invest In Cryptocurrency Slowly Over Time By<br />
                                    Scheduling Buys Daily, Weekly, Or Monthly.</p>
                            </div>
                        </li>
                        <li>
                            <div className="icon-div">
                                <RiLock2Line fontSize={"3rem"} color={"rgb(80, 25, 100)"} /></div>
                            <div className="why-content">
                                <h3>Manage your portfolio</h3>
                                <p>Buy And Sell Popular Digital Currencies, Keep<br />
                                    Track Of Them In One Place.</p>
                            </div>
                        </li>
                        <li>
                            <div className="icon-div">
                                <AiOutlineMobile fontSize={"3rem"} color={"rgb(1, 78, 245)"} /></div>
                            <div className="why-content">
                                <h3>Mobile apps</h3>
                                <p>Stay On Top Of The Markets With The Cryptolly<br /> App For Android Or IOS.</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="crypto-experience">
                    <div className="experience" style={currentTheme}>
                        <p><small>How was your experience?</small></p>
                        <div className="emojis">
                            <BsEmojiAngry className="emoji" />
                            <BsEmojiExpressionless className="emoji" />
                            <BsFillEmojiSunglassesFill className="emoji" />
                            <BsEmojiHeartEyes className="emoji" />
                        </div>
                    </div>
                    <div className="user-card">
                        <div className="info">
                            <img src={imageUrl} style={{ width: "100px", height: "auto", borderRadius: "100px" }} alt="userAvater" />
                            <p>{userNameHolder}<br /><small>{userEmailHolder}</small></p>
                            <div className="portfolio">
                                <h2>Portfolio</h2>
                                <SiBitcoincash className="btc-icon" />
                                <p><small>Balance</small></p>
                                <h3><strong>{loggedIn && allCoins.length!==0 ? totalAm.toFixed(2) : "$2,509.75"}</strong>
                                </h3><small className="percent">{loggedIn && allCoins.length!==0 ? totalPer.toFixed(4) : "+9.77%"}</small>
                                <button onClick={() => navigate(loggedIn ? "/buy-crypto" : "/login")}>Buy More</button>
                                <button onClick={() => navigate(loggedIn ? "/account" : "/login")}>Sell</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div></div>
        </div>
    )
}