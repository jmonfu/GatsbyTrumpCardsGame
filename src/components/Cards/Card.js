import React from "react"
import empty from "../../assets/decks/football/empty.png"

const Card = ({ cardInfo, player, onClick, showCard, clickableRatings, highestRatingPl2, computerControlled }) => {

  if (computerControlled && player === 2) {
    console.log("Player= " + player);
    console.log("highest Rating Pl 2 title= " + highestRatingPl2.title);
    console.log("highest Rating Pl 2 rating= " + highestRatingPl2.rating);  
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
                  computerControlled && highestRatingPl2.title === row[0].title ?
                    <div className="col-md-4 text-left card-rating-computer-selected">{row[0].title}</div>
                    :
                    <div className="col-md-4 text-left">{row[0].title}</div>
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
                  (computerControlled && highestRatingPl2.rating === row[0].rating)
                  ?
                  (<div className="col-md-2 text-center card-rating-computer-selected-rating">{row[0].rating}</div>)
                  :
                  (<div className="col-md-2 text-center card-rating-normal">{row[0].rating}</div>)
                )
              }
                {
                  computerControlled && highestRatingPl2.title === row[1].title ?
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
                  (computerControlled && highestRatingPl2.rating === row[1].rating)
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
