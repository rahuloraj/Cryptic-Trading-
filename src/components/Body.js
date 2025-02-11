import BuyCrypto from './BuyCrypto';
import Markets from './Markets';
import Trades from './Trades';
import Account from './Account';
import Login from "./Login";
import Signup from "./Signup";
import Home from './Home';
import NotLoggedIn from './NotLoggedIn';
import { Routes, Route } from 'react-router-dom';
import { useLoggedInContext } from './context/LoggedInContext';
import CoinBuycard from './CoinBuycard';
import { useEffect, useState } from 'react';
export default function Body() {
    const { loggedIn } = useLoggedInContext();
    const [allCoins, setallCoins] = useState([]);
    const [userData, setuserData] = useState({});
    useEffect(() => {
        fetch("https://api.coincap.io/v2/assets")
            .then(r => r.json())
            .then(result => {
                setallCoins(result.data);
                localStorage.setItem("coins", JSON.stringify(result.data));
            });
    }, [])
    return (

        <div className='content-body' id="body">
            <Routes>
                <Route path="/" element={<Home allCoins={allCoins}/>} />
                <Route path='/buy-crypto' element={loggedIn ? <BuyCrypto allCoins={allCoins} /> : <NotLoggedIn />}>
                    <Route path='/buy-crypto/:coin' element={<CoinBuycard allCoins={allCoins} />} />
                </Route>
                <Route path='/markets' element={ <Markets allCoins={allCoins} />}>
                    <Route path='/markets/:coinAndPrice' />
                </Route>
                <Route path='/trades' element={loggedIn ? <Trades setuserData={setuserData} userData={userData} /> : <NotLoggedIn />}>
                    <Route path='/trades/:coinAndPrice' />
                </Route>
                <Route path='/account' element={loggedIn ? <Account allCoins={allCoins} setuserData={setuserData} userData={userData} /> : <NotLoggedIn />} />

                <Route path='/login' element={<Login setuserData={setuserData}/>} />
                <Route path='/signup' element={<Signup />} />
            </Routes>
        </div>
    )
}