import axios from "axios";

const API_URL = "https://openrouter.ai/api/v1";

export const fetchProducts = async (filters = {}) => {
    const response = await axios.get(`${API_URL}/products`, {params: filters });
    return response.data;
};

export const fetchProductsById = async (id) => {
    const response = await axios.get(`${API_URL}/products/${id}`);
    return response.data
};