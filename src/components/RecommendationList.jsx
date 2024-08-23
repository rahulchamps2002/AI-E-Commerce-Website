import axios from 'axios';

const RECOMMENDATION_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

export const getRecommendations = async (userId) => {
    const response = await axios.post(RECOMMENDATION_API_URL, { user_id: userId });
    return response.data.recommendations;
};
