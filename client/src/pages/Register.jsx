import styled from "styled-components"
import { mobile } from "../responsive";
import {useState} from "react"

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
`;
const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin: 10px;
`;
const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 20px 10px 0px 0px;
    padding: 5px;
       
`;

const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
    margin-left: 30%;
    margin-top: 5%;
    
   
`;


const Register = () => {

    const [name, setName] = useState('');
    const [lastname, setLastName] = useState('');
    const [dni, setDni] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
    
    
    async function registerUser(event) {
		event.preventDefault()

		const response = await fetch('http://localhost:5000/api/auth/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
                lastname,
                dni,
				email,
				password,
			}),
		}).catch((error)=> {});



		if (name && lastname && dni && email && password  !== " ") {
			alert('Registro exitoso')
			window.location.href = '/login'
		} else {
			alert('Ingrese todos los campos correctamente para poder crear la cuenta')
		}
    }
		

		






    return (
        <Container>
            <Wrapper>
                <Title>CREAR CUENTA</Title>
                <Form > 
                    <Input 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="Nombre"
                    />
                    <Input 
                        value={lastname}
                        onChange={(e) => setLastName(e.target.value)}
                        type="text"
                        placeholder="Apellido"/>
                    <Input 
                        value={dni}
                        onChange={(e) => setDni(e.target.value)}
                        type="text"
                        pattern="[0,9]"
                        placeholder="DNI"/>
                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Email"
                    />
                    <Input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Contraseña"
                    />
                    
                    
                    
                    
                </Form>
                <Button type="submit" onClick={registerUser}>CREAR CUENTA</Button>
            </Wrapper>
        </Container>
    )
}

export default Register
