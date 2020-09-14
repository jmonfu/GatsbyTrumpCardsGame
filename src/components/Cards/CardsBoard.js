import React, { useState, useEffect } from "react"
import Card from "./Card"

import joker from "../../assets/joker.png"
import goalie from "../../assets/goalie.png"
import defender from "../../assets/defender.png"
import midfielder from "../../assets/midfielder.png"
import attacker from "../../assets/attacker.png"

const CardsBoard = () => {
  const [ratingObj, setRatingObj] = useState({})
  const [visible1, setVisible1] = useState(false)
  const [visible2, setVisible2] = useState(false)
  const [loading, setLoading] = useState(true)
  const [player1Card, setPlayer1Card] = useState({})
  const [player2Card, setPlayer2Card] = useState({})

  useEffect(() => {
    doRatingClickProcessing()
  }, [ratingObj])

  const deck = []
  let currCardPl1 = {}
  let currCardPl2 = {}

  const deckLimits = {
    joker: 4,
    goalkeepers: 12,
    defenders: 12,
    midfielders: 12,
    attackers: 12,
  }

  const doRatingClickProcessing = () => {
    const { player, title, rating } = ratingObj

    if (player === 1) {
      // reveal opp card
      setVisible2(true)
      // get the same value id
      let searchRatingByTitle = currCardPl2.ratings.filter(v =>
        v.title.includes(title)
      )
      if (searchRatingByTitle[0].rating <= rating) {
        console.log("player1 wins")
      } else {
        console.log("player2 wins")
      }

      // if value is +ve then holding player wins (gets opponent card)
      // if value is -ve opponent wins (looses card to opponent)
      // if draw opp wins (looses card to opponent)
      // Add or subtract the card counter for both players
    }
  }

  const startGame = () => {
    //generate the card’s values
    generateDeck()
    distributeCards()
  }

  const distributeCards = () => {
    //randomize the deck
    deck.sort(() => Math.random() - 0.5)
    //distribute 26 cards at random when the game start
    const deck1 = deck.slice(0, 26)
    const deck2 = deck.slice(26, 52)

    //queue the first card to Player 1
    currCardPl1 = deck1[0]
    currCardPl1.player = 1
    //queue the first card to Player 2
    currCardPl2 = deck2[0]
    currCardPl2.player = 2

    setPlayer1Card(currCardPl1)
    setPlayer2Card(currCardPl2)

    if (player1Card.title !== "" && player2Card.title !== "") {
      setLoading(false)
      //unMask ratings of Player 1
      setVisible1(true);
      setVisible2(false);
    }
  }

  const generateDeck = () => {
    for (let i = 0; i < deckLimits.joker; i++) {
      generateCard("joker")
    }
    for (let i = 0; i < deckLimits.goalkeepers; i++) {
      generateCard("goalkeeper")
    }
    for (let i = 0; i < deckLimits.defenders; i++) {
      generateCard("defender")
    }
    for (let i = 0; i < deckLimits.midfielders; i++) {
      generateCard("midfielder")
    }
    for (let i = 0; i < deckLimits.attackers; i++) {
      generateCard("attacker")
    }
  }

  const generateCard = item => {
    const card = {
      title: item[0].toUpperCase() + item.substring(1),
      image: getImage(item),
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

    //add this card to the deck
    deck.push(card)
  }

  const getImage = item => {
    switch (item) {
      case "joker":
        return joker
      case "goalkeeper":
        return goalie
      case "defender":
        return defender
      case "midfielder":
        return midfielder
      case "attacker":
        return attacker
      default:
        break
    }
  }

  return (
    <div className="container-fluid justify-content-center">
      {loading ? (
        <div className="row">
          <div className="col-md-12"></div>
        </div>
      ) : (
        <div className="row">
          <div className="col-md-6">
            <div>
              <h4>Player 1</h4>
            </div>
            <Card
              cardInfo={player1Card}
              showRatings={visible1}
              onClick={ratingObj => setRatingObj(ratingObj)}
            />
          </div>
          <div className="col-md-6">
            <h4>Player 2</h4>
            <Card
              cardInfo={player2Card}
              showRatings={visible2}
              onClick={ratingObj => setRatingObj(ratingObj)}
            />
          </div>
        </div>
      )}

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
