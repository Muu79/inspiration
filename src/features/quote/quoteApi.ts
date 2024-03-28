export const getQuote = async () => {
    const url = '/api/quotes';
    const res = await fetch(url);
    const data = await res.json();
    return data;

};