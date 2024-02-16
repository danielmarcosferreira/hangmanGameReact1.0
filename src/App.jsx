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
    setErros(0);
    setDesabilitaInput(false);
    sortearPalavra();
    setLetrasUsadas([]);
    setChute("");
  }

  function sortearPalavra() {
    const randomIndex = Math.floor(Math.random() * palavras.length);
    const palavra = palavras[randomIndex];
    const arrayPalavra = palavra.split("");
    setpalavraEscolhida(arrayPalavra);
    console.log(palavra);

    let tracinhos = [];
    arrayPalavra.forEach((l) => tracinhos.push(" _ "));
    setPalavraDoJogo(tracinhos);

    const palavraSemAcento = palavra
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    setStringSemAcento(palavraSemAcento);
  }

  function clicouLetra(l) {
    const letrasClicadas = [...letrasUsadas, l];
    setLetrasUsadas(letrasClicadas);
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
    if (novaPalavraJogo.join("").toLowerCase() == palavraEscolhida.join("")) {
      ganhouJogo();
    }
  }

  function errouLetra(l) {
    let contErros = erros + 1;
    setErros(contErros);
    if (contErros == 6) {
      perdeuJogo();
    }
  }

  function chutarPalavraInteira() {
    let escolhidaString = palavraEscolhida.join("");
    if (chute.toLowerCase() == escolhidaString) {
      ganhouJogo();
    } else {
      perdeuJogo();
    }
  }

  function ganhouJogo() {
    alert("Parabéns você ganhou o jogo! :)");
    setGanhou(true);
    terminaJogo();
  }

  function perdeuJogo() {
    setErros(6);
    alert("Você perdeu o jogo! :c");
    setPerdeu(true);
    terminaJogo();
  }

  function terminaJogo() {
    const palavraFinal = palavraEscolhida.join("").toUpperCase();
    setPalavraDoJogo(palavraFinal);
    setLetrasUsadas(alfabeto);
    setDesabilitaInput(true);
    if (confirm("Gostaria de Jogar de novo")) {
      iniciarJogo();
    } else {
      alert("Obrigado por ter jogado!");
    }
  }

  const corPalavra = ganhou ? "green" : perdeu ? "red" : "black";

  return (
    <Container>
      <HangContainer>
        <img src={images[erros]} />
        <div>
          <button onClick={iniciarJogo} disabled={!desabilitaInput}>
            Escolher Palavra
          </button>
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
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const HangContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: 1em;

  img {
    width: 13rem;
    text-align: center;
    margin-right: ;
  }

  div {
    height: 17rem;
    width: 30%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  button {
    background-color: #24ae60;
    color: white;
    font-size: 12px;
    font-weight: bolder;
    margin: 0.5em;
    width: 9em;
    height: 3em;
    border-radius: 0.5em;
    cursor: pointer;

    &:hover {
      background-color: #63cc8b;
    }
    &:disabled {
      background-color: #63cc8b;
      cursor: auto;
    }
  }
`;

const StyledParagraph = styled.p`
  color: ${(props) => props.cor};
  font-size: 17px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
`;

const Alphabet = styled.div`
  /* width: 25rem; */
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 1rem 1rem;
  padding: 0 1rem;
  border-radius: 10px;

  button {
    background-color: #b7dbf4;
    /* #9faab5 */
    color: #727272;
    font-size: 20px;
    text-align: center;
    width: 1.3em;
    height: 1.3em;
    margin: 3px;
    border-radius: 3px;
    border: none;
    cursor: pointer;
    &:hover {
      background-color: #6e9eaf;
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
    text-align: center;
    font-size: 16px;
    font-weight: lighter;
    font-weight: bolder;
  }

  input {
    width: 170px;
    height: 30px;
    border-radius: 5px;
    margin: 0 10px;
  }

  button {
    background-color: #b7dbf4;
    color: #10466d;
    font-size: 16px;
    font-weight: bold;
    width: 70px;
    height: 32px;
    text-align: center;
    border-radius: 5px;
    border: 1px solid #10466d;
    cursor: pointer;

    &:hover {
      background-color: #6e9eaf;
    }

    &:disabled {
      background-color: #9faab5;
      cursor: auto;
    }
  }
`;

export default App;
