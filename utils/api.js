import axios from 'axios';

export const getBannerArea = async () => {
    const url = 'http://127.0.0.1:8000/get_banner_area';
    const data = {
        "threshold": 0.65,
        "draw": false,
        "dpi": 96,
        "banner_width": 1200,
        "banner_height": 300
    };

    try {
        const response = await axios.post(url, data);
        return response.data;
    } catch (error) {
        console.error('Error fetching banner area:', error);
        throw error;
    }
};
