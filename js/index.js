async function search(country) {
    let req = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=62e3a520508c4d49bc2222433241412&q=${country}&days=3`);
        let data = await req.json();
        displayCurrent(data.location, data.current);
        displayTomorrow(data.forecast.forecastday);
        displayAfterTomorrow(data.forecast.forecastday);
}
document.getElementById("search").addEventListener("keyup", data => {
    search(data.target.value);
});

var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function displayCurrent(location, current) {
    if (null != current) {
        var lastUpdatedDate = new Date(current.last_updated.replace(" ", "t"));
        let todayHtml =
            `<div class="card border-0" id="today">
        <div class="card-header d-flex justify-content-between">
            <div class="day" style="color: var(--grey);">${days[lastUpdatedDate.getDay()]}</div>
            <div class="date" style="color: var(--grey);">${lastUpdatedDate.getDate()}${monthNames[lastUpdatedDate.getMonth()]}</div>
        </div>
        <div class="card-body">
            <h5 class="card-title" style="color: var(--grey);">${location.name}</h5>
            <div class="temp text-white" style="font-size: 100px; font-weight: 500;">${current.temp_c}<sup>o</sup>C</div>
            <img src="https:${current.condition.icon}"  alt="">
            <div class="word mb-3" style="color: var(--blue);">${current.condition.text}</div>
            <div class="default d-flex">
                <img src="./images/icon-umberella.png" alt="" width="20px" height="20px">
                <p class="ms-1 me-4" style="color: var(--grey);">20%</p>
                <img src="./images/icon-wind.png" alt="" width="20px" height="20px">
                <p class="ms-1 me-4" style="color: var(--grey);">18Km/h</p>
                <img src="./images/icon-compass.png" alt="" width="20px" height="20px">
                <p class="ms-1 me-4" style="color: var(--grey);">East</p>
            </div>
        </div>
    </div>
        `;
        document.getElementById("forecast").innerHTML = todayHtml;
    }
}

function displayTomorrow(forecastDays) {
    let table2 = "";
    for (let i =1 ; i < forecastDays.length; i+=2) {
        let forecastDate = new Date(forecastDays[i].date.replace(" ", "T"));
        table2 +=
            `<div class="card border-0 text-center">
        <div class="card-header middle">
            <small style="color: var(--grey);" >${days[forecastDate.getDay()]}</small>
        </div>
        <div class="card-body middle2">
            <div class="icon mt-2 mb-3">
                <img src="https:${forecastDays[i].day.condition.icon}" alt="">
                </div>
            <h3 class="card-title text-white">${forecastDays[i].day.maxtemp_c}<sup>o</sup>C</h3>
            <h6 class="card-text mb-4" style="color: var(--grey);">${forecastDays[i].day.mintemp_c}<sup>o</sup></h6>
            <p style="color: var(--blue);">${forecastDays[i].day.condition.text}</p>
        </div>
    </div>`;
    }
    
    document.getElementById("forecast").innerHTML += table2;
}
function displayAfterTomorrow(forecastDays) {
    let table3 = "";
    for (let i = 2; i < forecastDays.length; i+=1) {
        let forecastDate = new Date(forecastDays[i].date.replace(" ", "T"));
        table3 +=
            `<div class="card border-0 text-center">
        <div class="card-header">
            <small style="color: var(--grey);" >${days[forecastDate.getDay()]}</small>
        </div>
        <div class="card-body">
            <div class="icon mt-2 mb-3">
                <img src="https:${forecastDays[i].day.condition.icon}" alt="">
                </div>
            <h3 class="card-title text-white">${forecastDays[i].day.maxtemp_c}<sup>o</sup>C</h3>
            <h6 class="card-text mb-4" style="color: var(--grey);">${forecastDays[i].day.mintemp_c}<sup>o</sup></h6>
            <p style="color: var(--blue);">${forecastDays[i].day.condition.text}</p>
        </div>
    </div>`;
    }
    
    document.getElementById("forecast").innerHTML += table3;
}
search("cairo");