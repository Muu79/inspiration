/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectQuote, fetchQuote, selectLoading } from "../../features/quote/quoteSlice";

export default function QuoteWidget() {
    const quote = useAppSelector(selectQuote);
    const loading = useAppSelector(selectLoading);
    const dispatch = useAppDispatch();
    const [quoteIndex, setQuoteIndex] = useState<number>(0);
    useEffect(() => {
        if (quote.length === 0 && loading === 'idle') {
            dispatch(fetchQuote());
        }
    }, []);

    useEffect(() => {
        if (quote.length > 0) {
            const interval = setInterval(() => {
                setQuoteIndex((Math.random() * (quote.length + 1)));
            })
            return () => clearInterval(interval);
        }
    }, [])

    const quoteWrapper = (quote:string) => React.createElement('div', null, quote);
    return (
        <div>
            <h1>Quote</h1>
            {quote.length > 0 && quoteWrapper(quote[quoteIndex].h)}
        </div>
    )
}