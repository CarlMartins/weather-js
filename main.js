const api = {
    key: 'ec2bf6fe8d704e0e54f91a7e27db4502',
    baseurl: 'http://api.openweathermap.org/data/2.5/'
}

const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchBox.value);
    }
}

function getResults(query) {
    fetch(`${api.baseurl}weather?q=${query}&lang=pt_br&units=metric&appid=${api.key}`)
        .then(weather => {
            return weather.json()
        })
        .then(displayResults);
}

function displayResults(weather) {
    console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    console.log(new Date());
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerText = `${Math.round(weather.main.temp)}°c`

    let weatherState = document.querySelector('.current .weather');
    weatherState.innerText = weather.weather[0].description;

    let hi_low = document.querySelector('.current .hi-low');

    let lowTemp = Math.round(weather.main.temp_min);
    let highTemp = Math.round(weather.main.temp_max);
    hi_low.innerText = `${lowTemp}°c / ${highTemp}°c`;
}

function dateBuilder(date) {
    let months = ["Janeiro", "Fevereiro", "Março", "Abril",
        "Maio", "Junho", "Julho", "Agosto",
        "Setembro", "Outubro", "Novembro", "Dezembro"];

    let days = ["Domingo", "Segunda-Feira", "Terça-Feira",
        "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sabado"];

    let weekDay = days[date.getDay()];
    let day = date.getDate();
    let month = months[date.getMonth()];
    let year = date.getFullYear();

    return `${weekDay}, ${day} de ${month} de ${year}`;
}