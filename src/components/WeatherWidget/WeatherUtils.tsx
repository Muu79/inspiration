import { ReactNode } from 'react';
import { WiDaySunny, WiNightClear, WiDayCloudy, WiNightAltCloudy, WiDayFog, WiNightFog, WiDaySprinkle, WiNightSprinkle, WiDaySleet, WiNightSleet, WiDayRain, WiNightRain, WiDayShowers, WiNightShowers, WiDayRainMix, WiNightRainMix, WiDayThunderstorm, WiDaySnow, WiNightSnow, WiNightStormShowers, WiDayStormShowers, WiNightAltSnowThunderstorm, WiDaySnowThunderstorm, WiNightThunderstorm, WiAlien, } from 'react-icons/wi';

export const weatherIcon = (weatherCode: number, night: boolean) => {
    const iconWrapper = (icon: ReactNode) => (<div className='icon-wrapper'>{icon}</div>);
    let icon = <WiAlien />;
    if (isNaN(weatherCode) || weatherCode < 0) return <></>;

    else if (weatherCode === 0) {
        icon = night ? <WiNightClear /> : <WiDaySunny />;
    }
    else if (weatherCode < 3) {
        icon = night ? <WiNightAltCloudy /> : <WiDayCloudy />;
    }
    else if (weatherCode === 43 || weatherCode === 48) {
        icon = night ? <WiNightFog /> : <WiDayFog />;
    }
    else if (weatherCode === 51 || weatherCode === 53 || weatherCode === 55) {
        icon = night ? <WiNightSprinkle /> : <WiDaySprinkle />;
    }
    else if (weatherCode === 56 || weatherCode === 57 || weatherCode === 58) {
        icon = night ? <WiNightSleet /> : <WiDaySleet />;

    }
    else if (weatherCode === 61 || weatherCode === 63 || weatherCode === 65) {
        icon = night ? <WiNightRain /> : <WiDayRain />;
    }
    else if (weatherCode === 66 || weatherCode === 67) {
        icon = night ? <WiNightRainMix /> : <WiDayRainMix />;
    }
    else if (weatherCode === 71 || weatherCode === 73 || weatherCode === 75) {
        icon = night ? <WiNightSnow /> : <WiDaySnow />;
    }
    else if (weatherCode >= 81 && weatherCode <= 82) {
        if (weatherCode === 82) {
            icon = night ? <WiNightStormShowers /> : <WiDayStormShowers />;
        } else {
            icon = night ? <WiNightShowers /> : <WiDayShowers />;
        }
    }
    else if (weatherCode === 85 || weatherCode === 86) { 
        icon = night ? <WiNightAltSnowThunderstorm /> : <WiDaySnowThunderstorm />;
    }
    else if (weatherCode === 95 || weatherCode === 96 || weatherCode === 99) {
        icon = night ? <WiNightThunderstorm /> : <WiDayThunderstorm />;
    }
    return iconWrapper(icon);
}
export const weatherInfo = (weather: any, night: boolean) => {
    const { currentTemp, weatherCode } = weather.current;
    const { min, max} = weather.daily;
    return (
        <>
            <div id='temp-wrapper'>
                <p id='current-temp'>{Math.round(currentTemp * 10)/10}°C</p>
                <p id='max-min'>{Math.floor(min)}/{Math.ceil(max)}°C</p>
            </div>
            {weatherIcon(weatherCode, night)}

        </>)
};