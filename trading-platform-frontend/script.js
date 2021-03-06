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

function patch(url, data) {
	return fetch(url, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify(data),
	}).then(response => response.json());
}

const API = { get, post, patch };

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

const home = document.querySelector("#home");
home.addEventListener("click", showHomeScreen);

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

let leaderboardUsers = [];
let top10bottom5 = [];

let totalProfit = 0;

// predetermined datasets

const weworkData = [100];

for (let index = 1; index < 20; index++) {
	weworkData[index] = weworkData[index - 1] + Math.floor(Math.random() * 9) - 3;
}
for (let index = 20; index < 30; index++) {
	weworkData[index] = weworkData[index - 1] - Math.floor(Math.random() * 9) + 4;
}
for (let index = 30; index < 60; index++) {
	weworkData[index] = weworkData[index - 1] + Math.floor(Math.random() * 4) - 7;
	if (weworkData[index] < 0) {
		weworkData[index] = 0;
	}
}

// CREATE NEW GAME

function showHomeScreen() {
	chartContainer.innerText = "";
	tradesLogContainer.innerText = "";

	h1.innerText = "Welcome to the Street of Wall";

	let breakP1 = document.createElement("br");
	let breakP2 = document.createElement("br");

	let newGameForm = document.createElement("form");
	newGameForm.id = "start-game";
	newGameForm.className = "card card-body";
	newGameForm.addEventListener("submit", handleFormSubmission);

	let usernameLabel = document.createElement("label");
	usernameLabel.setAttribute("for", "username");
	usernameLabel.innerText = "My name is:";

	let usernameInput = document.createElement("input");
	usernameInput.setAttribute("type", "text");
	usernameInput.setAttribute("name", "username");
	usernameInput.className = "form-control";
	usernameInput.setAttribute("required", true);
	usernameInput.id = "username";

	let companyLabel = document.createElement("label");
	companyLabel.setAttribute("for", "company");
	companyLabel.innerText = " and I want to trade on:";

	let companyInput = document.createElement("input");
	companyInput.setAttribute("type", "text");
	companyInput.setAttribute("name", "company");
	companyInput.className = "form-control";
	companyInput.setAttribute("required", true);
	companyInput.id = "company";

	let submitButton = document.createElement("button");
	submitButton.setAttribute("type", "submit");
	submitButton.id = "start-button";
	submitButton.className = "btn btn-primary";
	submitButton.innerText = "Start Trading";

	newGameForm.append(
		usernameLabel,
		usernameInput,
		breakP1,
		companyLabel,
		companyInput,
		breakP2,
		submitButton,
	);
	chartContainer.appendChild(newGameForm);

	let h2 = document.createElement("h2");
	h2.innerText = "Top 10 Scores";
	h2.addEventListener("click", handleH2Click);

	let leaderboardTable = document.createElement("table");
	leaderboardTable.id = "leaderboard";
	leaderboardTable.className = "table table-hover";

	let tableHead = document.createElement("thead");
	tableHead.className = "thead-light";

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

	getAndSortGames();
}

function getAndSortGames() {
	API.get(USERS_URL).then(response => {
		leaderboardUsers = response;
		API.get(GAMES_URL)
			.then(response => {
				let games = response;
				let top10games = games
					.sort((g1, g2) => g2.score - g1.score)
					.slice(0, 10);
				let bottom5games = games
					.sort((g1, g2) => g1.score - g2.score)
					.slice(0, 5);
				top10bottom5 = [top10games, bottom5games];
			})
			.then(a => fillUpLeaderboard(0));
	});
}

function fillUpLeaderboard(index) {
	document.querySelector("tbody").innerText = "";
	top10bottom5[index].forEach(game => {
		let tr = document.createElement("tr");
		let usernameTd = document.createElement("td");

		let gameUser = leaderboardUsers.find(user => user.id === game.user_id);
		usernameTd.innerText = gameUser.username;
		let companyTd = document.createElement("td");
		companyTd.innerText = game.company;
		let scoreTd = document.createElement("td");
		scoreTd.innerText = game.score;
		tr.append(usernameTd, companyTd, scoreTd);
		document.querySelector("tbody").appendChild(tr);
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
			if (company.toLowerCase() !== "wework") 
				{API.post(GAMES_URL, { game: { user_id: activeUser.id, company } }).then(
					response => {
						activeGame = response;
					},
				);}
		})
		.then(createGame(username, company));
}

function handleH2Click() {
	if (event.target.innerText == "Top 10 Scores") {
		document.querySelector("h2").innerText = "Bottom 5 Scores";
		fillUpLeaderboard(1);
	} else if (event.target.innerText == "Bottom 5 Scores") {
		document.querySelector("h2").innerText = "Top 10 Scores";
		fillUpLeaderboard(0);
	}
}

function createGame(username, company) {
	h1.innerText = `${username} is now trading ${company}!`;
	document.querySelector("h2").innerText = "Trades Log";
	document.querySelector("h2").removeEventListener("click", handleH2Click);
	document.querySelector("#start-game").remove();
	document.querySelector("#leaderboard").remove();
	displayBoard();
	createTradesLog();

	playGame(company);
}

function displayBoard() {
	let chartDiv = document.createElement("div");
	chartDiv.id = "chart";

	let controlDiv = document.createElement("div");
	controlDiv.id = "control-div";

	let priceSpan = document.createElement("span");
	priceSpan.id = "current-price";
	// priceSpan.innerText = "";

	let backgroundSound = document.createElement("audio");
	backgroundSound.id = "backgroundSound";
	backgroundSound.src = "sound.wav";
	let cash = document.createElement("audio");
	cash.id = "cash";
	cash.src = "cash.wav";
	let slap = document.createElement("audio");
	slap.id = "slap";
	slap.src = "slap.wav";
	document.querySelector("body").append(backgroundSound, cash, slap);

	let orderButton = document.createElement("button");
	orderButton.id = "order-button";
	orderButton.className = "btn btn-primary";
	orderButton.innerText = "BUY";

	controlDiv.append(priceSpan, orderButton);

	chartContainer.append(controlDiv, chartDiv);
}

function createTradesLog() {
	let tradesLogUl = document.createElement("ul");
	tradesLogUl.id = "trades-log";
	tradesLogUl.className = "card card-body";

	let profitsContainer = document.createElement("div");
	profitsContainer.id = "profits-container";
	profitsContainer.className = "card card-body";

	let liveProfilDisplay = document.createElement("div");
	liveProfilDisplay.id = "live-profit-display";
	liveProfilDisplay.innerText = "Live Profit: $0";

	let totalProfitDisplay = document.createElement("div");
	totalProfitDisplay.id = "total-profit-display";
	totalProfitDisplay.innerText = "Total Profit: $0";

	profitsContainer.append(liveProfilDisplay, totalProfitDisplay);
	tradesLogContainer.append(profitsContainer, tradesLogUl);
}

function playGame(company) {
	// CONSTANTS

	const orderButton = document.querySelector("#order-button");

	let currentPrice = 100;
	let startData = new Array(60).fill(100);
	let currentDate = "January 2020";
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
			height: "75%",
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
			labels: {
				rotate: -90,
				hideOverlappingLabels: true,
				style: {
					fontSize: "10px",
				},
			},
			tickAmount: 30,
		},
		yaxis: {
			min: 0,
			max: 200,
			forceNiceScale: true,
			labels: {
				formatter: function(value) {
					return `$${value}`;
				},
			},
		},
		annotations: { points: [] },
	};

	let chart = new ApexCharts(document.querySelector("#chart"), options);
	setTimeout(function() {
		alert(
			"Almost time to start trading!\nThe markets will open 3 seconds after you place the mouse on the 'BUY' button.\nGET READY!!!!",
		);
	}, 0);

	count = 0;

	// GROWING CHART

	function addNextDatapoint() {
		if (count != 0 && count <= 60) {
			currentDate = availableDates[count];
			if (company.toLowerCase() === "wework") {
				currentPrice = nextPredeterminedPrice(count);
			} else {
				currentPrice = generateNextPrice(startData, count - 1);
			}
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
				if (holdingStock) {
					handleOrder();
				}
				clearInterval(graphTimer);

				document.querySelector("#backgroundSound").remove();

				orderButton.remove();
				document.querySelector("#current-price").remove();

				let finalScores = calculateFinalScores();

				submitFinalScores(finalScores);

				setTimeout(function() {
					alert(`You made a profit of ${finalScores.user_profit}\n
				The market made a profit of ${finalScores.market_profit}\n
				Your final score is ${finalScores.score}!`);
				}, 0);

				let profitsContainer = document.querySelector("#profits-container");

				let marketResult = document.createElement("div");
				marketResult.innerText = `The market made: $${finalScores.market_profit}`;

				let scoreResult = document.createElement("div");
				scoreResult.style.color = finalScores.score >= 0 ? "green" : "red";
				scoreResult.innerText = `Your final score is: ${finalScores.score}`;

				// result gif
				let resultGifDiv = document.createElement("div");
				let resultGif = document.createElement("img");
				let winningGifs = [
					"https://media.giphy.com/media/wC4P0yFYqjXhK/giphy.gif",
					"https://media.giphy.com/media/sQBkCTTrJRLSE/giphy.gif",
					"https://media.giphy.com/media/LdOyjZ7io5Msw/giphy.gif",
				];
				let lowProfitWinGif =
					"https://media.giphy.com/media/PyZEkItObZrnW/giphy.gif";
				let okGif = "https://media.giphy.com/media/DfdbTJZx6Yjra/giphy.gif";
				let bigProfitMinusScoreGif =
					"https://media.giphy.com/media/94EQmVHkveNck/giphy.gif";
				let lowProfitMinusScoreGif =
					"https://media.giphy.com/media/qi8Yhj4pKcIec/giphy.gif";
				let minusProfitPositiveScoreGif =
					"https://media.giphy.com/media/MRxJqmk3MNta8/giphy.gif";
				let loseGif = "https://media.giphy.com/media/yIxNOXEMpqkqA/giphy.gif";

				let uProfit = finalScores.user_profit;
				let score = finalScores.score;

				if (uProfit > 10 && score >= 0) {
					resultGif.src =
						winningGifs[Math.floor(Math.random() * winningGifs.length)];
				} else if (uProfit <= 10 && uProfit > 0 && score > 10) {
					resultGif.src = lowProfitWinGif;
				} else if (uProfit <= 10 && uProfit > 0 && (score < 10 && score >= 0)) {
					resultGif.src = okGif;
				} else if (uProfit > 15 && score < 0) {
					resultGif.src = bigProfitMinusScoreGif;
				} else if (uProfit < 15 && uProfit > 0 && score < 0) {
					resultGif.src = lowProfitMinusScoreGif;
				} else if (uProfit < 0 && score > 0) {
					resultGif.src = minusProfitPositiveScoreGif;
				} else {
					resultGif.src = loseGif;
				}
				resultGif.style.maxWidth = "100%";
				resultGifDiv.append(resultGif);

				profitsContainer.append(marketResult, scoreResult, resultGifDiv);
				return options;
			}
		} else {
			orderButton.addEventListener("click", handleOrder);
			currentDate = availableDates[count];
			currentPrice = 100;
			document.querySelector("#current-price").innerText = `$${currentPrice} `;
			startData[count] = currentPrice;
			count++;
		}
	}

	function handleBackCount() {
		orderButton.removeEventListener("mouseenter", handleBackCount);
		document.querySelector("#backgroundSound").play();
		let counter = 3;
		let backCount = setInterval(() => {
			document.querySelector(
				"#current-price",
			).innerText = `The markets will open in: ${counter}!`;
			counter--;
			if (counter == 0) {
				clearInterval(backCount);
				startGraphUpdates();
			}
		}, 1000);

		backCount;
	}

	function startGraphUpdates() {
		graphTimer = setInterval(addNextDatapoint, 500); // speed
		graphTimer;
	}

	chart.render();

	// HANDLE BUY AND SELL

	orderButton.addEventListener("mouseenter", handleBackCount);

	let orderNo = 1;

	function handleOrder() {
		let tradeLi = document.createElement("li");
		tradeLi.id = `trade-${orderNo}`;
		tradeLi.setAttribute("price", currentPrice);
		tradeLi.innerText = `${currentDate}: ${orderButton.innerText} @ $${currentPrice}`;
		tradesLog.append(tradeLi);
		if (!holdingStock) {
			// buy
			tradeLi.style.color = "gray";
		} else {
			// sell
			let associatedBuyLi = document.querySelector(`li#trade-${orderNo - 1}`);
			if (currentPrice > parseInt(associatedBuyLi.attributes.price.value)) {
				// positive buy/sell pair
				tradeLi.style.color = "green";
				associatedBuyLi.style.color = "green";
				document.querySelector("#cash").play();
			} else if (
				currentPrice === parseInt(associatedBuyLi.attributes.price.value)
			) {
				// break even
				tradeLi.style.color = "gray";
				associatedBuyLi.style.color = "gray";
			} else {
				tradeLi.style.color = "red";
				associatedBuyLi.style.color = "red";
				document.querySelector("#slap").play();
			}
			let separatorLi = document.createElement("li");
			separatorLi.innerText = "-";
			tradesLog.append(separatorLi);
		}

		orderNo++;

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

				text: `${orderButton.innerText} @ $${currentPrice}`,
			},
		});

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
			if (currentPrice - buyPrice < 0) {
				liveProfitDisplay.setAttribute("style", "color: red");
			} else if (currentPrice - buyPrice > 0) {
				liveProfitDisplay.setAttribute("style", "color: green");
			} else {
				liveProfitDisplay.setAttribute("style", "color: black");
			}
		} else {
			liveProfitDisplay.innerText = `Live profit: no stock held`;
			liveProfitDisplay.setAttribute("style", "color: black");
		}
	};

	updateTotalProfit = () => {
		if (buyPricesList.length == 0) {
			totalProfit = 0;
		} else {
			let totalBuys = buyPricesList.reduce((a, b) => a + b);
			let totalSales = sellPricesList.reduce((a, b) => a + b);
			totalProfit = totalSales - totalBuys;
		}
		return totalProfit;
	};

	updateTotalProfitDisplay = () => {
		let realisedProfit = updateTotalProfit();
		totalProfitDisplay.innerText = `Total profit: $${realisedProfit}`;
		if (realisedProfit < 0) {
			totalProfitDisplay.setAttribute("style", "color: red");
		} else if (realisedProfit > 0) {
			totalProfitDisplay.setAttribute("style", "color: green");
		} else {
			totalProfitDisplay.setAttribute("style", "color: black");
		}
	};

	calculateFinalScores = () => {
		let finalPrice = currentPrice;
		let market_profit = finalPrice - 100;
		let user_profit = updateTotalProfit();
		let score = user_profit - market_profit;
		let finalScores = { user_profit, market_profit, score };
		return finalScores;
	};

	submitFinalScores = scores => {
		API.patch(GAMES_URL + `${activeGame.id}`, { game: scores });
	};
}

function generateNextPrice(priceArray, position) {
	let change;
	let newPrice;
	if (priceArray[position] == 0) {
		change = 0;
	} else {
		if (priceArray[position] >= 190) {
			change = -Math.floor(Math.random() * 10);
		} else if (priceArray[position] <= 10) {
			if (Math.random() > 0.2) {
				change = Math.floor(Math.random() * 10) + 1;
			} else {
				change = -20;
			}
		} else {
			change =
				Math.random() > 0.5
					? Math.floor(Math.random() * 10) + 1
					: -Math.floor(Math.random() * 10);
		}
	}

	if (priceArray[position] + change <= 0) {
		newPrice = 0;
	} else {
		newPrice = priceArray[position] + change;
	}

	return newPrice;
}

function nextPredeterminedPrice(index) {
	let newPrice = weworkData[index];
	return newPrice;
}
