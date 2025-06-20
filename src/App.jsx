import React, {useState , useEffect} from 'react';
import './App.css'

function TicTacToe() {
   const emptyBoard = Array(9).fill("");
   const [board,setBoard] = useState(emptyBoard);
   const [currentPlayer,setCurrentPlayer] = useState("O")
   const [winner,setWinner] = useState(null)
   
   const handleCellClick = (index) => {
     

if (winner) {
   console.log("Jogo Finalizado");
   return;
}

if (board[index] !== "") {
 console.log("Posição já ocupada");
  return;
}
    setBoard(
  
    board.map((item, itemindex)=> itemindex === index ? currentPlayer : item));

    setCurrentPlayer(currentPlayer === "X" ? "O" : "X" );
   }

   const checkWinner = () => {
    const possibleWaystoWin = [
      [board[0], board[1], board[2]],
      [board[3], board[4], board[5]],
      [board[6], board[7], board[8]],

      [board[0], board[3], board[6]],
      [board[1], board[4], board[7]],
      [board[2], board[5], board[8]],

      [board[0], board[4], board[8]],      
      [board[2], board[4], board[6]],        
      
    ];
     possibleWaystoWin.forEach(cells => {
       if (cells.every(cell => cell === "O")) setWinner("0")
       if (cells.every(cell => cell === "X")) setWinner("X")
     }); 

     checkDraw();
   }

    const checkDraw = () => {
      if(board.every(item => item !== "")) {
         setWinner("E")                                       // empate
      }
    }

   useEffect(checkWinner,[board]);
   
  const resetGame = () => {
    setCurrentPlayer("O");
    setBoard(emptyBoard);
    setWinner(null);
   }
  return (
    <main>  
       <h1 className='title'>jogo da velha</h1>

       <div className= {`board ${winner ? "gamer-over" : ""}`} >
        {board.map((item, index) => (
          <div 
          key = {index}
          className={`cell ${item}`}
          onClick={() =>handleCellClick(index)}
          >
          {item}
          </div>
        ))}
            
      {winner && (
      <footer>
        
        {winner === "E" ?  
        <h2 className='winner-mensagem'>
        <span className={winner}>Empatou</span> 
        </h2>
        :
        <h2 className='winner-mensagem'>
        <span className={winner}>{winner}</span> venceu !
          </h2>
        }
      <button onClick={resetGame}>Reiniciar</button>
      </footer>
      )}
   </div>
</main>
  );}
export default TicTacToe;
