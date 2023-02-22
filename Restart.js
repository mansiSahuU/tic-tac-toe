import React from "react";

function Restart({  winCount, restartGame, player, draw }) {
  return (
    <div className="end-game-screen">
      {!draw && <span className="win-text">{player ? "O WINNER" : "X WINNER"}</span>}
      {draw && <span className="win-text">DRAW</span>}

      <span className="win-history">
        X WINS: {winCount.X}
        <br />
        O WINS: {winCount.O}
      </span>

      <button className="btn" onClick={restartGame}>
        RESTART GAME
      </button>
      
    </div>
  );
}

export default Restart;


