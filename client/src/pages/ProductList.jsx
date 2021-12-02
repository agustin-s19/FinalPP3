import styled from "styled-components"
import Announcement from "../components/Announcement"
import Footer from "../components/Footer";
import Navbar from "../components/Navbar"
import Products from "../components/Products";
import { useLocation } from "react-router";
import { useState } from "react";
const Container = styled.div`

`
const Title = styled.h1`
    margin: 20px;
`;

const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;

`;

const Filter = styled.div`
    margin: 20px;
`;

const FilterText = styled.span`
    font-size: 20px;
    font-weight: 500;
`
const Select = styled.select`
    padding: 5px;
    margin-left: 20px;
`
const Option = styled.option`

`


const ProductList = () => {
    const location = useLocation();
    const cat = location.pathname.split("/")[2];
     
    const [sort,setSort] = useState("Destacados")
    return (
        <Container>
            <Navbar/>
            <Announcement/>
            <Title>
                {cat} 
            </Title>
            <FilterContainer>
                <Filter>
                    <FilterText>Ordenar Productos:</FilterText>
                    <Select onChange={(e) => setSort(e.target.value)}>
                        <Option value="Destacados">Destacados</Option>
                        <Option value="asc">Menor Precio</Option>
                        <Option value="desc">Mayor Precio</Option> 
                    </Select> 
                </Filter>
                

            </FilterContainer>
            <Products cat={cat} sort={sort}/> 
            <Footer/>
        </Container>
    )
}

export default ProductList
