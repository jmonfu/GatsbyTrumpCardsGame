import goalie from "../../assets/decks/football/goalie.png"
import defender from "../../assets/decks/football/defender.png"
import midfielder from "../../assets/decks/football/midfielder.png"
import attacker from "../../assets/decks/football/attacker.png"
import joker from "../../assets/decks/football/joker.png"

export const deckFootball = () => {
  const deck = []
  const deckLimits = {
    joker: 4,
    goalkeepers: 12,
    defenders: 12,
    midfielders: 12,
    attackers: 12,
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

  const getRandomRating = (bottom, top) => {
    return Math.floor(Math.random() * (1 + top - bottom)) + bottom
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


  const generateCard = item => {
    const card = {
      title: item[0].toUpperCase() + item.substring(1),
      image: getImage(item),
      ratings: generateRatings(item),
    }

    //add this card to the deck
    deck.push(card)
  }

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




  return deck
}
