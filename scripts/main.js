// CONSTANTS

const home = document.querySelector("#home");
home.addEventListener("click", showHomeScreen);

const h1 = document.querySelector("h1");
const tableBody = document.querySelector("tbody");
chartContainer = document.querySelector("#chart-container");
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

let totalProfit = 0;

// CREATE NEW GAME

function showHomeScreen() {
	chartContainer.innerText = "";
	if (!!document.querySelector("#trades-log-container")) {
		document.querySelector("#trades-log-container").remove();
		chartContainer.setAttribute("style", "float: center");
	}

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
}

showHomeScreen();

function handleFormSubmission() {
	event.preventDefault();
	let username = event.target.username.value;
	let company = event.target.company.value;
	createGame(username, company);
}

function createGame(username, company) {
	chartContainer.setAttribute("style", "float: left");
	h1.innerText = `${username} is now trading ${company}!`;
	tradesLogContainer = document.createElement("div");
	tradesLogContainer.id = "trades-log-container";
	document.querySelector("body").appendChild(tradesLogContainer);

	let tradesLogTitle = document.createElement("h2");
	tradesLogTitle.innerText = "Trades Log";
	document.querySelector("#start-game").remove();
	tradesLogContainer.appendChild(tradesLogTitle);

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
	priceSpan.innerText = 100;

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
			currentPrice = generateNextPrice(startData, count - 1);
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

				orderButton.remove();
				document.querySelector("#current-price").remove();

				orderButton.remove();

				let finalScores = calculateFinalScores();

				setTimeout(function() {
					alert(`You made a profit of ${finalScores.user_profit}\n
				The market made a profit of ${finalScores.market_profit}\n
				Your final score is ${finalScores.score}!`);
				}, 0);

				let marketResult = document.createElement("div");
				marketResult.innerText = `The market made: $${finalScores.market_profit}`;

				let scoreResult = document.createElement("div");
				scoreResult.innerText = `Your final score is: ${finalScores.score}`;

				document
					.querySelector("#profits-container")
					.append(marketResult, scoreResult);
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

	function handleOrder() {
		// change to pessimistic rendering?
		let tradeLi = document.createElement("li");
		tradeLi.innerText = `${currentDate}: ${orderButton.innerText} @ $${currentPrice}`;
		tradesLog.append(tradeLi);

		let order = orderButton.innerText;
		let price = currentPrice;
		let game_id = activeGame.id;
		let tradeData = { trade: { order, price, game_id } };

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
