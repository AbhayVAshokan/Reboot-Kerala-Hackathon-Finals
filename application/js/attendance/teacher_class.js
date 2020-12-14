// Fetch classes
classDays = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];

const urlParams = new URLSearchParams(window.location.search);
const className = urlParams.get('className');

document.getElementById('class-name').textContent = className;

document.getElementById("back-btn").onclick = ()=> {
    location.href = '../../html/attendance/teacher.html';
};


var ctx = document.getElementById('attendance-chart').getContext('2d');

var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: classDays,
        datasets: [{
            label: 'No of students present',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});