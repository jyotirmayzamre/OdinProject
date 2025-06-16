import ProductCard from "../../components/product-card/ProductCard";
import { useState, useEffect } from "react";

import './Shop.css';



function Shop(){
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    async function getProducts(){
        try {   
            const response = await fetch('https://dummyjson.com/products?limit=100');
            if(!response.ok){
                throw new Error('Server Error');
            }
            const data = await response.json();
            setProducts(data.products);
        } catch(error) {
            console.error(error);
        } finally {
            setLoading(false);

        }   
    }

    useEffect(() => {
        getProducts();
    }, []);


    return (
        <div className="products">
            {loading ? <h1>Loading</h1>
            
            : <div className="grid">
                {products.map((prod) => {
                    console.log(prod);
                    const obj = {Name: prod['title'], Url: prod['images'][0], Price: prod['price']};
                    return <ProductCard key={prod['id']} product={obj}/>
                })}
            </div>}
        </div>
    )
}

export default Shop;