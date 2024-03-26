import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectQuote, selectLoading, fetchQuote } from "../../features/quote/quoteSlice";

export default function QuoteWidget(){
    const quote = useAppSelector(selectQuote);
    const loading = useAppSelector(selectLoading);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchQuote());
    }, []);
    return (
        <div>
            <h1>Quote</h1>
            {quote.length > 0 && quote[0].q}
        </div>
    )
}