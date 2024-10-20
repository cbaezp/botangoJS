import axios from 'axios';

/**
 * Function to call the /click-banner API with no parameters using a GET request.
 * The banner area information and maxTimeSeconds are no longer sent with the request.
 */

export const moveMouseInBannerArea = async () => {
  try {
    // Making a simple GET request to the endpoint without parameters
    const response = await axios.get('http://127.0.0.1:8000/click-banner');

    console.log('Mouse Move Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error while moving mouse:', error);
    return null;
  }
};
