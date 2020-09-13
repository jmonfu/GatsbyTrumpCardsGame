import React from "react"

const Card = ({ cardInfo, onClick, showRatings }) => {

  const evenRatingRows = cardInfo.ratings.reduce(function (rows, key, index) { 
    return (index % 2 === 0 ? rows.push([key]) 
      : rows[rows.length-1].push(key)) && rows;
  }, []);

  return (
    <div className="card text-center shadow">
      <h4 className="card-title">{cardInfo.title}</h4>
      <div className="overflow">
        <img src={cardInfo.image} alt="joker" className="card-image" />
      </div>
      <div className="card-body text-dark">
        <div className="container-fluid justify-content-center card-rating-text">
          {
            evenRatingRows.map(row => ( 
            <div className="row" key={row[0].title}>
              <div className="col-md-4 text-left">{row[0].title}</div>
              { 
                showRatings ? 
                <div className="col-md-2 text-left card-rating-color" onClick={() => onClick({player: cardInfo.player, title: row[0].title, rating: row[0].rating})} >{row[0].rating}</div>
                  : 
                <div className="col-md-2 text-left" >??</div>
              }
              <div className="col-md-4 text-left">{row[1].title}</div>
              {
                showRatings ?
                <div className="col-md-2 text-left card-rating-color" onClick={() => onClick({player: cardInfo.player, title: row[1].title, rating: row[1].rating})}>{row[1].rating}</div>
                  : 
                <div className="col-md-2 text-left" >??</div>
              }
            </div>
            ))
          }          
        </div>
      </div>
    </div>
  )
}

export default Card
