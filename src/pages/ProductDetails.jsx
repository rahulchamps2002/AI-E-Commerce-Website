import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {fetchProductsById} from "../services/api.js";
import {useCart} from "../context/CartContext.jsx";

const ProductDetails = () => {
    const {id} = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const {addToCart} = useCart();

    useEffect(() => {
        const getProduct = async () => {
            try {
                const data = await fetchProductsById(id);
            } catch (error) {
                console.error('Failed to fetch product details:', error);
            } finally {
                setLoading(false);
            }
        };
        getProduct();
    }, [id]);

    if(loading){
        return <p>Loading...</p>
    }

    if (!product){
        return <p>Product not found.</p>
    }

    return (
        <div className="product-details">
            <h1>{product.name}</h1>
            <img src={product.imageUrl} alt={product.name}/>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
    );
};

export default ProductDetails;