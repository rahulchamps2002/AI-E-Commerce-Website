import axios from 'axios';
import Product from '../models/Product';

// Get product recommendations for a user
export const getRecommendations = async (req, res) => {
    const { userId } = req.body;

    try {
        // Example: Fetch recommendations from an external recommendation engine
        const response = await axios.post('http://recommendation-engine-url/recommend', { user_id: userId });
        const recommendedProductIds = response.data.recommendations;

        // Fetch the product details for the recommended products
        const recommendedProducts = await Product.find({ _id: { $in: recommendedProductIds } });

        res.status(200).json(recommendedProducts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch recommendations' });
    }
};
