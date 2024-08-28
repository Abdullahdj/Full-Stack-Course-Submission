import axios from "axios"

const APIKEY = "0ec41885e3ba4069ad1233819242708"

const getWeather = (countryName) => {
    let request = axios.get(`http://api.weatherapi.com/v1/current.json?key=${APIKEY}&q=${countryName}&aqi=no`)
    return request
}

export default { getWeather }