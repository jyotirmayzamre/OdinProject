import ProductCard from "../../components/product-card/ProductCard";
import { useState, useEffect } from "react";

import './Shop.css';
import { useOutletContext } from "react-router-dom";


//component for the shop page
//filters products based on category and renders relevant product cards
//fetches product data on first render and stores as state

function Shop(){
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');
    const [active, setActive] = useState('All');
    const { addToCart } = useOutletContext();
    
    const CategoryMap = {
        "beauty": "Women's Fashion",
        "fragrances": "Women's Fashion",
        "furniture": "Furniture",
        "groceries": "Groceries",
        "home-decoration": "Furniture",
        "kitchen-accessories": "Furniture",
        "laptops": "Electronics",
        "mens-shirts": "Men's Fashion",
        "mens-shoes": "Men's Fashion",
        "mens-watches": "Men's Fashion",
        "mobile-accessories": "Electronics"
    }
    

    const filteredProducts = filter === 'All' ? products : products.filter(prod => prod.Category == filter);
    
    function updateCategory(e){
        const elem = document.getElementById(active);
        elem.classList.remove('clicked');
        e.target.classList.add('clicked');
        setFilter(e.target.value);
        setActive(e.target.id);
    }

    useEffect(() => {
        async function getProducts(){
            try {   
                const response = await fetch('https://dummyjson.com/products?limit=100');
                if(!response.ok){
                    throw new Error('Server Error');
                }
                const data = await response.json();
                const mappedProducts = data.products.map(prod => {
                    const newCategory = CategoryMap[prod["category"]];
                    return {
                        ID: Number(prod['id']),
                        Name: prod["title"],
                        Url: prod['images'][0],
                        Price: prod['price'],
                        Category: newCategory
                    };
                });
                setProducts(mappedProducts);
            } catch(error) {
                console.error(error);
            } finally {
                setLoading(false);

            }   
    }
        getProducts();
    }, []);


    return (
        <>
            <div className="shop">
                <div className="heading-container">
                    <h1>Our Products</h1>
                </div>
                <div className="categories">
                    <button id='All' value='All' className="btn clicked" onClick={updateCategory}>All</button>
                    <button id='Electronics' value='Electronics' className="btn" onClick={updateCategory}>Electronics</button>
                    <button id="Men's Fashion" value="Men's Fashion" className="btn" onClick={updateCategory}>Men's Fashion</button>
                    <button id="Women's Fashion" value="Women's Fashion" className="btn" onClick={updateCategory}>Women's Fashion</button>
                    <button id="Groceries" value='Groceries' className="btn" onClick={updateCategory}>Groceries</button>
                    <button id="Furniture" value='Furniture' className="btn" onClick={updateCategory}>Furniture</button> 
                </div>
                <div className="products">
                    {loading ? <h1>Loading</h1>
                    
                    : <div className="grid">
                        {filteredProducts.map((prod) => {
                            const obj = {Name: prod.Name, Url: prod.Url, Price: prod.Price, ID: prod.ID};
                            return <ProductCard key={prod.ID} product={obj} addToCart={addToCart}/>
                        })}
                    </div>}
                </div>
            </div>
        </>
        
    )
}

export default Shop;