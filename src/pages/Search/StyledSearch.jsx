import styled from 'styled-components';

export const Container = styled.div`
height: 100vh;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;

export const Heading = styled.h2`
color: grey
`;

export const SearchContainer = styled.div`
display: flex;
justify-content: center;
`

export const Input = styled.input`
display: block;
border: 1px solid #bbb;
padding: 0.3rem;
font-size: .9rem;
border-radius: 0.5rem;
height: 2.5rem;
`;

export const SearchBtn = styled.button`
padding: 1em;
background-color: tomato;
color: #fff;
display: inline-flex;
justify-content: center;
align-items: center;
cursor: pointer;
border-radius: 0.5rem;
`;