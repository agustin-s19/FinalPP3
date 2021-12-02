import {React, useState, useEffect} from 'react'
import styled from "styled-components"
import NavbarAdmin from '../components/NavbarAdmin'
import { mobile } from "../responsive";
import { useAuth } from '../hooks/useAuth';



const Container = styled.div`
width: 100vw;
    height: 100vh;
    background: linear-gradient(
        rgba(255,255,255,0.5),
        rgba(255,255,255,0.5)
    ),
    url("https://quesignificasoñar.net/wp-content/uploads/2015/09/chimenea.jpg")
    center;
    display: flex;
    align-items: center;
    justify-content: center;
    background-size: cover;
`
const Wrapper = styled.div`
    padding: 20px;
    width: 60%;
    height: 60%;
    background-color: brown;
    ${mobile({ width: "75%"})};
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    
`



const Input = styled.input`
    
    min-width: 40%;
    margin: 20px 0px 0px 40px;
    padding: 5px;
    align-items: center;
    justify-content: center;
    ;
       
`;



const Button = styled.button`
    width: 50%;
    border: none;
    padding: 15px 20px;
    background-color: black;
    color: white;
    cursor: pointer;
  
    margin: 70px;

`;
const Title = styled.h2`
    font-size: 20px;
    
    align-items: center;
    text-align: center;
    justify-content: center;
`
const Capsula = styled.div`
    display: flex;
    justify-items: center;
    align-items: baseline;
    justify-content: center;
    margin: 20px 0px 0px 40px;

`
const CreateProduct = () => {

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [img, setImg] = useState('');
    const [categories, setCategory] = useState('');
    const [color, setColor] = useState('');
    const [price, setPrice] = useState('');
    const [inStock, setStock] = useState('');

    async function addProduct(event) {
		event.preventDefault()

		const response = await fetch('http://localhost:5000/api/products/addProduct', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				title,
                desc,
                img,
                categories,
				color,
				price,
                inStock,
			}),
		}).catch((error)=> {});



		if (title && desc && img && categories && color && price && inStock !== " ") {
            console.log(response)
			alert('Producto agregado exitosamente')
			window.location.href = '/admin/productos'
		} else {
			alert('Ingrese todos los campos correctamente para poder agregar un nuevo producto')
		}
    }
    const { user } = useAuth()

    useEffect(() => {
        if (user && !user.isAdmin) {
            window.location.href = '/'
            
        }
    }, [user])

    return user && user.email && user.isAdmin ? (
        <Container>
            <NavbarAdmin/>
            <Wrapper>
            

           
           
                <Input
                    placeholder="Nombre"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                />
                <Input 
                    placeholder="Descripcion"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    type="text"
                />
                <Input
                    placeholder="Inserte url de la imagen"
                    value={img}
                    onChange={(e) => setImg(e.target.value)}
                    type="text"
                    
                />
                <Input 
                    placeholder="Categoria"
                    value={categories}
                    onChange={(e) => setCategory(e.target.value)}
                    type="text"
                />
                <Input 
                    placeholder="Color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    type="text"

                />
                <Input 
                    placeholder="Precio"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    type="number"
                />
                <Capsula>
                    <Title>Stock:</Title>
                    <select value={inStock} onChange={(e) => setStock(e.target.value)}>
                        <option value="true">Si</option>
                        <option value="false">No</option>
                    </select>
                </Capsula>
          
            <Button type="submit" onClick={addProduct}>CREAR PRODUCTO</Button>
          
            </Wrapper>
        </Container>
     
    ) : (<>No tiene permitido entrar aqui</>)
}

export default CreateProduct
