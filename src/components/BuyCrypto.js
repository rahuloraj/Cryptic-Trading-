import { Outlet, useParams, useNavigate } from "react-router";
import { useThemeContext } from "./context/Theme";

export default function BuyCrypto({ allCoins }) {
    const { currentTheme } = useThemeContext();
    const { coin } = useParams();
    const navigate = useNavigate();
    return (
        <div className="buy-crypto" style={currentTheme}>
            <h2>Buy Crpto</h2>
            {coin !== undefined ?
                <Outlet /> :
                <div className="all-coins-container">
                    {allCoins.map(coin =>
                        <div key={coin.id} className="coin-container">
                            <button style={currentTheme}
                                onClick={() => { navigate('./' + coin.name); }}>
                                {coin.symbol}
                            </button>
                        </div>
                    )}
                </div>
            }
        </div>
    )
}