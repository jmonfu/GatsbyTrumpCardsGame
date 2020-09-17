import React, { useState, useEffect } from "react"
import Card from "./Card"

import joker from "../../assets/joker_2.png"
import goalie from "../../assets/goalie_2.png"
import defender from "../../assets/defender.png"
import midfielder from "../../assets/midfielder_2.png"
import attacker from "../../assets/attacker_2.png"

const CardsBoard = () => {
  const [ratingObj, setRatingObj] = useState({})
  const [visible1, setVisible1] = useState(false)
  const [visible2, setVisible2] = useState(false)
  const [loading, setLoading] = useState(true)
  const [player1Card, setPlayer1Card] = useState({})
  const [player2Card, setPlayer2Card] = useState({})
  const [player1Deck, setPlayer1Deck] = useState([])
  const [player2Deck, setPlayer2Deck] = useState([])
  const [message, setMessage] = useState("")
  const [winnerPl1, setWinnerPlayer1] = useState(false)
  const [disableNextTurn, setDisableNextTurn] = useState(false)

  useEffect(() => {
    doRatingClickProcessing()
  }, [ratingObj])

  const deck = []
  let deck1 = []
  let deck2 = []
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
      let searchRatingByTitle = player2Card.ratings.filter(v =>
        v.title.includes(title)
      )
      if (searchRatingByTitle[0].rating <= rating) {
        //player 1 wins!
        setMessage("Player 1 Wins!!")
        setWinnerPlayer1(true)
        //win the card from player 2
        deck1 = player1Deck
        deck2 = player2Deck
        deck1.push(player2Card)
        deck2.splice(0, 1)
        setPlayer1Deck(deck1)
        setPlayer2Deck(deck2)
      } else {
        //player 2 wins!
        setMessage("Player 2 Wins!!")
        setWinnerPlayer1(false)
        //win the card from player 1
        deck1 = player1Deck
        deck2 = player2Deck
        deck2.push(player1Card)
        deck1.splice(0, 1)
        setPlayer1Deck(deck1)
        setPlayer2Deck(deck2)
      }
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
    deck1 = deck.slice(0, 26)
    deck2 = deck.slice(26, 52)

    //queue the first card to Player 1
    currCardPl1 = deck1[0]
    //queue the first card to Player 2
    currCardPl2 = deck2[0]

    setPlayer1Card(currCardPl1)
    setPlayer2Card(currCardPl2)
    setPlayer1Deck(deck1)
    setPlayer2Deck(deck2)

    if (player1Card.title !== "" && player2Card.title !== "") {
      setLoading(false)
      //unMask ratings of Player 1
      setVisible1(true)
      setVisible2(false)
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
      ratings: generateRatings(item),
    }

    //add this card to the deck
    deck.push(card)
  }

  const generateRatings = position => {
    const rating = []

    switch (position) {
      case "joker":
        rating.push({ title: "Handling", rating: getRandomRating(90, 99) })
        rating.push({ title: "Reflexes", rating: getRandomRating(90, 99) })
        rating.push({ title: "Defending", rating: getRandomRating(90, 99) })
        rating.push({ title: "Strength", rating: getRandomRating(90, 99) })
        rating.push({ title: "Passing", rating: getRandomRating(90, 99) })
        rating.push({ title: "Flair", rating: getRandomRating(90, 99) })
        rating.push({ title: "Finishing", rating: getRandomRating(90, 99) })
        rating.push({ title: "Composure", rating: getRandomRating(90, 99) })
        return rating
      case "goalkeeper":
        rating.push({ title: "Handling", rating: getRandomRating(80, 99) })
        rating.push({ title: "Reflexes", rating: getRandomRating(80, 99) })
        rating.push({ title: "Defending", rating: getRandomRating(20, 40) })
        rating.push({ title: "Strength", rating: getRandomRating(40, 80) })
        rating.push({ title: "Passing", rating: getRandomRating(20, 50) })
        rating.push({ title: "Flair", rating: getRandomRating(1, 20) })
        rating.push({ title: "Finishing", rating: getRandomRating(1, 20) })
        rating.push({ title: "Composure", rating: getRandomRating(50, 99) })
        return rating
      case "defender":
        rating.push({ title: "Handling", rating: getRandomRating(1, 20) })
        rating.push({ title: "Reflexes", rating: getRandomRating(1, 20) })
        rating.push({ title: "Defending", rating: getRandomRating(80, 99) })
        rating.push({ title: "Strength", rating: getRandomRating(80, 99) })
        rating.push({ title: "Passing", rating: getRandomRating(20, 50) })
        rating.push({ title: "Flair", rating: getRandomRating(1, 20) })
        rating.push({ title: "Finishing", rating: getRandomRating(1, 20) })
        rating.push({ title: "Composure", rating: getRandomRating(50, 90) })
        return rating
      case "midfielder":
        rating.push({ title: "Handling", rating: getRandomRating(1, 20) })
        rating.push({ title: "Reflexes", rating: getRandomRating(1, 20) })
        rating.push({ title: "Defending", rating: getRandomRating(10, 80) })
        rating.push({ title: "Strength", rating: getRandomRating(10, 80) })
        rating.push({ title: "Passing", rating: getRandomRating(80, 99) })
        rating.push({ title: "Flair", rating: getRandomRating(80, 99) })
        rating.push({ title: "Finishing", rating: getRandomRating(50, 90) })
        rating.push({ title: "Composure", rating: getRandomRating(50, 90) })
        return rating
      case "attacker":
        rating.push({ title: "Handling", rating: getRandomRating(1, 20) })
        rating.push({ title: "Reflexes", rating: getRandomRating(1, 20) })
        rating.push({ title: "Defending", rating: getRandomRating(1, 20) })
        rating.push({ title: "Strength", rating: getRandomRating(50, 90) })
        rating.push({ title: "Passing", rating: getRandomRating(50, 80) })
        rating.push({ title: "Flair", rating: getRandomRating(50, 80) })
        rating.push({ title: "Finishing", rating: getRandomRating(80, 99) })
        rating.push({ title: "Composure", rating: getRandomRating(80, 99) })
        return rating
      default:
        break
    }
  }

  const getRandomRating = (bottom, top) => {
    return Math.floor(Math.random() * (1 + top - bottom)) + bottom
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

  const nextTurn = () => {
    //switch off the Next Turn button
    setDisableNextTurn(true)
    if (winnerPl1) {
      //move the first card (active) to the back of the pack
      deck1 = player1Deck
      currCardPl1 = deck1[0]
      deck1.splice(0, 1)
      deck1.push(currCardPl1)
      setPlayer1Deck(deck1)
      // set new current card for Player 1
      setPlayer1Card(player1Deck[0])

      // set new current card for Player 2
      setPlayer2Card(player2Deck[0])
      //set the ratings invisible
      setVisible1(true)
      setVisible2(false)
    } else {
      //move the first card (active) to the back of the pack
      deck2 = player2Deck
      currCardPl2 = deck2[0]
      deck2.splice(0, 1)
      deck2.push(currCardPl2)
      setPlayer2Deck(deck2)
      // set new current card for Player 2
      setPlayer2Card(player2Deck[0])

      // set new current card for Player 1
      setPlayer1Card(player1Deck[0])
      //set the ratings invisible
      setVisible1(false)
      setVisible2(true)
    }
  }

  return (
    <div className="container-fluid justify-content-center">
      <div className="row">
        <div className="col-md-12 text-center">{message}</div>
      </div>
      {message !== "" ? (
        <div className="row">
          <div className="col-md-6 text-center">
            <button
              id="nextTurnBtn"
              name="NextTurnButton"
              className="btn btn-secondary"
              onClick={() => nextTurn()}
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
              onClick={() => startGame()}
            >
              ReStart Game
            </button>
          </div>
        </div>
      ) : (
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
      )}
      {loading ? (
        <div className="row">
          <div className="col-md-12"></div>
        </div>
      ) : (
        <div className="row">
          <div className="col-md-6">
            <div>
              <h4>Player 1 - {player1Deck.length}</h4>
            </div>
            <Card
              cardInfo={player1Card}
              player={1}
              showCard={visible1}
              onClick={ratingObj => setRatingObj(ratingObj)}
            />
          </div>
          <div className="col-md-6">
            <h4>Player 2 - {player2Deck.length}</h4>
            <Card
              cardInfo={player2Card}
              player={2}
              showCard={visible2}
              onClick={ratingObj => setRatingObj(ratingObj)}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default CardsBoard
