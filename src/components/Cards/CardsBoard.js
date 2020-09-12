import React from "react"
import Card from './Card';

import joker from '../../assets/joker.png';
import goalie from '../../assets/goalie.png';
import defender from '../../assets/defender.png';
import midfielder from '../../assets/midfielder.png';
import attacker from '../../assets/attacker.png';

const CardsBoard = () => {
  const cardInfo = [
    { image: "", title: "", text: "" },
    { image: "", title: "", text: "" },
    { image: "", title: "", text: "" },
    { image: "", title: "", text: "" },
    { image: "", title: "", text: "" },
  ]

  return (
    <div className="container-fluid justify-content-center">
      <div className="row">
        <div className="col-md-6">
          <div>
            <h4>Player 1</h4>
          </div>
          <Card imgsrc={attacker} title="Attacker" />
        </div>
        <div className="col-md-6">
          <h4>Player 2</h4>
          <Card imgsrc={midfielder} title="Midfielder" />
        </div>
      </div>
      <div className="row top-buffer">
        <div className="col-md-12 text-center">
          <button id="startGameBtn" name="StartGameButton" class="btn btn-secondary">START GAME</button> 
        </div>
      </div>
    </div>
  )
}

export default CardsBoard
