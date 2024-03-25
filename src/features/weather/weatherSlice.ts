
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { requestWeather } from './weatherAPI';

interface WeatherState {
    weather: {
        current: { temperature_2m: number, weather_code: number },
        daily: { temperature_2m_min: number, temperature_2m_max: number }
    };
    loading: 'idle' | 'pending' | 'failed';
}

const initialState: WeatherState = {
    weather: {
        current: {
            temperature_2m: 0,
            weather_code: 0,
        },
        daily: {
            temperature_2m_min: 0,
            temperature_2m_max: 0,
        }
    },
    loading: 'idle',
}

export const weatherSlice = createSlice({
    name: 'weather',
    initialState: initialState,
    reducers: {
        setWeather: (state, action) => {
            state.weather = action.payload;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchWeather.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(fetchWeather.fulfilled, (state, action) => {
                state.loading = 'idle';
                state.weather = action.payload;
            })
            .addCase(fetchWeather.rejected, (state) => {
                state.loading = 'failed';
            })
    },
})

export const fetchWeather = createAsyncThunk(
    'weather/fetchWeather',
    async ({ lat, long }: { lat: number, long: number }) => {
        const res = await requestWeather(lat, long);
        return res;
    },
)

export const selectWeather = (state: { weather: { weather: any; }; }) => state.weather.weather;
export const { setWeather } = weatherSlice.actions;
export default weatherSlice.reducer;