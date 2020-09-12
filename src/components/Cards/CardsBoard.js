import React from "react"
import Card from './Card';

import joker from '../../assets/joker.png';
import goalie from '../../assets/goalie.png';
import defender from '../../assets/defender.png';
import midfielder from '../../assets/midfielder.png';
import attacker from '../../assets/attacker.png';

const CardsBoard = () => {

const cardInfo1 = {
  player: 1,
  image: goalie, 
  title: "Goalkeeper", 
  ratings: [
    {title: "Handling", rating: "99"},
    {title: "Reflexes", rating: "99"},
    {title: "Defending", rating: "99"},
    {title: "Strength", rating: "99"},
    {title: "Passing", rating: "99"},
    {title: "Flair", rating: "99"},
    {title: "Finishing", rating: "99"},
    {title: "Composure", rating: "99"},
  ]
}

const cardInfo2 = {
  player: 2,
  image: defender, 
  title: "Defender",
  ratings: [
    {title: "Handling", rating: "80"},
    {title: "Reflexes", rating: "80"},
    {title: "Defending", rating: "80"},
    {title: "Strength", rating: "80"},
    {title: "Passing", rating: "80"},
    {title: "Flair", rating: "80"},
    {title: "Finishing", rating: "80"},
    {title: "Composure", rating: "80"},
  ]
}

  return (
    <div className="container-fluid justify-content-center">
      <div className="row">
        <div className="col-md-6">
          <div>
            <h4>Player 1</h4>
          </div>
          <Card cardInfo={cardInfo1} />
        </div>
        <div className="col-md-6">
          <h4>Player 2</h4>
          <Card cardInfo={cardInfo2}/>
        </div>
      </div>
      <div className="row top-buffer">
        <div className="col-md-12 text-center">
          <button id="startGameBtn" name="StartGameButton" className="btn btn-secondary">START GAME</button> 
        </div>
      </div>
    </div>
  )
}

export default CardsBoard
