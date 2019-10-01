// API and requests

function post(url, data) {
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(console.log)
}

const API = {post}

// CONSTANTS

let practiceUserData = {user: {username: "olib"}}
let practiceGameData = {game: {user_id: 1, company: "Flatiron", score: 40, user_profit: 140, market_profit: 100}}
let practiceTradeData = {trade: {order: "buy", price: 90}}
let practiceTradeData2 = {trade: {order: "sell", price: 140}}

const USERS_URL = "http://localhost:3000/users/"
const GAMES_URL = "http://localhost:3000/games/"
const TRADES_URL = "http://localhost:3000/trades/"

const orderButton = document.querySelector("#order-button")

let currentPrice = 100;
let buyPrice;
let sellPrice;

let buyPricesList = []
let sellPricesList = []

const tradesLog = document.querySelector("#trades-log")
const profitsContainer = document.querySelector("#profits-container")
const liveProfitDisplay = document.querySelector("div#live-profit-display")
const totalProfitDisplay = document.querySelector("div#total-profit-display")

const startButton = document.querySelector("#start-button")
// orderButton.addEventListener("click", startGame)

let holdingStock = false

// CHART

let options = {
    chart: {
        height: 600,
        type: 'line',
        zoom: {
            enabled: false
        },
        animations: {
            enabled: true,
            speed: 100, 
            dynamicAnimation: {
                enabled: true
            }
        }
    },
    series: [{
        name: "Desktops",
        // data: [10, 41, 35, 51, 49, null]
        data: [null, null, null, null, null, null, null, null]
    }],
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'straight'
    },
    title: {
        text: 'Random Stock',
        align: 'left'
    },
    grid: {
        row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
        },
    },
    xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    yaxis: {
        min: 0,
        max: 200
    }
}

let chart = new ApexCharts(
    document.querySelector("#chart"),
    options
);

let nullFill = [null, null, null, null, null, null, null, null]
let startData = [100, null, null, null, ...nullFill, ...nullFill, ...nullFill, ...nullFill, ...nullFill, ...nullFill, ...nullFill]
let count = 1

// GROWING CHART

function addNextDatapoint() {
    let change = Math.random() > 0.5 ? (Math.floor(Math.random() * 10) + 1  ) : (- Math.floor(Math.random() * 10)  )
    currentPrice = startData[count-1] + change
    startData[count] = currentPrice
    // console.log(startData)
    chart.updateSeries([{
        data: startData
    }])
    // console.log("datapoint added")
    if (holdingStock) {
        updateLiveProfitDisplay()
    }
    
    count++
    if (count == 60) { clearInterval(graphTimer)
        // console.log("timer stopped") 
    }
}

let graphTimer = setInterval(addNextDatapoint, 1)

chart.render()
graphTimer


// HANDLE BUY AND SELL

orderButton.addEventListener("click", handleOrder)

function handleOrder() {
    let tradeLi = document.createElement("li")
    tradeLi.innerText = `${orderButton.innerText} @ ${currentPrice}`
    tradesLog.append(tradeLi)

    orderButton.innerText == "BUY" ? orderButton.innerText = "SELL" : orderButton.innerText = "BUY"
    
    holdingStock = !holdingStock
    if (holdingStock) { // just bought
        buyPrice = currentPrice
        buyPricesList.push(buyPrice)
    } else { // just sold
        sellPrice = currentPrice
        sellPricesList.push(sellPrice)
        updateTotalProfitDisplay()
        updateLiveProfitDisplay()
    }
    console.log(buyPrice)
    console.log(sellPrice)
}

updateLiveProfitDisplay = () => {
    if (holdingStock) {
        liveProfitDisplay.innerText = `Live profit: $${currentPrice - buyPrice}`
    } else {
        liveProfitDisplay.innerText = `Live profit: no stock held`
    }
}

updateTotalProfitDisplay = () => {
    let totalBuys = buyPricesList.reduce((a, b) => a+b)
    let totalSales = sellPricesList.reduce((a, b) => a+b)
    totalProfitDisplay.innerText = `Total profit $${totalSales - totalBuys}`
}

