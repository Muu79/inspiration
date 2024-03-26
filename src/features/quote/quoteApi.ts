import axios from 'axios';

export const getQuote = async () => {
    console.log("hello");
    axios.get('https://api.api-ninjas.com/v1/quotes?category=inspirational',
        {
            headers: {
                'X-Api-Key': process.env.REACT_APP_QUOTE_API_KEY,
            }
        }).then((response) => {
            console.log(response.data);
            return response.data.quote;
        }).catch((error) => {
            console.log(error);
            return "Error";
        });

};