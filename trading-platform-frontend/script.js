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
        text: 'Product Trends by Month',
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

chart.render()

// window.setTimeout(function() {
//     chart.updateSeries([{
//         data: [10, 41, 35, 51, 49, 20]
//     }])
//     console.log("time's up")
// }, 2000)

let startData = [20, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]

// function incrementData() { 
//     startData.forEach(dataPoint => {
//         window.setTimeout(function(dataPoint) {
//             dataPoint = 50
//             chart.updateSeries([{
//                 data: startData
//             }])
//         }, 1000)
//     });
// }

// incrementData()

let count = 1

function addNextDatapoint() {
    let change = Math.random() > 0.5 ? (Math.floor(Math.random() * 5) + 1  ) : (- Math.floor(Math.random() * 5)  )
    startData[count] = startData[count-1] + change
    console.log(startData)
    chart.updateSeries([{
        data: startData
    }])
    console.log("datapoint added")
    
    count++
    if (count == 60) { clearInterval(graphTimer)
    console.log("timer stopped") }
}

let graphTimer = setInterval(addNextDatapoint, 250)

graphTimer

