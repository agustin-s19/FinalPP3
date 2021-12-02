import styled from "styled-components"
import { mobile } from "../responsive";
import { Link } from "react-router-dom";


const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
        rgba(255,255,255,0.5),
        rgba(255,255,255,0.5)
    ),
    url("https://scontent.feze1-1.fna.fbcdn.net/v/t39.30808-6/260172609_2697163820586461_4459671846537601115_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=730e14&_nc_eui2=AeGJdkMt-KEvskZfI2BcQu9g_MvI8U_drsj8y8jxT92uyLaaVZWCD8yD6VaQTTh1eFzWkz8KGtHTd2V5yVQPrh_s&_nc_ohc=fgI0AR2LDjQAX82I6s9&tn=GaMoLzxpO7LO1ya4&_nc_ht=scontent.feze1-1.fna&oh=b26071e7a1c127fa4bca41dd2e9095a0&oe=61A6B50D")
    center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Wrapper = styled.div`
    padding: 20px;
    width: 40%;
    background-color: white;
    ${mobile({ width: "75%"})}
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
    justify-content: center;
    align-items: center;
    display: flex;
    margin-bottom: 15px;
`;





const Button = styled.button`
    margin-top: 5%;
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
    margin-bottom: 10px;
    margin-left: 30%;
    
   
    
   
`;
const Image = styled.img`
    width: 40%;
    height: 30vh;
    display: block;
    margin-left: auto;
    margin-right: auto;
  
    ${mobile({ height: "40%"})}
`;

    const OrdenRealizada = ()=> {
    return (
        <Container>
           
            <Wrapper>
                <Title>ORDEN REALIZADA CON EXITO</Title>
                <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Eo_circle_green_checkmark.svg/2048px-Eo_circle_green_checkmark.svg.png" alt="check" />

                <Link to={"/"}><Button type="submit">Regresar al sitio</Button></Link>
            </Wrapper>
        </Container>
    )

}
export default OrdenRealizada