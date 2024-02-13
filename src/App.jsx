import GlobalStyle from "./assets/styles/GlobalStyle";
import styled from "styled-components";
import palavras from "./palavras";

const alfabeto = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

function App() {
  return (
    <Container>
      <HangContainer>
        <img src="../public/images/forca0.png" />
        <button>Escolher Palavra</button>
      </HangContainer>
      <Alphabet>
        {alfabeto.map((l) => (
          <button>{l.toUpperCase()}</button>
        ))}
      </Alphabet>
      <Footer>
        <p>Já sei a palavra!</p>
        <input></input>
        <button>Chutar</button>
      </Footer>

      <GlobalStyle />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const HangContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: 4em;

  img {
    width: 30em;
  }

  button {
    background-color: #24ae60;
    color: white;
    font-size: 13px;
    font-weight: bolder;
    margin-top: 3em;
    width: 14em;
    height: 4em;
    border-radius: 0.5em;
    cursor: pointer;
  }
`;

const Alphabet = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 5px 20%;

  button {
    background-color: #9faab5;
    color: #727272;
    font-size: 20px;
    width: 40px;
    height: 40px;
    margin: 3px;
    border-radius: 3px;
    border: none;
    cursor: pointer;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;

  p {
    font-size: 24px;
  }

  input {
    width: 220px;
    height: 30px;
    border-radius: 5px;
    margin: 0 15px;
  }

  button {
    background-color: #b7dbf4;
    color: #10466d;
    font-size: 16px;
    font-weight: bold;
    width: 80px;
    height: 35px;
    border-radius: 5px;
    border: 1px solid #10466d;
    cursor: pointer;
  }
`;

export default App;
