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

    const fetchWeather = async () => {
        try {
            const weatherResponse = await fetch(
                `https://api.weatherapi.com/v1/current.json?key=${key}&q=${userCoordinates}`
            );
            if (!weatherResponse.ok) {
                throw new Error(weatherResponse.status + " error with request");
            }
            setWeatherData(await weatherResponse.json());
            console.log(weatherData);
        } catch (error) {
            alert(error.message);
        }
    };

    const fetchForecast = async () => {
        try {
            const response = await fetch(
                `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${userCoordinates}`
            );
            if (!response.ok) {
                throw new Error(response.status + " error with request");
            }
            setForecastData(await response.json());

            console.log(forecastData);
        } catch (error) {
            alert(error.message);
        }
    };

    useEffect(() => {
        if (userCoordinates) {
            fetchWeather();
            fetchForecast();

            console.log(forecast);
        }
    }, [userCoordinates]);

    useEffect(() => {
        if (forecastData) {
            setForecast(
                forecastData?.forecast.forecastday[0].hour.map((hour) => {
                    return <img src={hour.condition.icon} key={hour.time_epoch} alt = "represnting hourly weather forecast" />;
                })
            );
        }
    }, [forecastData]);

    const currentHour = new Date().getHours();
    let greetingTime = "Morning!";
  
    if (currentHour >= 12) {greetingTime = "Afternoon!"}
    if (currentHour >= 18) {greetingTime = "Evening!"}

    return (
        <div className="Forecast">
          <h1>Welcome to website that can read the sky above you</h1>
          <h1>Good {greetingTime} Ready to see the weather that lies ahead?</h1>
            {weatherData && (
                <>
                    <h2>
                        {userCoordinates} 
                        <br />
                        {weatherData?.location.name} {" , "}
                        {weatherData?.location.region}
                    </h2>
                    <img src={weatherData?.current.condition.icon} alt = "Current weather where you are" />
                    <h2>{weatherData?.current.condition.text}</h2>
                    <h2>{forecast}</h2>
                </>
            )}
            <button onClick={getUserCoordinates}>Click here to get Local Weather</button>
        </div>
    );
}

export default App;

