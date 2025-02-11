import { useNavigate } from "react-router";

export default function BoughtCoincard({ coin, currentTheme, coinData }) {
    const navigate = useNavigate();
    return (
        <tr>
            <td>{coin.coin}</td>
            <td>{parseFloat(coin.amount)}</td>
            {parseFloat(coin.amount) > 0 && <td onClick={() => { navigate("/trades/" + coin.coin + ":sell") }} className="sell" style={currentTheme}>Sell</td>}
            <td onClick={() => { navigate("/buy-crypto/" + coinData.name) }} className="buy" style={currentTheme}>Buy</td>
        </tr >
    )
}