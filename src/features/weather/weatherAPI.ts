
import { fetchWeatherApi } from 'openmeteo';

export const requestWeather = async (lat: number, long: number) => {
    const params = {
        'latitude': lat,
        'longitude': long,
        'current': ['temperature_2m', 'weather_code'],
        'daily': ['temperature_2m_min', 'temperature_2m_max'],
        'timezone': 'auto',
        'forecast_days': 1,
    }
    const url = "https://api.open-meteo.com/v1/forecast";
    const res = (await fetchWeatherApi(url, params))[0];
    try {
        const current = res.current()!;
        const daily = res.daily()!;
        return {
            current: {
                currentTemp: current.variables(0)!.value(),
                weatherCode: current.variables(1)!.value(),
            },
            daily: {
                min: daily.variables(0)!.valuesArray()![0],
                max: daily.variables(1)!.valuesArray()![0],
            }
        }
    } catch (err) {
        console.error(err);
        return {
            current: {
                currentTemp: 0,
                weatherCode: -1,
            },
            daily: {
                min: 0,
                max: 0,
            },
        }
    }
}