// Data for Line Chart
const dates = [
    '03/07/21','03/08/21','03/09/21','03/10/21',
    '03/11/21','03/14/21','03/15/21','03/16/21',
    '03/17/21','03/18/21'
];

const high_prices_appl = [
    165.02, 162.88, 163.41, 160.39,
    159.28, 154.12, 155.57, 160.0,
    161.0, 164.48
];

const high_prices_spot = [
    138.72, 137.26, 139.81, 135.37,
    135.38, 125.91, 125.93, 134.59,
    139.86, 147.5
];


const data = {
    labels: dates,
    datasets: [
        {
            label: 'AAPL Stock High',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: high_prices_appl
        },
        {
            label: 'SPOT Stock High',
            backgroundColor: 'rgb(0, 0, 255)',
            borderColor: 'rgb(0, 0, 255)',
            data: high_prices_spot
        }
    ]
};


const config_line = {
    type: 'line',
    data: data,
    options: {
        responsive: false,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: 'Stock High Price Comparison'
            }
        }
    }
};

const myLineChart = new Chart(document.getElementById("lineChart"), config_line);