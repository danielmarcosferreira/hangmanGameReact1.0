import GlobalStyle from "./assets/styles/GlobalStyle";
import styled from "styled-components";
import palavras from "./palavras";
import { useState } from "react";

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
  const [desabilitaInput, setDesabilitaInput] = useState(true);
  const [erros, setErros] = useState(0);
  const [palavraEscolhida, setpalavraEscolhida] = useState([]);
  const [palavraDoJogo, setPalavraDoJogo] = useState([]);
  const [letrasUsadas, setLetrasUsadas] = useState(alfabeto);
  const [stringSemAcento, setStringSemAcento] = useState("")

  function iniciarJogo() {
    setDesabilitaInput(false);
    sortearPalavra();
    setLetrasUsadas([])
  }

  function sortearPalavra() {
    const randomIndex = Math.floor(Math.random() * palavras.length);
    const palavra = palavras[randomIndex];
    const arrayPalavra = palavra.split("");
    console.log(arrayPalavra);
    setpalavraEscolhida(arrayPalavra);

    let tracinhos = [];
    arrayPalavra.forEach((l) => tracinhos.push(" _ "));
    setPalavraDoJogo(tracinhos);

    const palavraSemAcento = palavra.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    setStringSemAcento(palavraSemAcento)
    console.log(palavraSemAcento);
  }

  function clicouLetra(l) {
    setLetrasUsadas([...letrasUsadas, l]);
    if (stringSemAcento.includes(l)) {
      acertouLetra (l)
    } else {
      errouLetra (l)
    }
  }

  function acertouLetra (l) {
    console.log("Contem Letra");
  }

  function errouLetra (l) {
    setErros(erros + 1)
  }

  return (
    <Container>
      <HangContainer>
        <img src={`../public/images/forca${erros}.png`} />
        <div>
          <button onClick={iniciarJogo}>Escolher Palavra</button>
          <p>{palavraDoJogo}</p>
        </div>
      </HangContainer>
      <Alphabet>
        {alfabeto.map((l) => (
          <button
            disabled={letrasUsadas.includes(l) ?? true }
            key={l}
            onClick={() => clicouLetra(l)}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </Alphabet>
      <Footer>
        <p>Já sei a palavra!</p>
        <input disabled={desabilitaInput} />
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

  div {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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

  p {
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 20px;
  }
`;

const Alphabet = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 5px 20%;

  button {
    background-color: #b7dbf4;
    /* #9faab5 */
    color: #727272;
    font-size: 20px;
    width: 40px;
    height: 40px;
    margin: 3px;
    border-radius: 3px;
    border: none;
    cursor: pointer;
    &:hover {
      background-color: blue;
    }
    &:disabled {
      background-color: #9faab5;
      cursor: none;
    }
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
