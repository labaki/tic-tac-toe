import "./App.css";
import React, { useState, useCallback } from "react";

/* Funktion für die einzelnen Felder des Spielbretts */
function Square(props) {
  return (
    <button name={props.number} className="square" onClick={props.onClick}>
      {props.value ? props.value : <>&nbsp;</>}
    </button>
  );
}

/* Funktion für das Spielbrett */
function Grid() {
  const [squares, setSquares] = useState(new Array(9).fill(null));
  const [hint, setHint] = useState("Spieler*in X ist an der Reihe.");
  const [err, setErr] = useState("");
  const [playerX, setPlayerX] = useState(true);

  /* Überprüfung von Gewinn/Ende des Spiels */
  const checkForEnd = useCallback(
    (isPlayerX) => {
      const possibleLines = [
        [0, 1, 2],
        [0, 4, 8],
        [0, 3, 6],
        [3, 4, 5],
        [6, 7, 8],
        [6, 4, 2],
        [1, 4, 7],
        [2, 5, 8],
      ];

      /* Überprüfung, ob Spiel gewonnen wurde */
      for (let i = 0; i < possibleLines.length; i++) {
        if (
          squares[possibleLines[i][0]] != null &&
          squares[possibleLines[i][0]] === squares[possibleLines[i][2]] &&
          squares[possibleLines[i][0]] === squares[possibleLines[i][1]]
        ) {
          const winningPlayer = isPlayerX ? "X" : "O";
          setHint("Spieler*in " + winningPlayer + " hat gewonnen.");
          let currentSquares = squares.map((value) =>
            value == null ? "." : value
          );
          setSquares([...currentSquares]);
          return true;
        }
      }

      /* Überprüfung, ob alle Spielfelder belegt sind. */
      const emptySquares = squares.filter((value) => value == null);
      if (emptySquares.length === 0) {
        setHint("Unentschieden!");
        return true;
      }

      /* Updaten der Hinweise */
      const activePlayer = isPlayerX ? "O" : "X";
      setHint("Spieler*in " + activePlayer + " ist an der Reihe.");
      setErr(" ");
      return false;
    },
    [squares]
  );

  /* Funktion für das Click-Event der einzelnen Felder */
  function onClick(number) {
    console.log("Hi " + number);
    console.log(hint);
    console.log(squares);
    let squaresArray = squares;
    if (squaresArray[number] == null) {
      squaresArray[number] = playerX ? "x" : "o";
      setSquares([...squaresArray]);
      const end = checkForEnd(playerX);
      if (!end) {
        setPlayerX(!playerX);
      }
    } else {
      setErr("Feld bereits belegt!");
    }
  }

  return (
    <>
      <div className="grid">
        <div className="row1">
          <Square number="0" value={squares[0]} onClick={() => onClick(0)} />
          <Square number="1" value={squares[1]} onClick={() => onClick(1)} />
          <Square number="2" value={squares[2]} onClick={() => onClick(2)} />
        </div>
        <div className="row2">
          <Square number="3" value={squares[3]} onClick={() => onClick(3)} />
          <Square number="4" value={squares[4]} onClick={() => onClick(4)} />
          <Square number="5" value={squares[5]} onClick={() => onClick(5)} />
        </div>
        <div className="row3">
          <Square number="6" value={squares[6]} onClick={() => onClick(6)} />
          <Square number="7" value={squares[7]} onClick={() => onClick(7)} />
          <Square number="8" value={squares[8]} onClick={() => onClick(8)} />
        </div>
        <div className="hint">
          <p>{hint}</p>
          <p>{err ? err : ""}</p>
          <button
            onClick={() => {
              setSquares(new Array(9).fill(null));
              setHint("Spieler*in X ist an der Reihe.");
              setPlayerX(true);
            }}
          >
            Zurücksetzen
          </button>
        </div>
      </div>
    </>
  );
};

/* App-Funktion */
function App() {
  return (
    <div className="App">
      <Grid />
    </div>
  );
}

export default App;
