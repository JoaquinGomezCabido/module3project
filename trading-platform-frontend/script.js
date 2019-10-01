// API and requests

function get(url) {
    return fetch(url)
    .then(response => response.json())
}

function post(url, data) {
	return fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify(data),
	})
		.then(response => response.json())
}

const API = {get, post };

let practiceUserData = { user: { username: "olib" } };
let practiceGameData = {
	game: {
		user_id: 1,
		company: "Flatiron",
		score: 40,
		user_profit: 140,
		market_profit: 100,
	},
};
let practiceTradeData = { trade: { order: "buy", price: 90 } };
let practiceTradeData2 = { trade: { order: "sell", price: 140 } };

// CONSTANTS

const USERS_URL = "http://localhost:3000/users/";
const GAMES_URL = "http://localhost:3000/games/";
const TRADES_URL = "http://localhost:3000/trades/";

const h1 = document.querySelector("h1");
const h2 = document.querySelector("h2");
const newGameForm = document.querySelector("#start-game");
const leaderboard = document.querySelector("#leaderboard");
const tableBody = document.querySelector("tbody");
const chartContainer = document.querySelector("#chart-container");
const tradesLogContainer = document.querySelector("#trades-log-container");

let activeUser = {}
let activeGame = {}

// CREATE NEW GAME

newGameForm.addEventListener("submit", handleFormSubmission);
const fillUpLeaderboardButton = document.querySelector("button#fill-leaderboard-button")
fillUpLeaderboardButton.addEventListener("click", fillUpLeaderboard)

function fillUpLeaderboard() {
    // let users = API.get(USERS_URL)
    // .then ...
    API.get(GAMES_URL)
    .then(response => response.forEach(game => {
        let tr = document.createElement("tr");
        let usernameTd = document.createElement("td");
        // usernameTd.innerText = game.user.username;
        let scoreTd = document.createElement("td");
        scoreTd.innerText = game.score;
        tr.append(usernameTd, scoreTd);
        tableBody.appendChild(tr);
    }))
}

function handleFormSubmission() {
	event.preventDefault();
    let username = event.target.username.value;
    let company = event.target.company.value;
    API.post(USERS_URL, {user: {username}})
    .then(response => {
        activeUser = response
        API.post(GAMES_URL, {game: {user_id: activeUser.id, company}})
        .then(response => {
            activeGame = response
        })
    })
	.then(createGame(username, company));
}

function createGame(username, company) {
	h1.innerText = `${username} is now trading ${company}!`;
	h2.innerText = "Trades Log";
	newGameForm.remove();
	leaderboard.remove();
	displayBoard();
	createTradesLog();

	playGame(username, company);
}

function displayBoard() {
	let chartDiv = document.createElement("div");
	chartDiv.id = "chart";

	let orderButton = document.createElement("button");
	orderButton.id = "order-button";
	orderButton.innerText = "BUY";

	chartContainer.append(chartDiv, orderButton);
}

function createTradesLog() {
	let tradesLogUl = document.createElement("ul");
	tradesLogUl.id = "trades-log";

	let profitsContainer = document.createElement("div");
	profitsContainer.id = "profits-container";

	let liveProfilDisplay = document.createElement("div");
	liveProfilDisplay.id = "live-profit-display";

	let totalProfitDisplay = document.createElement("div");
	totalProfitDisplay.id = "total-profit-display";

	profitsContainer.append(liveProfilDisplay, totalProfitDisplay);
	tradesLogContainer.append(tradesLogUl, profitsContainer);
}

function playGame(username, company) {
	// CONSTANTS

	const orderButton = document.querySelector("#order-button");

	let currentPrice = 100;
	let startData = new Array(60).fill(100);
	let buyPrice;
	let sellPrice;

	let buyPricesList = [];
	let sellPricesList = [];

	const tradesLog = document.querySelector("#trades-log");
	const liveProfitDisplay = document.querySelector("div#live-profit-display");
	const totalProfitDisplay = document.querySelector("div#total-profit-display");

	let holdingStock = false;

	// CHART

	let options = {
		chart: {
			height: 600,
			type: "line",
			zoom: {
				enabled: false,
			},
			animations: {
				enabled: true,
				speed: 100,
				dynamicAnimation: {
					enabled: true,
				},
			},
		},
		series: [
			{
				name: company,
				data: startData.fill(null, 1),
			},
		],
		dataLabels: {
			enabled: false,
		},
		stroke: {
			curve: "straight",
		},
		title: {
			text: company,
			align: "left",
		},
		grid: {
			row: {
				colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
				opacity: 0.5,
			},
		},
		xaxis: {
			categories: [
				"January 2020",
				"February 2020",
				"March 2020",
				"April 2020",
				"May 2020",
				"June 2020",
				"July 2020",
				"August 2020",
				"September 2020",
				"October 2020",
				"November 2020",
				"December 2020",
				"January 2021",
				"February 2021",
				"March 2021",
				"April 2021",
				"May 2021",
				"June 2021",
				"July 2021",
				"August 2021",
				"September 2021",
				"October 2021",
				"November 2021",
				"December 2021",
				"January 2022",
				"February 2022",
				"March 2022",
				"April 2022",
				"May 2022",
				"June 2022",
				"July 2022",
				"August 2022",
				"September 2022",
				"October 2022",
				"November 2022",
				"December 2022",
				"January 2023",
				"February 2023",
				"March 2023",
				"April 2023",
				"May 2023",
				"June 2023",
				"July 2023",
				"August 2023",
				"September 2023",
				"October 2023",
				"November 2023",
				"December 2023",
				"January 2024",
				"February 2024",
				"March 2024",
				"April 2024",
				"May 2024",
				"June 2024",
				"July 2024",
				"August 2024",
				"September 2024",
				"October 2024",
				"November 2024",
				"December 2024",
				"January 2025",
				"February 2025",
				"March 2025",
				"April 2025",
				"May 2025",
				"June 2025",
				"July 2025",
				"August 2025",
				"September 2025",
				"October 2025",
				"November 2025",
				"December 2025",
			],
		},
		yaxis: {
			min: 0,
			max: 200,
		},
	};

	let chart = new ApexCharts(document.querySelector("#chart"), options);

	let count = 1;

	// GROWING CHART

	function addNextDatapoint() {
		let change =
			Math.random() > 0.5
				? Math.floor(Math.random() * 10) + 1
				: -Math.floor(Math.random() * 10);
		currentPrice = startData[count - 1] + change;
		startData[count] = currentPrice;
		chart.updateSeries([
			{
				data: startData,
			},
		]);
		if (holdingStock) {
			updateLiveProfitDisplay();
		}

		count++;
		if (count == 60) {
			clearInterval(graphTimer);
		}
	}

	let graphTimer = setInterval(addNextDatapoint, 1); // speed

	chart.render();
	graphTimer;

	// HANDLE BUY AND SELL

	orderButton.addEventListener("click", handleOrder);

	function handleOrder() {
		let tradeLi = document.createElement("li");
		tradeLi.innerText = `${orderButton.innerText} @ ${currentPrice}`;
        tradesLog.append(tradeLi);
        
        let order = orderButton.innerText
        let price = currentPrice
        // let date = currentDate
        let game_id = activeGame.id
        let tradeData = {trade: {order, price, game_id}} // + date
        API.post(TRADES_URL, tradeData)
        .then(console.log)

		orderButton.innerText == "BUY"
			? (orderButton.innerText = "SELL")
			: (orderButton.innerText = "BUY");

		holdingStock = !holdingStock;
		if (holdingStock) {
			// just bought
			buyPrice = currentPrice;
			buyPricesList.push(buyPrice);
		} else {
			// just sold
			sellPrice = currentPrice;
			sellPricesList.push(sellPrice);
			updateTotalProfitDisplay();
			updateLiveProfitDisplay();
		}
	}

	updateLiveProfitDisplay = () => {
		if (holdingStock) {
			liveProfitDisplay.innerText = `Live profit: $${currentPrice - buyPrice}`;
		} else {
			liveProfitDisplay.innerText = `Live profit: no stock held`;
		}
	};

	updateTotalProfitDisplay = () => {
		let totalBuys = buyPricesList.reduce((a, b) => a + b);
		let totalSales = sellPricesList.reduce((a, b) => a + b);
		totalProfitDisplay.innerText = `Total profit $${totalSales - totalBuys}`;
	};
}
