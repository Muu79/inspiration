
export const getQuote = async () => {
    console.log("hello");
    const url = '/api/quotes';
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    return data;

};