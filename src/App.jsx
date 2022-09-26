import "./App.css";
import { useEffect, useState } from "react";

function App() {
    const [userCoordinates, setUserCoordinates] = useState();
    const [weatherData, setWeatherData] = useState();
    const [forecastData, setForecastData] = useState();
    const [forecast, setForecast] = useState();

    const key = process.env.REACT_APP_API_KEY;

    const showPosition = (position) => {
        setUserCoordinates(
            `${position.coords.latitude},${position.coords.longitude}`
        );
    };

    const getUserCoordinates = () => {
        if (navigator.geolocation) {
            return navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            setUserCoordinates("Unfortunetly, this browser is not suited for this task");
        }
    };


}

export default App;

