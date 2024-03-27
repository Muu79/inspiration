
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { requestWeather } from './weatherAPI';

export interface WeatherState {
    weather: {
        current: { currentTemp : number, weatherCode: number },
        daily: { min: number, max: number }
    };
    loading: 'idle' | 'pending' | 'failed';
}

export type Weather = {
    current: { currentTemp: number, weatherCode: number },
    daily: { min: number, max: number }
}

const initialState: WeatherState = {
    weather: {
        current: {
            currentTemp: 0,
            weatherCode: NaN, // NaN indicates an un-initialized state
        },
        daily: {
            min: 0,
            max: 0,
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

export const selectWeather = (state: { weather: { weather: Weather; }; }) => state.weather.weather;
export const selectLoading = (state: { weather: { loading: 'idle' | 'pending' | 'failed'; }; }) => state.weather.loading;
export const { setWeather } = weatherSlice.actions;
export default weatherSlice.reducer;