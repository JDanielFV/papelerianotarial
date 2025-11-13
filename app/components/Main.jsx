"use client";

import styled from "styled-components";

const MainContainer = styled.main`
    position: relative;
    height: 100dvh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10%;
    padding: 15%;
    text-align: center;
    font-family: Outfit,serif;
    overflow: hidden;
    scroll-snap-align: start;`;

const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 0;
`;

const Logo = styled.img`
    width: 200px;
    z-index: 1;
    margin-top: 4rem;
`
const Icono = styled.img`
    width: 15px;
    z-index: 1;
    margin-left: 5%;
`

const Title = styled.h1`
    font-size: 3rem;
    z-index: 1;
`
const SubTitle = styled.p`
    font-size: 1.5rem;
    z-index: 1;
    align-items: center;
    justify-content: center;
`

const FondoVideo = styled.video`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
`

function Main() {
    return (
        <MainContainer>
            <Overlay/>
            <FondoVideo autoPlay muted loop playsInline src={"/fondo.m4v"}/>
            <Logo src={"/logo blanco.png"}/>
            <Title>Somos A&G</Title>
            <SubTitle>Más que <strong>carpetas</strong>, creamos confianza. Piezas diseñadas para proteger los actos que
                definen vidas, patrimonios y legados.</SubTitle>
            <SubTitle>Baja para conocer más <Icono src={"/abajo.svg"}/></SubTitle>
        </MainContainer>
    );
}

export default Main;
