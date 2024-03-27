/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectQuote, fetchQuote, selectLoading } from "../../features/quote/quoteSlice";
import './QuoteWidget.css';
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
                const rand = Math.random();
                setQuoteIndex(Math.ceil(rand * quote.length));
            }, 300000)
            return () => clearInterval(interval);
        }
    }, [])


    const quoteWrapper = ({ q, a }: { q: string, a: string }) => {
        console.log(q, a);
        return (<>
            <blockquote id="quote-text">&ldquo;{q}&rdquo; &mdash;<footer id="author-text">{a}</footer></blockquote>
        </>)
    };
    return (
        <div id="quote-widget-wrapper">
            {quote.length > 0 && quoteWrapper(quote[quoteIndex])}
        </div>
    )
}