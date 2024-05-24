import { useEffect, useState } from "react";
import axios from 'axios';

const API_KEY = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
export const Weather = () => {

    const getWeather = async () => {
        await axios.get('https://api.openweathermap.org/data/2.5/weather', {
            params: {
                q: '',
                appid: API_KEY,
                units: 'metric',
            }
        });

    }


    return (<></>);


};
