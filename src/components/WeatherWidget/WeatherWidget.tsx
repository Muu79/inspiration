/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchWeather, selectWeather, selectLoading } from "../../features/weather/weatherSlice";
import './WeatherWidget.css';
import { weatherInfo } from "./WeatherUtils";
const sunCalc = require('suncalc');

function WeatherWidget() {
    const [coords, setCoords] = useState<{ latitude: number, longitude: number }>({ latitude: 0, longitude: 0 });
    const [isNight, setNight] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const weather = useAppSelector(selectWeather);
    const loading = useAppSelector(selectLoading);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setCoords(position.coords);
            const { latitude, longitude } = position.coords;
            const now = new Date();
            const tomorrow = (new Date()).setDate(now.getDate() + 1);
            const yesterday = (new Date()).setDate(now.getDate() - 1);
            const todaySunDown = sunCalc.getTimes(now, latitude, longitude).sunset.getTime();
            const todaySunUp = sunCalc.getTimes(now, latitude, longitude).sunrise.getTime();
            const yesSunDown = sunCalc.getTimes(yesterday, latitude, longitude).sunset.getTime();
            const tomSunUp = sunCalc.getTimes(tomorrow, latitude, longitude).sunrise.getTime();

            if (now.getTime() > yesSunDown && now.getTime() < todaySunUp) {
                setNight(true);
            } else if (now.getTime() > todaySunDown && now.getTime() < tomSunUp) {
                setNight(true)
            } else {
                setNight(false);
            }
        });
    }, []);

    useEffect(() => {
        if (coords.latitude !== 0 && coords.longitude !== 0) {
            dispatch(fetchWeather({ lat: coords.latitude, long: coords.longitude }));

            const interval = setInterval(() => {
                if (loading === 'idle') {
                    dispatch(fetchWeather({ lat: coords.latitude, long: coords.longitude }))
                }
            }, 900000)
            return () => clearInterval(interval);
        }
    }, [coords])



    return (
        <div id="weather-widget-wrapper">
            {loading === 'idle' && !isNaN(weather.current.weatherCode) ? <>
                
                {weatherInfo(weather, isNight)}
                
            </> : <p>Loading...</p>}
        </div>
    );
}

export default WeatherWidget;