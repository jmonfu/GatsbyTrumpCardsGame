import React, { useState, useEffect } from "react";
import Card from "./Card";
import {deckFootball} from '../../decks/football/deck_football';
import { processClick } from '../../helpers/game_processing';

const CardsBoard = () => {
  const [ratingObj, setRatingObj] = useState({})
  const [visiblePl1, setVisiblePl1] = useState(false)
  const [visiblePl2, setVisiblePl2] = useState(false)
  const [loading, setLoading] = useState(true)
  const [player1Card, setPlayer1Card] = useState({})
  const [player2Card, setPlayer2Card] = useState({})
  const [player1Deck, setPlayer1Deck] = useState([])
  const [player2Deck, setPlayer2Deck] = useState([])
  const [message, setMessage] = useState("")
  const [winnerPl1, setWinnerPlayer1] = useState(false)
  const [disableNextTurn, setDisableNextTurn] = useState(false)
  const [clickableRatings, setClickableRatings] = useState(false)

  const deck = deckFootball();
  let deck1 = []
  let deck2 = []
  let currCardPl1 = {}
  let currCardPl2 = {}

  useEffect(() => {
    doRatingClickProcessing()
  }, [ratingObj])

  const doRatingClickProcessing = () => {
    const { player, title, rating } = ratingObj
    if (player) {
      const [deck1Prop, deck2Prop, messageProp, winnerPl1Prop] = 
        processClick(ratingObj, player1Card, player2Card, player1Deck, player2Deck);

      setVisiblePl1(true);
      setVisiblePl2(true);
      setMessage(messageProp);
      setPlayer1Deck(deck1Prop);
      setPlayer2Deck(deck2Prop);
      setWinnerPlayer1(winnerPl1Prop);

      if (player1Deck.length > 0 && player2Deck.length > 0){
        setDisableNextTurn(false)
      } 
      setClickableRatings(false)

    }
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
      setVisiblePl1(true)
      setVisiblePl2(false)
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
      // setVisiblePl1(true)
      // setVisiblePl2(false)
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
      // setVisiblePl1(false)
      // setVisiblePl2(true)
    }
  }

  return (
    <div className="container-fluid justify-content-center">
      <div className="row">
        <div className="col-md-12 text-center">{message}</div>
      </div>
      { 
        message ? (
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
              showCard={visiblePl1}
              clickableRatings = {clickableRatings}
              onClick={ratingObj => setRatingObj(ratingObj)}
            />
          </div>
          <div className="col-md-6">
            <h4>Player 2 - {player2Deck.length} cards left</h4>
            <Card
              cardInfo={player2Card}
              player={2}
              showCard={visiblePl2}
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
