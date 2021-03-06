export const processClick = (ratingObj, player1Card, player2Card, deck1, deck2) => {
  const { player, title, rating } = ratingObj
  let visible1 = false
  let visible2 = false
  let message = ""
  let winnerPlayer1 = false

  if (player === 1) {
    // reveal opp card
    visible2 = true
    // get the same value id
    let searchRatingByTitle = player2Card.ratings.filter(v =>
      v.title.includes(title)
    )
    if (searchRatingByTitle[0].rating < rating) {
      //player 1 wins!
      [message, winnerPlayer1, deck1, deck2] = 
        setWinner("Player 1 Wins!!", true, deck1, deck2, player1Card)
    } else {
      //player 2 wins!
      [message, winnerPlayer1, deck2, deck1] = 
        setWinner("Player 2 Wins!!", false, deck2, deck1, player2Card)
    }
  }

  if (player === 2) {
      visible1 = true
      // get the same value id
      let searchRatingByTitle = player1Card.ratings.filter(v =>
        v.title.includes(title)
      )
      if (searchRatingByTitle[0].rating < rating) {
        //player 2 wins!
        [message, winnerPlayer1, deck2, deck1] = 
          setWinner("Player 2 Wins!!", false, deck2, deck1, player1Card)
      } else {
        //player 1 wins!
        [message, winnerPlayer1, deck1, deck2] = 
          setWinner("Player 1 Wins!!", true, deck1, deck2, player2Card)
      }
  }

  return [deck1, deck2, message, winnerPlayer1]
}

export const distributeCards = deck => {
  //randomize the deck
  deck.sort(() => Math.random() - 0.5)
  //distribute 26 cards at random when the game start
  let deck1 = deck.slice(0, 26)
  let deck2 = deck.slice(26, 52)

  //queue the first card to Player 1
  let currCardPl1 = deck1[0]
  //queue the first card to Player 2
  let currCardPl2 = deck2[0]
  
  return [deck1, deck2, currCardPl1, currCardPl2]
}

function setWinner (message, winnerPlayer1, deckToIncrease, deckToDecrease, card) {
    message = message
    winnerPlayer1 = winnerPlayer1
    deckToIncrease.push(card)
    deckToDecrease.splice(0, 1)
    return[message, winnerPlayer1, deckToIncrease, deckToDecrease]
}
