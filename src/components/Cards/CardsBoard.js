import React, { useState, useEffect } from "react"
import Card from "./Card"
import { deckFootball } from "../../decks/football/deck_football"
import { processClick, distributeCards } from "../../helpers/game_processing"
import StartGame from "../Game/startGame"
import NextTurn from "../Game/nextTurn"

const CardsBoard = () => {
  const [ratingObj, setRatingObj] = useState({});
  const [startGameObj, setStartGameObj] = useState({});
  const [nextTurnObj, setNextTurnObj] = useState({});
  const [computerControlled, setComputerControlled] = useState(false);
  const [highestRatingPl2, setHighestRatingPl2] = useState({});
  const [visiblePl1, setVisiblePl1] = useState(false);
  const [visiblePl2, setVisiblePl2] = useState(false);
  const [loading, setLoading] = useState(true);
  const [player1Card, setPlayer1Card] = useState({});
  const [player2Card, setPlayer2Card] = useState({});
  const [player1Deck, setPlayer1Deck] = useState([]);
  const [player2Deck, setPlayer2Deck] = useState([]);
  const [message, setMessage] = useState("");
  const [winnerPl1, setWinnerPlayer1] = useState(false);
  const [disableNextTurn, setDisableNextTurn] = useState(false);
  const [clickableRatingsPl1, setClickableRatingsPl1] = useState(false);
  const [clickableRatingsPl2, setClickableRatingsPl2] = useState(false);
  const [startGameVisible, setStartGameVisible] = useState(true);
  const deck = deckFootball();

  const {nextTurnProp, reStartProp} = nextTurnObj;

  useEffect(() => {
    doRatingClickProcessing()
  }, [ratingObj])

  useEffect(() => {
    initializeGame()
  }, [startGameObj])

  useEffect(() => {
    nextTurn()
  }, [nextTurnObj])

  useEffect(() => {
    getHighestRating()
  }, [ratingObj])

  const initializeGame = () => {
    //generate the card’s values
    if (startGameObj.player1Name) {
      if (startGameObj.player2Name === "") {
        setComputerControlled(true);
      }
      setStartGameVisible(false)
      distributeCardsToPlayers()
      setClickableRatingsPl1(true)
      setClickableRatingsPl2(true)
    }

  }
  const distributeCardsToPlayers = () => {
    const [deck1, deck2, currCardPl1, currCardPl2] = distributeCards(deck)
    setPlayer1Card(currCardPl1)
    setPlayer2Card(currCardPl2)
    setPlayer1Deck(deck1)
    setPlayer2Deck(deck2)

    if (currCardPl1.title !== "" && currCardPl2.title !== "") {
      setLoading(false)
      //unMask ratings of Player 1
      setVisiblePl1(true)
      setVisiblePl2(false)
    }
  }

  const setDeckAndCurrCard = playerDeck => {
    //move the first card (active) to the back of the pack
    let currCard = playerDeck[0]
    playerDeck.splice(0, 1)
    playerDeck.push(currCard)
    let newCurrCard = playerDeck[0]
    return [playerDeck, newCurrCard]
  }

  const doRatingClickProcessing = () => {
    const { player, title, rating } = ratingObj
    if (player) {
      const [deck1Prop, deck2Prop, messageProp, winnerPl1Prop] = processClick(
        ratingObj,
        player1Card,
        player2Card,
        player1Deck,
        player2Deck
      )

      setVisiblePl1(true)
      setVisiblePl2(true)
      setMessage(messageProp)
      setPlayer1Deck(deck1Prop)
      setPlayer2Deck(deck2Prop)
      setWinnerPlayer1(winnerPl1Prop)

      if (player1Deck.length > 0 && player2Deck.length > 0) {
        setDisableNextTurn(false)
      }
      setClickableRatingsPl1(false)
      setClickableRatingsPl2(false)

    }
  }
  
  const PopulateDecks = () => {
    if (winnerPl1) {
      //move the first card (active) to the back of the pack
      const [playerDeck, newCurrCard] = setDeckAndCurrCard(player1Deck)
      setPlayer1Deck(playerDeck)
      // set new current card for Player 1
      setPlayer1Card(newCurrCard)

      // set new current card for Player 2
      setPlayer2Card(player2Deck[0])
      //set the ratings invisible
    } else {
      //move the first card (active) to the back of the pack
      const [playerDeck, newCurrCard] = setDeckAndCurrCard(player2Deck)
      setPlayer2Deck(playerDeck)
      // set new current card for Player 2
      setPlayer2Card(newCurrCard)
      getHighestRating();

      // set new current card for Player 1
      setPlayer1Card(player1Deck[0])
    }
  }

  const getHighestRating = () => {
    //set the ratings invisible
    if (computerControlled) {
      //get the highest rating on the card
      let pl2Ratings = player2Deck[0].ratings;
      let highestRating = pl2Ratings.sort((a, b) => b.rating - a.rating)[0];
      setHighestRatingPl2(highestRating);
    } else {
      setHighestRatingPl2({title: "", rating: 0});
    }
  }


  const nextTurn = () => {
    //populate the decks correctly
    if (reStartProp) {
      setMessage("");
      initializeGame();
    } else {
      PopulateDecks();

      //switch off the Next Turn button
      setDisableNextTurn(true)
      setClickableRatingsPl1(true)
      setClickableRatingsPl2(true)
  
      if (computerControlled) {
        setClickableRatingsPl2(false)
      } 
  
      setVisiblePl1(winnerPl1)
      setVisiblePl2(!winnerPl1)
 
    };

  }

  return (
    <div className="container-fluid justify-content-center">
      <div className="row">
        <div className="col-md-12 text-center">{message}</div>
      </div>
      {startGameVisible ? (
        <StartGame
          startGameData={startGameObj => setStartGameObj(startGameObj)}
        />
      ) : (
        <NextTurn 
          disableNextTurn={disableNextTurn}
          doNextTurn={nextTurnObj => setNextTurnObj(nextTurnObj)}      
        />
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
              clickableRatings={clickableRatingsPl1}
              onClick={ratingObj => setRatingObj(ratingObj)}
            />
          </div>
          <div className="col-md-6">
            <h4>Player 2 - {player2Deck.length} cards left</h4>
            <Card
              cardInfo={player2Card}
              player={2}
              showCard={visiblePl2}
              clickableRatings={clickableRatingsPl2}
              highestRatingPl2={highestRatingPl2}
              computerControlled={computerControlled}
              onClick={ratingObj => setRatingObj(ratingObj)}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default CardsBoard
