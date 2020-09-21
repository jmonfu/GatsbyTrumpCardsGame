import React from "react"
import empty from "../../assets/decks/football/empty.png"

const Card = ({ cardInfo, player, onClick, showCard, clickableRatings, highestRatingPl2, computerControlled, winnerPl1, selectedRatingPl1 }) => {

  let displayTitleHighlight = false;
  let displayRatingHighlight = false;
  let titleHightlightPl1 = "";
  let titleHightlightPl2 = "";
  let ratingHightlightPl2 = "";

  // if winner 1 and selectedRatingPl1 or   //computerControlled && !winnerPl1
  if ((winnerPl1 && selectedRatingPl1) || (computerControlled && !winnerPl1)) {
    if (winnerPl1) {
      //we want to highlight both titles and ratings
      titleHightlightPl1 = selectedRatingPl1.title;
    } else {
      //we only want to hightlight the title and matching rating
      titleHightlightPl2 = highestRatingPl2.title;
      ratingHightlightPl2 = highestRatingPl2.rating;    
    }
    displayTitleHighlight = true;
    displayRatingHighlight = true;
  }


  const evenRatingRows = cardInfo.ratings.reduce(function (rows, key, index) {
    return (
      (index % 2 === 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) &&
      rows
    )
  }, [])

  return (
    <div className="card text-center shadow">
      {showCard ? <h4 className="card-title">{cardInfo.title}</h4> : null}

      <div>
        {showCard ? (
          <img
            src={cardInfo.image}
            alt={cardInfo.title}
            className="card-image"
          />
        ) : (
          <img src={empty} alt="" className="card-image" />
        )}
      </div>

      {showCard ? (
        <div className="card-body text-dark">
          <div className="container-fluid justify-content-center card-rating-text">
            {evenRatingRows.map(row => (
              <div className="row card-body-row-style" key={row[0].title}>
                {
                  (
                    (displayTitleHighlight && ((titleHightlightPl1 === row[0].title) 
                      || (titleHightlightPl2 === row[0].title) )) ?
                    (<div className="col-md-4 text-left card-rating-computer-selected">{row[0].title}</div>)
                    :
                    (<div className="col-md-4 text-left">{row[0].title}</div>)
                  )
                }
                
                {clickableRatings ? (
                  <div
                    className="col-md-2 text-center card-rating-focused"
                    onClick={() =>
                      onClick({
                        player: player,
                        title: row[0].title,
                        rating: row[0].rating,
                      })
                    }
                  >
                    {row[0].rating}
                  </div>
                ) : 
                (
                  // here we are saying either the rating of player 2 = rowRating, or else
                  // the title of player 1 = the row title (in case Player 1 is the winner)
                  (displayRatingHighlight && ((ratingHightlightPl2 === row[0].rating 
                      || (titleHightlightPl1 === row[0].title))))
                  ?
                  (<div className="col-md-2 text-center card-rating-computer-selected-rating">{row[0].rating}</div>)
                  :
                  (<div className="col-md-2 text-center card-rating-normal">{row[0].rating}</div>)
                )
              }
                {
                  displayTitleHighlight && ( (titleHightlightPl1 === row[1].title) 
                    || (titleHightlightPl2 === row[1].title) ) ?
                    <div className="col-md-4 text-left card-rating-computer-selected">{row[1].title}</div>
                    :
                    <div className="col-md-4 text-left">{row[1].title}</div>
                  }
                
                {clickableRatings ? (
                  <div
                    className="col-md-2 text-center card-rating-focused"
                    onClick={() =>
                      onClick({
                        player: player,
                        title: row[1].title,
                        rating: row[1].rating,
                      })
                    }
                  >
                    {row[1].rating}
                  </div>
                ) : 
                (
                  // here we are saying either the rating of player 2 = rowRating, or else
                  // the title of player 1 = the row title (in case Player 1 is the winner)
                  (displayTitleHighlight && ((ratingHightlightPl2 === row[1].rating) 
                    || (titleHightlightPl1 === row[1].title)))
                  ?
                  (<div className="col-md-2 text-center card-rating-computer-selected-rating">{row[1].rating}</div>)
                  :
                  (<div className="col-md-2 text-center card-rating-normal">{row[1].rating}</div>)
                )}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Card
