import React, { useState, useEffect } from "react";
import Card from "./Card";
import {deckFootball} from '../../decks/football/deck_football';

import joker from "../../assets/decks/football/joker.png"
import goalie from "../../assets/decks/football/goalie.png"
import defender from "../../assets/decks/football/defender.png"
import midfielder from "../../assets/decks/football/midfielder.png"
import attacker from "../../assets/decks/football/attacker.png"

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
  const [clickableRatings, setClickableRatings] = useState(false)

  useEffect(() => {
    doRatingClickProcessing()
  }, [ratingObj])

  const deck = deckFootball();
  let deck1 = []
  let deck2 = []
  let currCardPl1 = {}
  let currCardPl2 = {}

  const doRatingClickProcessing = () => {
    const { player, title, rating } = ratingObj

    if (player === 1) {
      // reveal opp card
      setVisible2(true)
      // get the same value id
      let searchRatingByTitle = player2Card.ratings.filter(v =>
        v.title.includes(title)
      )
      if (searchRatingByTitle[0].rating < rating) {
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

    if (player === 2) {
      // reveal opp card
      setVisible1(true)
      // get the same value id
      let searchRatingByTitle = player1Card.ratings.filter(v =>
        v.title.includes(title)
      )
      if (searchRatingByTitle[0].rating < rating) {
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
      } else {
        //player 1 wins!
        setMessage("Player 1 Wins!!")
        setWinnerPlayer1(true)
        //win the card from player 2"
        deck1 = player1Deck
        deck2 = player2Deck
        deck1.push(player2Card)
        deck2.splice(0, 1)
        setPlayer1Deck(deck1)
        setPlayer2Deck(deck2)
      }
    }

    if (player1Deck.length > 0 && player2Deck.length > 0){
      setDisableNextTurn(false)
    } 
    
    setClickableRatings(false)

  }

  const startGame = () => {
    //generate the card’s values
    distributeCards()
    setClickableRatings(true)
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

  const nextTurn = () => {
    //switch off the Next Turn button
    setDisableNextTurn(true)
    setClickableRatings(true)

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
              <h4>Player 1 - {player1Deck.length} cards left</h4>
            </div>
            <Card
              cardInfo={player1Card}
              player={1}
              showCard={visible1}
              clickableRatings = {clickableRatings}
              onClick={ratingObj => setRatingObj(ratingObj)}
            />
          </div>
          <div className="col-md-6">
            <h4>Player 2 - {player2Deck.length} cards left</h4>
            <Card
              cardInfo={player2Card}
              player={2}
              showCard={visible2}
              clickableRatings = {clickableRatings}
              onClick={ratingObj => setRatingObj(ratingObj)}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default CardsBoard
