import { Add, Remove, Delete } from "@mui/icons-material";
import styled from "styled-components"
import Announcement from "../components/Announcement"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { mobile } from "../responsive";
import axios from 'axios'
import { useCart } from '../hooks/useCart'
import { Link } from "react-router-dom";
import { useAuth } from '../hooks/useAuth'
import { useEffect } from "react";

const Container = styled.div``;

const Wrapper = styled.div`
    padding: 20px;
    ${mobile({padding: "10px"})}
`;

const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`;

const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`;
const TopButton = styled.button`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border: ${props=>props.type === "filled" && "none"};
    background-color: ${props=>props.type === "filled" ? "black" : "transparent"};
    color: ${props=>props.type === "filled" && "white"};
`;




const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({flexDirection: "column"})}
`;
const Info = styled.div`
    flex: 3;
`;
const Product = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({flexDirection: "column"})}

`;
const ProductDetails = styled.div`
    flex: 2;
    display: flex;
`;
const Image = styled.img`
    width: 200px;
    margin: 10px;
    padding: 5px;
`;
const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;
const ProductName = styled.div``;

const ProductId = styled.div``;

const PriceDetail = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`;

const ProductAmount = styled.div`
    font-size: 24px;
    margin: 5px;
    ${mobile({margin: "5px 15px"})}
`;
const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: 200;
    ${mobile({marginBottom: "20px"})}
`;
const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;


const Summary = styled.div`
    flex:1;
    border: 0.5px solid lightgray;
    border-radius: 10px;
    padding: 20px;
    height: 50vh;
`;
const SummaryTitle = styled.h1`
    font-weight:200;
`;
const SummaryItem = styled.div`
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    font-weight: ${props=>props.type === "total" && "500"};
    font-size: ${props=>props.type === "total" && "24px"};
`;
const SummaryItemText = styled.span`
`;
const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: black;
    color: white;
    font-width: 600;
    cursor: pointer;
`

const Cart = () => {
    const { items, addQuantity, removeQuantity, subTotal, itemsCheckout, deleteItem } = useCart()
    const { user } = useAuth()
    

    const verification = async () =>{
        alert("Necesita estar logueado para poder comprar")
        window.location.href = '/login'
    }
    const handleFinished = async () => {
        
          const response = await axios.post('http://localhost:5000/checkout', {
            "items": itemsCheckout
          }).catch((error) => console.log(error))
  
        if (response && response.data && response.data.id) {
            const mp = new window.MercadoPago('TEST-598bca96-c6e4-4d19-97d1-fddaa9de03b0', {
                locale: 'es-AR'
            });
        
            mp.checkout({
                preference: {
                    id: response.data.id
                },
                autoOpen: true,
            });

        }
    }

    return (
        <Container>
            <Navbar/>
            <Announcement/>
            <Wrapper>
                <Title>TU CARRITO: </Title>
                <Top>
                <Link to="/"><TopButton>SEGUIR COMPRANDO</TopButton></Link>
                    
                    {items.length > 0 && <TopButton type="filled">COMPRAR AHORA</TopButton>}
                </Top>
                <Bottom>
                    <Info>
                        
                        {items.map((item) => 
                        <Product key={item._id}>
                            <ProductDetails>
                                <Image src={item.img}/>
                                <Details>
                                    <ProductName><b>Product:</b> {item.title}</ProductName>
                                    <ProductId><b>ID:</b> 3131164846</ProductId>
                                    <ProductColor color={item.color} />
                                </Details>
                            </ProductDetails>
                            <PriceDetail>
                                <ProductAmountContainer>
                                    <Remove onClick={()=> removeQuantity(item)} />
                                        <ProductAmount>{item.quantity}</ProductAmount>
                                    <Add onClick={()=> addQuantity(item)} />
                                </ProductAmountContainer>
                                <ProductPrice>${item.price}</ProductPrice>
                                <Delete onClick={()=> deleteItem(item)} />
                            </PriceDetail> 
                           
                        </Product>)}
                        
                        
                    </Info>  
                        <Summary>
                            <SummaryTitle>Total</SummaryTitle>
                            <SummaryItem>
                                <SummaryItemText>Subtotal</SummaryItemText>
                                <SummaryItemText> ${subTotal}</SummaryItemText>
                            </SummaryItem>
                            <SummaryItem type="total">
                                <SummaryItemText>Total</SummaryItemText>
                                <SummaryItemText> ${subTotal}</SummaryItemText>
                            </SummaryItem>
                        {user && user.email ? (<>    
                        {items.length > 0 && <Button onClick={handleFinished}>FINALIZAR COMPRA</Button>}
                        </>) : (
                            <>
                                <Button onClick={verification}>FINALIZAR COMPRA</Button>
                            </>
                        )
                        
                        }
                        </Summary>
                        

                </Bottom>
            </Wrapper>
            <Footer/>
        </Container>
    )
}

export default Cart