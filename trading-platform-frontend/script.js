// API and requests

function get(url) {
	return fetch(url).then(response => response.json());
}

function post(url, data) {
	return fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify(data),
	}).then(response => response.json());
}

const API = { get, post };

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
const tableBody = document.querySelector("tbody");
const chartContainer = document.querySelector("#chart-container");
const tradesLogContainer = document.querySelector("#trades-log-container");
const availableDates = [
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
];

let activeUser = {};
let activeGame = {};

let totalProfit = 0

// CREATE NEW GAME

function showHomeScreen() {
	chartContainer.innerText = "";
	tradesLogContainer.innerText = "";

	h1.innerText = "Welcome to Fence Alley";

	let newGameForm = document.createElement("form");
	newGameForm.id = "start-game";
	newGameForm.addEventListener("submit", handleFormSubmission);

	let usernameLabel = document.createElement("label");
	usernameLabel.setAttribute("for", "username");
	usernameLabel.innerText = "My name is ";

	let usernameInput = document.createElement("input");
	usernameInput.setAttribute("type", "text");
	usernameInput.setAttribute("name", "username");
	usernameInput.id = "username";

	let companyLabel = document.createElement("label");
	companyLabel.setAttribute("for", "company");
	companyLabel.innerText = " and I want to trade on ";

	let companyInput = document.createElement("input");
	companyInput.setAttribute("type", "text");
	companyInput.setAttribute("name", "company");
	companyInput.id = "company";

	let submitButton = document.createElement("button");
	submitButton.setAttribute("type", "submit");
	submitButton.id = "start-button";
	submitButton.innerText = "Start Trading";

	newGameForm.append(
		usernameLabel,
		usernameInput,
		companyLabel,
		companyInput,
		submitButton,
	);
	chartContainer.appendChild(newGameForm);

	let h2 = document.createElement("h2");
	h2.innerText = "Leaderboard";

	let leaderboardTable = document.createElement("table");
	leaderboardTable.id = "leaderboard";
	leaderboardTable.className = "table table-hover";

	let tableHead = document.createElement("thead");
	tableHead.className = "table-active";

	let tableRow = document.createElement("tr");

	let usernameColumn = document.createElement("th");
	usernameColumn.setAttribute("scope", "col");
    usernameColumn.innerText = "Username";
    
    let companyColumn = document.createElement("th");
	companyColumn.setAttribute("scope", "col");
	companyColumn.innerText = "Company";

	let scoreColumn = document.createElement("th");
	scoreColumn.setAttribute("scope", "col");
	scoreColumn.innerText = "Score";

	tableRow.append(usernameColumn, companyColumn, scoreColumn);
	tableHead.appendChild(tableRow);

	let tableBody = document.createElement("tbody");

	leaderboardTable.append(tableHead, tableBody);
	tradesLogContainer.append(h2, leaderboardTable);

	fillUpLeaderboard();
}

function fillUpLeaderboard() {
	API.get(USERS_URL).then(response => {
		let users = response;
		API.get(GAMES_URL).then(response => {
			let games = response;
			let top10games = games.sort((g1, g2) => g2.score - g1.score).slice(0, 10);

			top10games.forEach(game => {
				let tr = document.createElement("tr");
				let usernameTd = document.createElement("td");

				let gameUser = users.find(user => user.id === game.user_id);
				usernameTd.innerText = gameUser.username;
				let companyTd = document.createElement("td");
				companyTd.innerText = game.company;
				let scoreTd = document.createElement("td");
				scoreTd.innerText = game.score;
				tr.append(usernameTd, companyTd, scoreTd);
				document.querySelector("tbody").appendChild(tr);
			});
		});
	});
}

showHomeScreen();

function handleFormSubmission() {
	event.preventDefault();
	let username = event.target.username.value;
	let company = event.target.company.value;
	API.post(USERS_URL, { user: { username } })
		.then(response => {
			activeUser = response;
			API.post(GAMES_URL, { game: { user_id: activeUser.id, company } }).then(
				response => {
					activeGame = response;
				},
			);
		})
		.then(createGame(username, company));
}

function createGame(username, company) {
	h1.innerText = `${username} is now trading ${company}!`;
	document.querySelector("h2").innerText = "Trades Log";
	document.querySelector("#start-game").remove();
	document.querySelector("#leaderboard").remove();
	displayBoard();
	createTradesLog();

	playGame(username, company);
}

function displayBoard() {
	let chartDiv = document.createElement("div");
	chartDiv.id = "chart";

	let priceSpan = document.createElement("span");
	priceSpan.id = "current-price";
	priceSpan.innerText = 100;

	let orderButton = document.createElement("button");
	orderButton.id = "order-button";
	orderButton.innerText = "BUY";

	chartContainer.append(chartDiv, priceSpan, orderButton);
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
	let currentDate = "January 2020";
	let buyPrice;
	let sellPrice;
	let annotations = { points: [] };

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
			categories: availableDates,
		},
		yaxis: {
			min: 0,
			max: 200,
		},
		annotations: { points: [] },
	};

	let chart = new ApexCharts(document.querySelector("#chart"), options);

	let count = 1;

	// GROWING CHART

	function addNextDatapoint() {
		currentDate = availableDates[count];
		let change =
			Math.random() > 0.5
				? Math.floor(Math.random() * 10) + 1
				: -Math.floor(Math.random() * 10);
		currentPrice = startData[count - 1] + change;
		document.querySelector("#current-price").innerText = `$${currentPrice} `;
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
			if (holdingStock) {
				handleOrder();
			}

<<<<<<< HEAD
            orderButton.remove();
            
            // submitFinalScore(calculateFinalScore());

			setTimeout(function() {
                alert(`You made a profit of ${calculateFinalScores().userProfit}\n
                The market made a profit of ${calculateFinalScores().marketProfit}\n
                Your final score is ${calculateFinalScores().finalScore}!`);
=======
			orderButton.remove();
			document.querySelector("#current-price").remove();

			setTimeout(function() {
				alert("");
>>>>>>> joaquin
				showHomeScreen();
			}, 0);
		}
	}

	let graphTimer = setInterval(addNextDatapoint, 20); // speed

	chart.render();
	graphTimer;

	// HANDLE BUY AND SELL

	orderButton.addEventListener("click", handleOrder);

	function handleOrder() {
        // change to pessimistic rendering?
		let tradeLi = document.createElement("li");
<<<<<<< HEAD
		tradeLi.innerText = `${orderButton.innerText} @ ${currentPrice}`;
        tradesLog.append(tradeLi);
        
        let order = orderButton.innerText
        let price = currentPrice
        // let date = currentDate
        let game_id = activeGame.id
        let tradeData = {trade: {order, price, game_id}} // + date
        API.post(TRADES_URL, tradeData)
        .then(console.log) // add to trades log
=======
		tradeLi.innerText = `${currentDate}: ${orderButton.innerText} @ ${currentPrice}`;
		tradesLog.append(tradeLi);

		let order = orderButton.innerText;
		let price = currentPrice;
		let game_id = activeGame.id;
		let tradeData = { trade: { order, price, game_id } };
		API.post(TRADES_URL, tradeData);

		chart.addPointAnnotation({
			x: count,
			y: currentPrice,
			marker: {
				size: 6,
				fillColor: "#fff",
				strokeColor: "#2698FF",
				radius: 2,
			},
			label: {
				borderColor: "#2698FF",
				offsetY: 0,
				style: {
					color: "#2698FF",
				},

				text: `${orderButton.innerText} @ ${currentPrice}`,
			},
		});
>>>>>>> joaquin

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
    
    updateTotalProfit = () => {
        let totalBuys = buyPricesList.reduce((a, b) => a + b);
        let totalSales = sellPricesList.reduce((a, b) => a + b);
        totalProfit = totalSales - totalBuys
        return totalProfit
    }

	updateTotalProfitDisplay = () => {
		totalProfitDisplay.innerText = `Total profit $${updateTotalProfit()}`;
    };
    
    calculateFinalScores = () => {
        let finalPrice = currentPrice
        let marketProfit = finalPrice - 100
        let userProfit = updateTotalProfit()
        let finalScore = userProfit - marketProfit
        let finalScores = {userProfit, marketProfit, finalScore}
        return finalScores
    }

    // submitFinalScore = score => {

    // }
}
