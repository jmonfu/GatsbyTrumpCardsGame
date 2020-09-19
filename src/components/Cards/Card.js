import React from "react"
import empty from "../../assets/decks/football/empty.png"

const Card = ({ cardInfo, player, onClick, showCard, clickableRatings }) => {

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
                <div className="col-md-4 text-left">{row[0].title}</div>
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
                ) : (
                  <div className="col-md-2 text-center card-rating-normal">{row[0].rating}</div>
                )}
                <div className="col-md-4 text-left">{row[1].title}</div>
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
                ) : (
                  <div className="col-md-2 text-left card-rating-normal">{row[1].rating}</div>
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
