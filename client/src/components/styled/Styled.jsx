import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
`;

export const RootParent = styled.div`
    min-height: 88vh;
    height: auto;
    padding-top: 69px;
    background-color: #06283D;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    border-radius: 1rem;
    border: 2px solid blue;
    padding: 30px;
`;


export const Base = styled.section`
    width: 80%; 
    margin: 3rem auto; 
`;

export const Wrapper = styled.div`
    margin-top: ${({ mt }) => mt && `${mt}rem`};
    h2, h3 {
        color: #DFF6FF;
    };   
`;