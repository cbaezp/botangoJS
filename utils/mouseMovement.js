import axios from 'axios';

/**
 * Function to call the /move_and_click API with banner area information
 * @param {Object} bannerArea - The banner area object containing top_left, top_right, bottom_left, and bottom_right coordinates.
 * @param {Number} maxTimeSeconds - The maximum amount of time to search for a clickable element.
 */

//
export const moveMouseInBannerArea = async (bannerArea, maxTimeSeconds = 10) => {
  try {
    const response = await axios.post('http://localhost:8000/move_and_click', {
      top_left: bannerArea.top_left,
      top_right: bannerArea.top_right,
      bottom_left: bannerArea.bottom_left,
      bottom_right: bannerArea.bottom_right,
      max_time_seconds: maxTimeSeconds,
    });

    console.log('Mouse Move Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error while moving mouse:', error);
    return null;
  }
};
