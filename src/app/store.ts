import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import weatherReducer from '../features/weather/weatherSlice';
import quoteReducer from '../features/quote/quoteSlice';
import taskReducer from '../features/tasks/taskSlice';

const {weather, quote, tasks} = localStorage.getItem('store') ? JSON.parse(localStorage.getItem('store')!) : {} as any;

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    quote: quoteReducer,
    tasks: taskReducer,
  },
  preloadedState: {
    weather: weather || {weather: {current:{weatherCode:NaN}}, loading: 'idle'},
    quote: quote || {quote: [], loading: 'idle'},
    tasks: tasks || {tasks: []},
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const selectStore = (state: RootState) => state;
