import { useAppSelector } from "../../app/hooks";
import { selectWeather } from "../../features/weather/weatherSlice";
import WeatherWidget from ".././WeatherWidget/WeatherWidget";
import QuoteWidget from "../QuoteWidget/QuoteWidget";
import './Header.css';


function Header() {
    return (
        <header>
            <QuoteWidget />
            <WeatherWidget />
        </header>
    )
}

export default Header;