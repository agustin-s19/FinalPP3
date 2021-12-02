import { Facebook, Instagram, MailOutline, Room, WhatsApp } from "@mui/icons-material";
import styled from "styled-components"
import { mobile } from "../responsive";

const Container = styled.div`
    display: flex;
    background-color: #fcf5f5;
    ${mobile({flexDirection: "column"})}

`;

const Logo = styled.h1`
    display: flex;
    justify-content: left;
    margin-left: 40px;
`;
const Desc = styled.p`
    margin-top: 45px;
    margin-bottom: 10px;
`;
const SocialContainer = styled.div`
    display: flex;
    margin-left: 40px;
    margin-top:10px;
`;
const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${props=>props.color};
    justify-content: center;
    align-items: center;
    display: flex;
    margin-right: 20px;
    `;
const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
    
    ${mobile({alignItems: "center"} )}

`;

const Title = styled.h3`
    margin-bottom: 30px;
    display: flex;
    justify-content: center;
`
const Center = styled.div`
 flex: 1;
 padding: 20;
 ${mobile({display: "none"})}

`
const Right = styled.div`
    flex: 1;
    padding: 20px ;
    justify-content: center;
    display: grid;
    
`;
const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
`

const Footer = ()=> {
    return( 
            <Container>
                <Left>
                    <Logo>El Galpón</Logo>
                    <Desc>
                        Seguinos en nuestras redes
                    </Desc>
                    <SocialContainer>
                        <SocialIcon color="3B5999">
                            <Facebook />
                        </SocialIcon>
                        <SocialIcon color="E4405F">
                            <Instagram />
                        </SocialIcon>
                    </SocialContainer>
                </Left>
                <Center/>
                <Right>
                        <Title>Contacto</Title>
                        <ContactItem><Room style={{marginRight:"10px"}}/>Direccion, Lobos</ContactItem>
                        <ContactItem><WhatsApp style={{marginRight:"10px"}}/>+54 2227-1234564</ContactItem>
                        <ContactItem><MailOutline style={{marginRight:"10px"}}/> elgalpon@gmail.com </ContactItem>
                </Right>
            </Container>
    )
};

export default Footer
