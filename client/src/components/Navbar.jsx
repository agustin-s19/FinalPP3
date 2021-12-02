
import { ShoppingCartOutlined } from '@material-ui/icons';
import LogoutIcon from '@mui/icons-material/Logout';
import { Badge } from '@mui/material';
import React from 'react'
import styled from 'styled-components'
import {mobile} from '../responsive'
import { Link } from "react-router-dom";
import { useCart } from '../hooks/useCart'
import { useAuth } from '../hooks/useAuth'

const Container =  styled.div`
    height:  60px;
    ${mobile({height: "50px"})}
    
`;
const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    ${mobile({padding: "10px 0px"})}
`;

const Left = styled.div`
    flex: 1;
    `;


const Center = styled.div`
    flex: 1;
    `;

const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ${mobile({flex: 2 ,justifyContent: "center"})}
    `;

const Logo = styled.h1`
    font-weight: bold;
    ${mobile({fontSize: "24px"})}
    `;

const Menu = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
    ${mobile({fontSize: "12px", marginLeft: "5px" })}

    `;





const Navbar = () => {
    const { totalItems } = useCart()
    const { user, logout } = useAuth()

    return (
        <Container>

            <Wrapper>
                <Left><Link to="/" ><Logo >El Galpón</Logo></Link>
                
                </Left>
                <Center>
                    
                </Center>
                    <Right> 

                        {user && user.email ? (<>
                            <strong>Hola {user.name}</strong> &nbsp; <LogoutIcon onClick={() => logout()} style={{ cursor: 'pointer' }} />
                        </>) :
                        (
                            <>
                                <Menu><Link to={"/registro"}>REGISTER</Link></Menu>
                                <Menu><Link to={"/login"}>SIGN IN</Link></Menu>
                            </>
                        )}

                        

                        <Menu>
                            <Link to={'/carrito'}>
                                <Badge badgeContent={totalItems} color="primary">
                                    <ShoppingCartOutlined/>
                                </Badge>
                            </Link>
                        </Menu>
                   </Right>
            </Wrapper> 
        </Container>
    )
}

export default Navbar
