import React from 'react'
import useTicTacToe from './hooks/useTicTacToe'
import "./style.css"

const Players = {
    A: 0,
    B: 1
}

const PlayerIcon = {
    [Players.A] : "X",
    [Players.B] : "O"
}

function TicTacToe() {

    const buttons = Array.from(new Array(9))

    const {handlePlayerTurn, handleRestart, message, palyerTurns, activePlayer} = useTicTacToe()

  return (
    <div className='tic-tac-toe'>
        {
            buttons?.map((_, index)=>{
                const otherPlayer = activePlayer===Players.A ? Players.B :Players.A;
                const currentPlayerTurns = palyerTurns[activePlayer]
                const otherPlayerTurns = palyerTurns[otherPlayer]
                let icon = ""

                if(currentPlayerTurns.join("").includes(String(index))){
                    icon = PlayerIcon[activePlayer]
                }else if(otherPlayerTurns.join("").includes(String(index))){
                    icon = PlayerIcon[otherPlayer]
                }
                return <button key={index} onClick={handlePlayerTurn(index)}>{icon}</button>
            })
        }

        {!!message && (
            <div className='message'>
                <h3>{message}</h3>
                <button className='restart-btn' onClick={handleRestart}>Restart</button>
            </div>
        )}
    </div>
  )
}

export default TicTacToe