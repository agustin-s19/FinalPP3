import {React, useState, useEffect} from 'react'
import styled from "styled-components"
import NavbarAdmin from '../components/NavbarAdmin'
import { mobile } from "../responsive";
import { publicRequest } from "../requestMethods"
import { useLocation } from "react-router"
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from '../hooks/useAuth'



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
    
    background-color: brown;
    ${mobile({ width: "75%"})}
    border-radius: 30px;
    
   
`

// const Form = styled.form`
//     display: flex;
//     flex-wrap: wrap;
//     justify-content: center;
//     align-items: center;
//     margin: 10px;
// `;

const Input = styled.input`
  
    min-width: 40%;
    margin: 20px 0px 0px 40px;
    padding: 5px;
    align-items: center;
    justify-content: center;
    ;
       
`;

const Capsula = styled.div`
    display: flex;
    justify-items: center;
    align-items: baseline;
    justify-content: center;

`

const Button = styled.button`
    width: 50%;
    border: none;
    padding: 15px 20px;
    background-color: black;
    color: white;
    cursor: pointer;
  
`;
const Title = styled.h2`
    font-size: 12px;
    padding: 15px;
`

const Icon = styled.div`
        cursor: pointer;
        margin-left: 20px;
        
`
const EditProduct = () => {
    
    const [price, setPrice] = useState(0);
    const [inStock, setStock] = useState(false);
    const location = useLocation();
    const id = location.pathname.split("/")[3];
    const [product, setProduct] = useState({});

    useEffect(() => {
        const getProduct = async () => {
          try {

            const res = await publicRequest.get("/products/find/"+ id);
            setProduct(res.data.product)

            console.log(res.data);

            setPrice(res.data.product.price)
            setStock(res.data.product.inStock)

          } catch {
          }
        };
        getProduct();
      }, [id]
      );
 
    async function editProduct(event) {
		event.preventDefault()

		const response = await publicRequest.put('http://localhost:5000/api/products/' + id, {
            price,
            inStock,
        }).catch((error)=> {
            console.log("No se actualizo nada.")
        });
        console.log({response})


		if (price && inStock) {
            console.log(response)
			alert('Producto editado exitosamente')
			// window.location.href = '/admin/productos'
		} else {
			alert('Ingrese todos los campos correctamente para poder editar el producto')
		}
    }
    async function deleteProduct(event) {
		event.preventDefault()

		const response = await publicRequest.delete('http://localhost:5000/api/products/' + id, {

        }).catch((error)=> {
            console.log("No se actualizo nada.")
        });
        console.log({response})
        alert("Producto borrado exitosamente")
        window.location.href = '/admin/productos'
    }

    const { user } = useAuth()

    useEffect(() => {
        if (user && !user.isAdmin) {
            window.location.href = '/'
        }
    }, [user])
    return  user && user.email && user.isAdmin ? (
        <Container>
            <NavbarAdmin/>
            <Wrapper>
            {/* <Form> */}
            <Capsula>
                <Title>Nombre:</Title>
                <Input
                    
                    placeholder= {product.title}
                    type="text"
                    disabled
                />
            </Capsula>
            <Capsula>
                <Title>Descripcion:</Title>
                <Input 
                    placeholder= {product.desc}
                    type="text"
                    disabled
                />
            </Capsula>
            <Capsula>
                <Title>url Imagen</Title>
                <Input
                    placeholder= {product.img}
                    type="text"
                    disabled
                />
            </Capsula>
            <Capsula>
                <Title>Categoria:</Title>
                <Input 
                    placeholder= {product.categories}
                    type="text"
                    disabled
                />
            </Capsula>
            <Capsula>
                <Title>Color:</Title>
                <Input 
                    placeholder= {product.color}
                    type="text"
                    disabled

                />
            </Capsula>
            <Capsula>
                <Title>Precio:</Title>
                <Input 
                    placeholder=  {product.price}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    type="number"
                />
            </Capsula>
            <Capsula>
                <Title>Stock:</Title>
                <select value={inStock} onChange={(e) => setStock(e.target.value)}>
                    <option value="true">Si</option>
                    <option value="false">No</option>
                </select>
            </Capsula>
            <Capsula>
            <Button type="submit" onClick={editProduct}>GUARDAR PRODUCTO</Button>
            <Icon><DeleteIcon type="submit" onClick={deleteProduct} sx={{ fontSize: 80 }}></DeleteIcon></Icon>
            </Capsula>
            {/* </Form> */}
            </Wrapper>
        </Container>
     
    ) : (<> </>)
}

export default EditProduct
