// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from "react";
import { fetchProducts } from "../services/api.js";
import ProductList from "../components/ProductList.jsx";

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            const data = await fetchProducts();
            setProducts(data);
        };
        getProducts();
    }, []);

    return (
        <div>
            <h1>Product Catalog</h1>
            <ProductList products={products}/>
        </div>
    );
};

export default Home;