import  styled  from "styled-components"

const Container = styled.div `
    height: 30px;
    background-color: teal;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
`;

const Announcement = () => {
    return (
        <Container>
           NUEVA COLECCION 2022 - OFERTAS IMPERDIBLES
        </Container>
    )
}

export default Announcement
