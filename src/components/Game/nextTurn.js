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
                  nextTurnProp: true,
                  reStartProp: false
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
                  nextTurnProp: false,
                  reStartProp: true
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