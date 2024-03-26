import axios from 'axios';

export const getQuote = async () => {
    console.log("hello");
    const url = 'https://zenquotes.io/api/quotes';
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    return data;

};