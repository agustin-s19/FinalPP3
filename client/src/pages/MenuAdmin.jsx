import React, { useEffect } from 'react'
import NavbarAdmin from "../components/NavbarAdmin"
import styled from "styled-components"
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
        rgba(255,255,255,0.5),
        rgba(255,255,255,0.5)
    ),
    url("https://www.mueblespace.com.ar/images/sliders/grandes/93-1.jpg")
    center;
    background-size: cover;
   
`;
const Button = styled.button`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 40%;
    height:30%;
    border: none;
    background-color: teal;
    color: white;
    cursor: pointer;
    font-size: 56px;

`
const MenuAdmin = () => {
    const { user } = useAuth()

    useEffect(() => {
        if (user && !user.isAdmin) {
            window.location.href = '/admin/menu'
        }
    }, [user])

    return user && user.email && user.isAdmin ? (
        <div>
         <NavbarAdmin />
         <Container>
        
            <Button><Link to="/admin/productos">Productos</Link></Button>   
       
         </Container>
        </div>
    ) : (<></>)
}

export default MenuAdmin
