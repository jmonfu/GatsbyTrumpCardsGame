import React, { useState, useEffect } from "react"
import Card from "./Card"

import joker from "../../assets/joker.png"
import goalie from "../../assets/goalie.png"
import defender from "../../assets/defender.png"
import midfielder from "../../assets/midfielder.png"
import attacker from "../../assets/attacker.png"

const CardsBoard = () => {
  const [ratingObj, setRatingObj] = useState({});
  const [visible1, setVisible1 ] = useState(false);
  const [visible2, setVisible2 ] = useState(false);

  useEffect(() => {
    doProcessing()
  }, [ratingObj])

  const cardInfo1 = {
    player: 1,
    image: goalie,
    title: "Goalkeeper",
    ratings: [
      { title: "Handling", rating: "99" },
      { title: "Reflexes", rating: "99" },
      { title: "Defending", rating: "99" },
      { title: "Strength", rating: "99" },
      { title: "Passing", rating: "99" },
      { title: "Flair", rating: "99" },
      { title: "Finishing", rating: "99" },
      { title: "Composure", rating: "99" },
    ],
  }

  const cardInfo2 = {
    player: 2,
    image: defender,
    title: "Defender",
    ratings: [
      { title: "Handling", rating: "80" },
      { title: "Reflexes", rating: "80" },
      { title: "Defending", rating: "80" },
      { title: "Strength", rating: "80" },
      { title: "Passing", rating: "80" },
      { title: "Flair", rating: "80" },
      { title: "Finishing", rating: "80" },
      { title: "Composure", rating: "80" },
    ],
  }

  const doProcessing = () => {
    const {player, title, rating} = ratingObj;

    if (player === 1){
      // reveal opp card
      // get the same value id
      // deduct the value
      // if value is +ve then holding player wins (gets opponent card)
      // if value is -ve opponent wins (looses card to opponent)
      // if draw opp wins (looses card to opponent)
      // Add or subtract the card counter for both players
    };
  }

  const startGame = () => {
    setVisible1(true);
    setVisible2(false);
    //generate the card’s values
    //distribute 26 cards at random when the game start
    //queue the first card to Player 1
    //queue the first card to Player 2
    //unMask ratings of Player 1
  }

  return (
    <div className="container-fluid justify-content-center">
      <div className="row">
        <div className="col-md-6">
          <div>
            <h4>Player 1</h4>
          </div>
          <Card
            cardInfo={cardInfo1}
            showRatings={visible1}
            onClick={ratingObj => setRatingObj(ratingObj)}
          />
        </div>
        <div className="col-md-6">
          <h4>Player 2</h4>
          <Card
            cardInfo={cardInfo2}
            showRatings={visible2}
            onClick={ratingObj => setRatingObj(ratingObj)}
          />
        </div>
      </div>
      <div className="row top-buffer">
        <div className="col-md-12 text-center">
          <button
            id="startGameBtn"
            name="StartGameButton"
            className="btn btn-secondary"
            onClick={() => startGame()}
          >
            START GAME
          </button>
        </div>
      </div>
    </div>
  )
}

export default CardsBoard
