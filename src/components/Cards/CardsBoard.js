import React, { useState, useEffect } from "react"
import Card from "./Card"

import joker from "../../assets/joker.png"
import goalie from "../../assets/goalie.png"
import defender from "../../assets/defender.png"
import midfielder from "../../assets/midfielder.png"
import attacker from "../../assets/attacker.png"

const CardsBoard = () => {

  const deckLimits = {
    joker: 4, goalkeepers: 12, defenders: 12, midfielders: 12, attackers: 12
  };

  const [ratingObj, setRatingObj] = useState({});
  const [visible1, setVisible1 ] = useState(false);
  const [visible2, setVisible2 ] = useState(false);
  const [deck, setDeck] = useState([]);
  const [deck1, setDeck1] = useState([]);
  const [deck2, setDeck2] = useState([]);
  const [currCardPl1, setCurrCardPl1] = useState({});
  const [currCardPl2, setCurrCardPl2] = useState({});

  useEffect(() => {
    generateDeck();
    distributeCards();
  }, []);

  useEffect(() => {
    doRatingClickProcessing()
  }, [ratingObj]);

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

  const doRatingClickProcessing = () => {
    const {player, title, rating} = ratingObj;

    if (player === 1){
      // reveal opp card
      setVisible2(true);
      // get the same value id
      let searchRatingByTitle = cardInfo2.ratings.filter(v => v.title.includes(title));
      if (searchRatingByTitle[0].rating <= rating) {
        console.log('player1 wins');
      } else {
        console.log('player2 wins');
      }

      // if value is +ve then holding player wins (gets opponent card)
      // if value is -ve opponent wins (looses card to opponent)
      // if draw opp wins (looses card to opponent)
      // Add or subtract the card counter for both players
    };
  }

  const startGame = () => {
    //reset decks
    setDeck([]);
    setDeck1([]);
    setDeck2([]);

    //generate the card’s values
    generateDeck();
    if (deck.length > 0) {
      //randomize the deck
      shuffleDeck();
      //distribute 26 cards at random when the game start
      distributeCards();
      //queue the first card to Player 1
      setCurrCardPl1(deck1[0]);      
      //queue the first card to Player 2
      setCurrCardPl2(deck2[0]);      

      if (currCardPl1 != undefined){
        console.log(currCardPl1);
        //unMask ratings of Player 1
        setVisible1(true);
        setVisible2(false);
      }
    }
  };

  const distributeCards = () => {
    const splitDeck1 = deck.slice(0, 26);
    const splitDeck2 = deck.slice(26, 52);

    //add this card to the deck
    splitDeck1.map((card) => {
      setDeck1(deck1 => [...deck1, card]);
    });

    //add this card to the deck
    splitDeck2.map((card) => {
      setDeck2(deck2 => [...deck2, card]);
    });
  };

  const shuffleDeck = () => {
    deck.sort(() => Math.random() - 0.5);
  };

  const generateDeck = () => {
    for (let i = 0; i < deckLimits.joker; i++) {
      generateCard('joker');
    };
    for (let i = 0; i < deckLimits.goalkeepers; i++) {
      generateCard('goalkeeper');
    };
    for (let i = 0; i < deckLimits.defenders; i++) {
      generateCard('defender');
    };
    for (let i = 0; i < deckLimits.midfielders; i++) {
      generateCard('midfielder');
    };
    for (let i = 0; i < deckLimits.attackers; i++) {
      generateCard('attacker');
    };
  }

  const generateCard = item => {
    const card = {
      player: 0,
      image: getImage(item),
      title: item.toUpperCase(),
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
    setDeck(deck => [...deck, card]);
  }

  const getImage = item => {
    switch (item) {
      case "joker":
          return joker;
      case "goalkeeper":
          return goalie;
      case "defender":
          return defender;
      case "midfielder":
          return midfielder;
      case "attacker":
          return attacker;
      default:
        break;
    }
  };

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
