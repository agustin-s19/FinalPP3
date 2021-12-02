import {React,useEffect} from 'react'
import NavbarAdmin from '../components/NavbarAdmin'
import ProductsAdmin from '../components/ProductsAdmin'
import { AddBox } from "@mui/icons-material"
import styled from "styled-components"
import { Link } from 'react-router-dom'
import { useAuth } from "../hooks/useAuth" 

const Title = styled.h1`
align-items: center;
justify-content: center;
display: flex;

`
const Icon = styled.div`
align-items: right;
justify-content: right;
display: flex;
margin-right: 30px;
`
const ProductosAdmin = () => {
    const { user } = useAuth()

    useEffect(() => {
        if (user && !user.isAdmin) {
            window.location.href = '/admin/menu'
        }
    }, [user])

    return user && user.email && user.isAdmin ?(
        <div>
        <NavbarAdmin />
            <div>  
                <Icon>
                    <Link to="/admin/addProduct">
                    <AddBox sx={{ fontSize: 80 }}/>
                    </Link>
                </Icon>
                <Title>Productos</Title>
            </div>
        <ProductsAdmin />
        </div>
    ) : (<>No tiene permitido ingresar aqui</>)
}

export default ProductosAdmin
