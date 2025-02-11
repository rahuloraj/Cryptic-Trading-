<body style="background-color:rgba(7,25,255,0.324)">
<h1>CRYPTO-TRADING-APP</h1>
<img src='./public/Screenshot from 2022-10-08 02-04-2402.png' style="border-radius:0.5rem"/>
<h2>Introduction</h2>
<p>Trading in cryptocurrencies has its pros and cons. A major pro, is <a href="https://byjus.com/current-affairs/cryptocurrency/" >funds transfer between two parties will be easy without the need of third party like credit/debit cards or banks.</a></p>
<p>But this comes with one minor problem.</p>

<h2>Problem Statement</h2>
<p>Learning how to use it, and navigate. You have to keep track of all your wallets. If you want to buy at a lower price and sell at a higher price, you have to monitor how the coin is doing in market. This might require you to visit some platforms like <a href="https://coinmarketcap.com/">CoinMarketCap</a>, or <a>CoinGecko</a>. Then buy coins on an exchange platform.</p>
<p>The exchange platforms can be too complex if you are just starting out. Creating wallets for the different  coins you are going to hold and tracking from which wallet you are adding to or removing from can be challenging. It being difficult to reverse a transaction on a blockchain, one has to be extra careful when inputting the wallet that they want to send to. Sometimes, it is difficult to find a seller or a buyer for your specific coin.</p>

<h2>Solution</h2>
<p>A platform that will simplify wallet management, finding buyers and sellers for various coins and have access to coin prices.</p>

<h2>MVP</h2>
<ul>
<li>Home component that all users will view. It is personalized if the user is logged in.</li>
<li>A Login component for registered users</li>
<li>A Register/Sign-up component for unregistered users.</li>
<li>A simple navigation component
<ul><li>The navigation is different for logged in users and for logged out users.</li>
</ul></li>
<li>A Table to show the different prices of various coin in the market.</li>
<li>One or two components for selling or buying coins.</li>
</ul>

<h2>Technologies</h2>
<ul>
<li><strong>React</strong></li>
<li><strong>React-Router-Dom</strong></li>
<li><strong>JSX</strong></li>
<li>Plus, <strong>Vanilla Java Script</strong></li>
</ul>
<h2>APIs</h2>
<ul>
<li><a href="https://docs.coincap.io/">Capcoin</a> : a useful tool for real-time pricing and market activity for over 1,000 cryptocurrencies</li>
<li><a href="https://www.back4app.com/">Back4App</a> : Back4App lets you quickly connect the front and backend, regardless
of what language was used in your frontend. Used to store user data.
less code.</li>
</ul>
<h1>Application Manual</h1>
<span>How To Use It</span>
<ul>
<li><a href="https://drive.google.com/file/d/1bw-vjR5LaxkzqnS5BUXUZFj4cW2vQu9R/view?usp=sharing" target=" _blank"><strong>Video Guide</strong></a></li>
</body>
  
https://user-images.githubusercontent.com/105742325/194704252-f6c28ed1-7ad3-4300-97fc-89885ad6b170.mp4
  
  
<body>
<li><stron>Choose between <em>Light Theme</em> and <em>Dark Theme</em> in the menu</strong>
</li>
<li><strong>Create an account</strong><ul><li>You will be taken to the home page after creating the account.</li></ul></li>
<li><strong>Login to your account</strong><ul>
<li>You can customize your profile picture url, email and username at this point by clicking on the <em>Update Profile</em> button.</li>
</ul></li>
<li>You can buy any of the available currencies in the <strong>Buy Crypto</strong> section.</li>
<li>The <strong>Market</strong> section will show the current market cap, change in the last 24 hrs and the volume used for the cryptocurrencies ranked above 101.</li>
<li>Lastly, the <strong>Trades</strong> section is where the <em>math</em> happens. It will show <i>"There are no traders available for now.
Come back later :)"</i>, when you are not buying or selling crypto.<br/>
Go to Account/Buy Crypto section and buy crypto. 
</li>
</ul>
<h1>Issues</h1>
<li><strong>Email Verification</strong>
<ul><li>A user can input an invalid email</li>
<li><strong>Solution</strong>: Have the App send a email verification to email on sign up.</li>
</ul>
</li>
</li>
<h1>Extra Features</h1>
<li>Viewing amount in Dollars in the home page after logging in.</li>
<li>Viewing average percent change for all coins ever held.</li>
</body>