import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useThemeContext } from "./context/Theme";
export default function CoinBuycard({ allCoins }) {
    const { coin } = useParams();
    const [totalBuy, setTotalBuy] = useState(0);
    const navigate = useNavigate();
    const { currentTheme } = useThemeContext();
    const coinLooked = allCoins.find(coinInAll => coinInAll.name === coin);
    function calc(e) {
        setTotalBuy(() => parseFloat(e.target.value) * parseFloat(coinLooked.priceUsd));
    }
    return (
        <div>
            {coinLooked ?
                <div className="coinCard" style={currentTheme}>
                    <h2>{coin}</h2>
                    <p>Change in 24Hrs {parseFloat(coinLooked.changePercent24Hr).toFixed(4)}</p>
                    <p>$ {parseFloat(coinLooked.priceUsd).toFixed(2)} per 1 {coinLooked.symbol}<small></small></p>
                    <input type="number" onChange={calc} />
                    <p>$ {parseFloat(totalBuy).toFixed(2) > 0 ? parseFloat(totalBuy).toFixed(2) : 0}</p>
                    <button onClick={() => { totalBuy !== "" && totalBuy > 0 && navigate("/markets/"+coinLooked.name+".Cur."+totalBuy/parseFloat(coinLooked.priceUsd)) }} style={currentTheme}>Buy</button>
                </div> :
                <div className="coinCard">
                    <h3>Sorry,</h3>
                    <p>couldn't find a coin by that name</p>
                </div>}
        </div>
    );
}