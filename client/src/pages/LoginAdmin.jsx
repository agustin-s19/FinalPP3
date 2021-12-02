import styled from "styled-components"
import { mobile } from "../responsive";
import {useState} from "react"
import { useAuth } from '../hooks/useAuth'

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
        rgba(255,255,255,0.5),
        rgba(255,255,255,0.5)
    ),
    url("https://c4.wallpaperflare.com/wallpaper/366/799/701/interior-lujo-moderno-muebles-wallpaper-preview.jpg")
    center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    padding: 20px;
    width: 25%;
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

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Input = styled.input`
    
    flex: 1;
    min-width: 70%;
    margin: 10px 0;
    padding: 10px;
       
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
    
   
`;

const LoginAdmin = () => {
    const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
    console.log(email, password);

    const { setToken } = useAuth()

    async function loginUser(event) {
		event.preventDefault()

		const response = await fetch('http://localhost:5000/api/auth/admin/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
			}),
		}).catch((error)=> {});

		const data = await response.json()

		if (data.email) {
			setToken(data)
			alert('Ingreso exitoso')
			window.location.href = '/admin/menu'
		} else {
			alert('Datos Incorrectos')
		}
	}
    

    return (
        <Container>
            <Wrapper>
                <Title>INGRESAR</Title>
                <Form onSubmit={loginUser}> 
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
                        placeholder="Password"
                    />
                    
                    <Button type="submit" >LOGIN</Button>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default LoginAdmin
