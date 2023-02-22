import React, { useState } from "react";
import Square from "./Square";
import Restart from "./Restart";

const INITIAL = "";
const X_PLAYER = "X";
const O_PLAYER = "O";

const playerPointers = [[], []];

const winningCombinations = [
  [
    { row: 0, col: 0 },
    { row: 0, col: 1 },
    { row: 0, col: 2 },
  ],
  [
    { row: 1, col: 0 },
    { row: 1, col: 1 },
    { row: 1, col: 2 },
  ],
  [
    { row: 2, col: 0 },
    { row: 2, col: 1 },
    { row: 2, col: 2 },
  ],
  [
    { row: 0, col: 0 },
    { row: 1, col: 0 },
    { row: 2, col: 0 },
  ],
  [
    { row: 0, col: 1 },
    { row: 1, col: 1 },
    { row: 2, col: 1 },
  ],
  [
    { row: 0, col: 2 },
    { row: 1, col: 2 },
    { row: 2, col: 2 },
  ],
  [
    { row: 0, col: 0 },
    { row: 1, col: 1 },
    { row: 2, col: 2 },
  ],
  [
    { row: 0, col: 2 },
    { row: 1, col: 1 },
    { row: 2, col: 0 },
  ],
];

function Game() {
  const [grid, setGrid] = useState(Array(9).fill(INITIAL));
  const [player, setPlayer] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);
  const [draw, setDraw] = useState(false);
  const [winCount, setwinCount] = useState({ X: 0, O: 0 });

  function CheckWinner(currentPlayerPointers) {
    let WS = false; // WS is winning state
    let WPC = false; // WPC is winning point count

    //   let PPS = player ? playerPointers[1] : playerPointers[0]; // PPS  is player pointer set
    let PPS = player ? currentPlayerPointers[1] : currentPlayerPointers[0]; 
    for (let i = 0; i < winningCombinations.length; i++) {
      let WCS = winningCombinations[i]; //  WCS is winning count set
      for (let j = 0; j < WCS.length; j++) {
        let WSP = WCS[j];
        WSP = 0; // WSP is winning set pointer
        for (let a = 0; a < PPS.length; a++) {
          if (
            playerPointers.row === WSP.row &&
            playerPointers.col === WSP.col
          ) {
            WPC = WPC + 1;
          }
        }
        if (WPC === 3) {
          WS = true;
        }
      }
    }
    console.log(playerPointers);
    return WS;
  }

  function isGameOver() {
    
    if (!gameFinished) {
      // x win  condition 
      
      // draw Condition //
      //if (playerPointers[0].length + playerPointers[1].length == 9) {
      if (!grid.includes(INITIAL)) {
        setDraw(true);
        setGameFinished(true);
        console.log("DRAW");
      }
    }
  }

  isGameOver();
  function restartGame() {
    setGrid(Array(9).fill(INITIAL));
    setGameFinished(false);
    setDraw(false);
  }

  function handleClick(id) {
    setGrid(
      grid.map((item, index) => {
        if (index === id) {
          if (player) {
            return X_PLAYER;
          } else {
            return O_PLAYER;
          }
        } else {
          return item;
        }
      })
    );
    setPlayer(player ? 0 :  1);
    console.log(player);
  }

  return (
    <div>
      {gameFinished && (
        <Restart
          winCount={winCount}
          restartGame={restartGame}
          player={player}
          draw={draw}
        />
      )}

      <Square
        clickedArray={grid}
        handleClick={handleClick}
        onClick={CheckWinner}
      />
    </div>
  );
}
export default Game;
