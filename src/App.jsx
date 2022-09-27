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
            <p>Want to see the news near you? <a href={`https://www.bbc.co.uk/search?q=${weatherData?.location.region}`} target="_blank"> CLICK HERE!</a></p>
            <p>Or search news by region by... <a href={`https://www.bbc.co.uk/news/localnews`} target="_blank"> clicking here</a></p>
            <p>NEED TO TRY AND GET GOOGLE API MAPS WORKING ETC</p>
            <iframe
        title="google-maps"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3172.3325395304414!2d-122.01116148467422!3d37.33463524513264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb59127ce078f%3A0x18e1c3ce7becf1b!2sApple%20Park!5e0!3m2!1sen!2sin!4v1637309850935!5m2!1sen!2sin"
        width="600"
        height="450"
        style={{ border: "0" }}
        allowfullscreen=""
        loading="lazy"
      ></iframe>

            
        </div>
    );
}

export default App;

