import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchWeather, selectWeather } from "../../features/weather/weatherSlice";
import './WeatherWidget.css';
function WeatherWidget() {
    const weather = useAppSelector(selectWeather);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(weather) return;
        const geoLocation = navigator.geolocation;
        if(!geoLocation) {
            throw new Error('Geolocation is not supported by your browser.');
        }
        geoLocation.getCurrentPosition((position) => {
            dispatch(fetchWeather({lat: position.coords.latitude, long: position.coords.longitude}));
        });
    }, [dispatch, weather])
    return (
        <div id="weather-widget-wrapper">
            <p>{Math.ceil(weather.current.temperature_2m)}°C</p>
            <p></p>
        </div>
    );
}

export default WeatherWidget;