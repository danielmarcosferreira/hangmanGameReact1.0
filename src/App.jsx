import GlobalStyle from "./assets/styles/GlobalStyle";
import styled from "styled-components";
import palavras from "./palavras";
import { useState } from "react";
import forca0 from "./assets/images/forca0.png";
import forca1 from "./assets/images/forca1.png";
import forca2 from "./assets/images/forca2.png";
import forca3 from "./assets/images/forca3.png";
import forca4 from "./assets/images/forca4.png";
import forca5 from "./assets/images/forca5.png";
import forca6 from "./assets/images/forca6.png";

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

const images = [forca0, forca1, forca2, forca3, forca4, forca5, forca6];

function App() {
  const [desabilitaInput, setDesabilitaInput] = useState(true);
  const [erros, setErros] = useState(0);
  const [palavraEscolhida, setpalavraEscolhida] = useState([]);
  const [palavraDoJogo, setPalavraDoJogo] = useState([]);
  const [letrasUsadas, setLetrasUsadas] = useState(alfabeto);
  const [stringSemAcento, setStringSemAcento] = useState("");
  const [chute, setChute] = useState("");
  const [ganhou, setGanhou] = useState(false);
  const [perdeu, setPerdeu] = useState(false);

  function iniciarJogo() {
    setGanhou(false);
    setPerdeu(false);
    setDesabilitaInput(false);
    sortearPalavra();
    setLetrasUsadas([]);
    console.log(ganhou);
  }

  function sortearPalavra() {
    const randomIndex = Math.floor(Math.random() * palavras.length);
    const palavra = palavras[randomIndex].toUpperCase();
    const arrayPalavra = palavra.split("");
    console.log(arrayPalavra);
    setpalavraEscolhida(arrayPalavra);

    let tracinhos = [];
    arrayPalavra.forEach((l) => tracinhos.push(" _ "));
    setPalavraDoJogo(tracinhos);

    const palavraSemAcento = palavra
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    setStringSemAcento(palavraSemAcento);
    console.log(palavraSemAcento);
  }

  function clicouLetra(l) {
    setLetrasUsadas([...letrasUsadas, l]);
    if (stringSemAcento.includes(l)) {
      acertouLetra(l);
    } else {
      errouLetra(l);
    }
  }

  function acertouLetra(letraClicada) {
    let novaPalavraJogo = [...palavraDoJogo];
    palavraEscolhida.forEach((l, index) => {
      if (stringSemAcento[index] == letraClicada) {
        novaPalavraJogo[index] = l.toUpperCase();
      }
    });
    setPalavraDoJogo(novaPalavraJogo);
  }

  function errouLetra(l) {
    let contErros = erros + 1;
    setErros(contErros);
    console.log(contErros);
    if (contErros == 6) {
      perdeuJogo();
    }
  }

  function chutarPalavraInteira() {
    let escolhidaString = "";
    palavraEscolhida.forEach((l) => (escolhidaString += l));
    if (chute == escolhidaString.toLocaleLowerCase()) {
      ganhouJogo();
    } else {
      perdeuJogo();
    }
  }

  function ganhouJogo() {
    setGanhou(true);
    setLetrasUsadas(alfabeto);
    setDesabilitaInput(true);
    setPalavraDoJogo(palavraEscolhida);
    alert("Parabens voce ganhou o jogo!");
  }

  function perdeuJogo() {
    setPerdeu(true);
    setErros(6);
    setLetrasUsadas(alfabeto);
    setDesabilitaInput(true);
    setPalavraDoJogo(palavraEscolhida);
    alert("Voce perdeu o jogo, tente novamente");
  }

  const corPalavra = ganhou ? "green" : perdeu ? "red" : "black";

  return (
    <Container>
      <HangContainer>
        <img src={images[erros]} />
        <div>
          <button onClick={iniciarJogo}>Escolher Palavra</button>
          <StyledParagraph cor={corPalavra}>{palavraDoJogo}</StyledParagraph>
        </div>
      </HangContainer>
      <Alphabet>
        {alfabeto.map((l) => (
          <button
            disabled={letrasUsadas.includes(l) ?? true}
            key={l}
            onClick={() => clicouLetra(l)}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </Alphabet>
      <Footer>
        <p>Já sei a palavra!</p>
        <input
          disabled={desabilitaInput}
          value={chute}
          onChange={(e) => setChute(e.target.value)}
        />
        <button onClick={chutarPalavraInteira} disabled={desabilitaInput}>
          Chutar
        </button>
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
    color: ${(props) => props.color};
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

  /* p {
    color: ${(props) => props.color};
    background-color: ${(props) => props.color};
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 20px;
  } */
`;

const StyledParagraph = styled.p`
  color: ${(props) => props.cor};
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 20px;
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
      cursor: auto;
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

    &:disabled {
      background-color: #9faab5;
      cursor: auto;
    }
  }
`;

export default App;
