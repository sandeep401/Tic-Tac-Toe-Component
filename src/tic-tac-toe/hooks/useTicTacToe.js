import { useState } from "react";


const Players = {
    A: 0,
    B: 1
}

// const PlayerIcon = {
//     [Players.A] : "X",
//     [Players.B] : "O"
// }

const DefaultTurns = {
    [Players.A] : [],
    [Players.B] : []
}

const WinningPatterns = ["012","345","678","036","147","258","048","246"]

function useTicTacToe(){
    const [activePlayer, setActivePlayer] = useState(Players.A);
    const [palyerTurns, setPlayerTurns] = useState(structuredClone(DefaultTurns))
    const [message, setMessage] = useState("")

    function handlePlayerTurn(index){
        return ()=>{
             const newPlayer =  activePlayer===Players.A ? Players.B :Players.A;
             const playerATurns = palyerTurns[Players.A]
             const playerBTurns = palyerTurns[Players.B]
 
             if(playerATurns.join("").includes(String(index))){
                 return;
             }else if(playerBTurns.join("").includes(String(index))){
                 return;
             }
             
             const oldPlayerTurns = structuredClone(palyerTurns)
             oldPlayerTurns[activePlayer].push(String(index))
 
             const isWon = isPlayerWon(oldPlayerTurns[activePlayer])
 
             if(isWon){
               
                setMessage(`Player ${activePlayer} won the game...`)
                
             }
 
             setPlayerTurns(oldPlayerTurns)
             setActivePlayer(newPlayer)
             
 
        }
     }
 
     function isPlayerWon(turns){
         const turnInStr = turns.sort().join("")
         const isWon = WinningPatterns.some(t => moreStrict(t, turnInStr))
         return isWon;
     }
 
     function moreStrict(singlePattern, turnInStr){
         return singlePattern.split("").every(p => turnInStr.includes(p))
     }
   
 
     function handleRestart(){
         setPlayerTurns(DefaultTurns)
         setActivePlayer(Players.A)
         setMessage("")
     }

     return {handlePlayerTurn, handleRestart, message, palyerTurns, activePlayer};
 
}

export default useTicTacToe;