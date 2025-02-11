import { useThemeContext } from "./context/Theme"

export default function Coincard({ coin }) {
    const { currentTheme } = useThemeContext();
    const changePercent = parseFloat(coin.changePercent24Hr).toFixed(2);
    return (
        <tr style={currentTheme}>
            <td>{coin.rank}</td>
            <td>{coin.symbol}</td>
            <td>{coin.name}</td>
            <td style={changePercent > 0 ? { foreground: "rgb(6, 173, 0)" } : { foreground: "rgb(173, 0, 0)" }}
            >{changePercent}</td>
            <td>{(parseInt(coin.marketCapUsd) / 1000000000).toFixed(2)} B(USD)</td>
            <td>{(parseInt(coin.volumeUsd24Hr) / 1000000000).toFixed(2)} B(USD)</td>
            <td className="explore"><a href={coin.explorer} target=" _blank" >Explore</a></td>
        </tr>
    )
}