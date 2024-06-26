import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getQuote } from './quoteApi';

export interface QuoteState {
    quote: {
        q: string,
        a: string,
        h: string,
    }[];
    loading: 'idle' | 'loading' | 'failed';
}

const initialState: QuoteState = {
    quote: [],
    loading: 'idle',
}

export const quoteSlice = createSlice({
    name: 'quote',
    initialState: initialState as QuoteState,
    reducers: {
        setQuote: (state, action) => {
            state.quote = action.payload;
        },
        addQuote: (state, action) => {
            state.quote.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuote.pending, (state) => {
                state.loading = 'loading';
            })
            .addCase(fetchQuote.rejected, (state) => {
                state.loading = 'failed';
            })
            .addCase(fetchQuote.fulfilled, (state, action) => {
                state.quote = action.payload;
                state.loading = 'idle';
            });
    }
});

export const selectQuote = (state: { quote: QuoteState }) => state.quote.quote;
export const selectLoading = (state: { quote: QuoteState }) => state.quote.loading;
export const { setQuote } = quoteSlice.actions;
export const fetchQuote = createAsyncThunk(
    'quote/fetchQuote',
    getQuote
)
export default quoteSlice.reducer;