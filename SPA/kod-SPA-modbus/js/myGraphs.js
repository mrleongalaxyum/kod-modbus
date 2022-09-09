charts = document.getElementById("charts");//html canvas
//values of x and y axes
var days = ["Mon", "Tue", "Wed", "Thur","Fri", "Sat", "Sun"];//x axes
var litres = [150, 90, 95, 130, 85, 180, 85];//y axes
//create a line chart
new Chart(charts, {
    type: 'line', //This is a line chart
    data: {
        labels: days, //x-axes data
        datasets: [{
            label:"Line Chart",
            data: litres, //y-axes data
            borderColor: 'black',
            fill: false,
        }]
    },
});