import { useAppSelector } from "../../app/hooks";
import { selectWeather } from "../../features/weather/weatherSlice";
import WeatherWidget from ".././WeatherWidget/WeatherWidget";
import './Header.css';


function Header() {
    return (
        <header>
            <WeatherWidget />
        </header>
    )
}

export default Header;