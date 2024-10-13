import { getBannerArea } from './utils/api.js'; 
const fetchBannerData = async () => {
    try {
        const bannerData = await getBannerArea();
        console.log('Banner Data:', bannerData);
        // Further processing of bannerData can be done here
    } catch (error) {
        console.error('Error while fetching banner data:', error);
    }
};

fetchBannerData();
