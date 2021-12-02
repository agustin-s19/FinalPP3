import { useEffect, useState } from "react"
import styled from "styled-components"
import ProductAdmin from "./ProductAdmin"
import axios from "axios";




const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

`

const ProductsAdmin = ({cat,filters, sort}) => {
    const [products,setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    
    
    useEffect(() => {
        const getProducts = async () => {
            try{
                const res = await axios.get( cat ? `http://localhost:5000/api/products?category=${cat}` 
                :"http://localhost:5000/api/products");
                 
                setProducts(res.data.products);
            }catch(err){}
        };
        getProducts();
    }, [cat]);

    useEffect(() => {
        setFilteredProducts (
            products.filter((item) =>
              Object.entries(filters || {}).every(([key, value]) =>
                item[key].includes(value)
              )
            )
          );
      }, [products, cat,filters ]);

      


    return (
        <Container>
    
          {cat
          ? filteredProducts.map((item) => item._id && <ProductAdmin item={item} key={item._id} />)
          : products
            .slice(0, 20)
            .map((item) => <ProductAdmin item={item} key={item._id} />)}
        
        </Container>
    );
};

export default ProductsAdmin
