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
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    },
}

let chart = new ApexCharts(
    document.querySelector("#chart"),
    options
);

// CONSTANTS

const orderButton = document.querySelector("#order-button")
orderButton.addEventListener("click", handleOrder)

let currentPrice;
let buyPrice;
let sellPrice;

const tradesLog = document.querySelector("#trades-log")
const liveGain = document.querySelector("#live-gain-container")

const startButton = document.querySelector("#start-button")
// orderButton.addEventListener("click", startGame)

let holdingStock = false

function handleOrder(){
    let tradeLi = document.createElement("li")
    tradeLi.innerText = `${orderButton.innerText} @ ${currentPrice}`
    tradesLog.append(tradeLi)

    orderButton.innerText == "BUY" ? orderButton.innerText = "SELL" : orderButton.innerText = "BUY"
    holdingStock = !holdingStock
    holdingStock ? buyPrice = currentPrice : sellPrice = currentPrice
    console.log(buyPrice)
    console.log(sellPrice)
}

let startData = [20, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]

let count = 1

updateLiveGain = () => {
    liveGain.innerText = `${currentPrice - buyPrice}`
}

function addNextDatapoint() {
    let change = Math.random() > 0.5 ? (Math.floor(Math.random() * 5) + 1  ) : (- Math.floor(Math.random() * 5)  )
    currentPrice = startData[count-1] + change
    startData[count] = currentPrice
    // console.log(startData)
    chart.updateSeries([{
        data: startData
    }])
    // console.log("datapoint added")
    if (holdingStock) {
        updateLiveGain()
    }
    
    count++
    if (count == 60) { clearInterval(graphTimer)
        // console.log("timer stopped") 
    }
}

let graphTimer = setInterval(addNextDatapoint, 500)

chart.render()
graphTimer

