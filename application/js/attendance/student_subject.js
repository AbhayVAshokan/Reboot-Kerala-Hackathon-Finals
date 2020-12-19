document.getElementById("back-btn").onclick = ()=> {
    location.href = '../../html/attendance/student.html';
};

const urlParams = new URLSearchParams(window.location.search);
const subName = urlParams.get('subName');

document.getElementById('subject-name').textContent=subName;


// Calender

function generate_year_range(start, end) {
    var years = "";
    for (var year = start; year <= end; year++) {
        years += "<option value='" + year + "'>" + year + "</option>";
    }
    return years;
}

var today = new Date();
var currentMonth = today.getMonth();
var currentYear = today.getFullYear();
var selectYear = document.getElementById("year");
var selectMonth = document.getElementById("month");

// Get sub attendance data
var tempdate = (new Date(today.getFullYear(), today.getMonth()-1, today.getDate()+3, 0, 0, 0, 0)).getTime(),
    tempdate2 = (new Date(today.getFullYear(), today.getMonth()-1, today.getDate()+4, 0, 0, 0, 0)).getTime();
var attendance = {
    [tempdate] : 1,        
    [tempdate2] : 0,
}

var createYear = generate_year_range(currentYear-1, currentYear);

document.getElementById("year").innerHTML = createYear;

var calendar = document.getElementById("calendar");
var lang = calendar.getAttribute("data-lang");

var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

var dayHeader = "<tr>";
for (day in days) {
    dayHeader += "<th data-days='" + days[day] + "'>" + days[day] + "</th>";
}
dayHeader += "</tr>";

document.getElementById("thead-month").innerHTML = dayHeader;
document.getElementById("next-btn").style.visibility = "hidden";

monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);

document.getElementById('next-btn').onclick = ()=>{
    currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    if(currentMonth === today.getMonth() && currentYear === today.getFullYear()){
        document.getElementById("next-btn").style.visibility = "hidden";
    }
    showCalendar(currentMonth, currentYear);
}

document.getElementById('previous-btn').onclick = ()=>{
    currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
    document.getElementById("next-btn").style.visibility = "visible";
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {
    var firstDay = new Date(year, month).getDay();

    tbl = document.getElementById("calendar-body");

    tbl.innerHTML = "";

    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;

    // creating all cells
    var date = 1;
    for (var i = 0; i < 6; i++) {
        var row = document.createElement("tr");

        for (var j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                cell = document.createElement("td");
                cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            } else if (date > daysInMonth(month, year)) {
                break;
            } else {
                cell = document.createElement("td");
                cell.setAttribute("data-date", date);
                cell.setAttribute("data-month", month + 1);
                cell.setAttribute("data-year", year);
                cell.setAttribute("data-month_name", months[month]);
                cell.className = "date-picker";
                cell.innerHTML = "<span>" + date + "</span>";

                
                let tempDate = new Date(year, month, date, 0, 0, 0, 0);
                // console.log(tempDate.getTime());
                if(attendance[tempDate.getTime()] === 1){
                    cell.className += " present";
                }
                else if(attendance[tempDate.getTime()] === 0){
                    cell.className += " absent";
                }


                if (
                    date === today.getDate() &&
                    year === today.getFullYear() &&
                    month === today.getMonth()
                ) {
                    cell.className += " selected";
                }
                row.appendChild(cell);
                date++;
            }
        }

        tbl.appendChild(row);
    }
}

function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}
