import { useNavigate, useParams } from "react-router";
import Coincard from "./Coincard";
import { useThemeContext } from "./context/Theme";

export default function Markets({ allCoins }) {
    const { currentTheme } = useThemeContext();
    const { coinAndPrice } = useParams();
    const navigate = useNavigate();
    let str = "";
    let coinX = "";
    let amountX = "";
    if (coinAndPrice) {
        str = (coinAndPrice.split(".Cur."));
        coinX = str[0];
        amountX = str[1];
    }
    return (
        <div className="markets" style={currentTheme}>
            <div className="title">
                <h1>Today’s Cryptocurrency prices</h1>
                <h3>The global crypto market cap is <strong>$1.86T</strong></h3>
            </div>
            <table className="market-data">
                <tbody style={currentTheme}>
                    <tr>
                        <th>#</th>
                        <th>Symbol</th>
                        <th>Currency</th>
                        <th>24H Change%</th>
                        <th>Market Cap</th>
                        <th>volume Usd 24Hr</th>
                        <th>Explore</th>
                    </tr>
                    {coinAndPrice ?
                        <Coincard coin={allCoins.find(coin => coin.name === coinX)} /> :
                        allCoins.map(coin =>
                            <Coincard
                                key={coin.rank}
                                coin={coin}
                            />)}
                </tbody>

            </table>
            {allCoins.find(coin => coin.name === coinX) && <>
                <button style={currentTheme} onClick={() => { navigate("/trades/" + allCoins.find(coin => coin.name === coinX).symbol+".Cur."+amountX) }}>Proceed</button>
                <p>Click the button above to proceed buying <strong>{coinX}</strong> <br />
                    from a trader</p>
            </>}
        </div>
    )
}