
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
    console.log(res);
    try {
        const current = res.current()!;
        const daily = res.daily()!;
        return {
            current: {
                temperature_2m: current.variables(0)!.value(),
                weather_code: current.variables(1)!.value(),
            },
            daily: {
                temperature_2m_min: daily.variables(0)!.valuesArray()![0],
                temperature_2m_max: daily.variables(1)!.valuesArray()![0],
            }
        }
    } catch (err) {
        console.error(err);
        return {
            current: {
                temperature_2m: 0,
                weather_code: -1,
            },
            daily: {
                temperature_2m_min: 0,
                temperature_2m_max: 0,
            },
        }
    }
}