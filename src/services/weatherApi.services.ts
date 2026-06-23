import axios from 'axios';

export const getWeatherByCity = async (city: string) => {
    const options = {
        method: 'GET',
        url: 'https://api.openweathermap.org/data/2.5/weather',
        params: {
            q: city,
            appid: '45f79bbea22764cb07774908c9711b67',
            units: 'metric',
        },
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};