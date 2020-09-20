import React, {useState} from "react"

const StartGame = ({ startGameData }) => {

    const [player1Name, setPlayer1Name] = useState("");
    const [player2Name, setPlayer2Name] = useState("");

  const handlePl1Change = (e) => {
    setPlayer1Name(e.target.value)
  } 

  const handlePl2Change = (e) => {
    setPlayer2Name(e.target.value)
  } 

  return (
    <>
      <div className="row top-buffer">
        <p>
          Select a 1 player or 2 player game by entering the names of Player 1
          and Player 2.
        </p>
      </div>

      <div className="row top-buffer">
        <div className="col-md-7 text-right form-group required">
            <input
                type="text"
                className="form-control"
                id="namePl1"
                placeholder="Player 1 Name"
                required="required"
                name="namePl1"
                value={player1Name}
                onChange={handlePl1Change}
            />
        </div>
        <div className="col-md-3 text-left">
          <button
            id="startGameBtn"
            name="StartGameButton"
            className="btn btn-secondary"
            disabled={player1Name.length < 3}
            onClick={() =>
                startGameData({
                  player1Name: player1Name,
                  player2Name: player2Name,
                  onePlayerGame: true,
                })
              }          
              >
            1 PLAYER GAME
          </button>
        </div>
      </div>
      <div className="row top-buffer">
        <div className="col-md-7 text-right">
          <input
            type="text"
            className="form-control"
            id="namePl2"
            placeholder="Player 2 Name"
            name="namePl1"
            value={player2Name}
            onChange={handlePl2Change}
          />
        </div>
        <div className="col-md-3 text-left">
          <button
            id="startGameBtn"
            name="StartGameButton"
            className="btn btn-secondary"
            disabled={player2Name.length < 3}
            onClick={() =>
                startGameData({
                  player1Name: player1Name,
                  player2Name: player2Name,
                  onePlayerGame: false,
                })
              }          
            >
            2 PLAYER GAME
          </button>
        </div>
      </div>
    </>
  )
}

export default StartGame
