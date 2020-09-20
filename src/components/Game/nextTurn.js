import React from 'react'

const NextTurn = ({ disableNextTurn, doNextTurn }) => {
    
    return (
        <>
        <div className="row">
        <div className="col-md-6 text-center">
          <button
            id="nextTurnBtn"
            name="NextTurnButton"
            className="btn btn-secondary"
            onClick={() =>
                doNextTurn({
                  nextTurn: true,
                  reStart: false
                })
              }          
            disabled={disableNextTurn}
          >
            Next Turn
          </button>
        </div>
        <div className="col-md-6 text-center">
          <button
            id="reStartGameBtn"
            name="ReStartGameButton"
            className="btn btn-secondary"
            onClick={() =>
                doNextTurn({
                  nextTurn: false,
                  reStart: true
                })
              }          
          >
            ReStart Game
          </button>
        </div>
      </div>        
        </>
    )
}

export default NextTurn;