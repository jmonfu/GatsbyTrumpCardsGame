import React from "react";

const Card = props => {
  return (
    <div className="card text-center shadow">
      <h4 className="card-title">{props.title}</h4>
      <div className="overflow">
        <img src={props.imgsrc} alt="joker" className="card-image"/>
      </div>
      <div className="card-body text-dark">
        <div className="container-fluid justify-content-center card-rating-text">
        <div className="row">
          <div className="col-md-4 text-left">Handling</div>
          <div className="col-md-2 text-left card-rating-color">99</div>
          <div className="col-md-4 text-left">Reflexes</div>
          <div className="col-md-2 text-left card-rating-color">99</div>
        </div>
        <div className="row">
          <div className="col-md-4 text-left">Defending</div>
          <div className="col-md-2 text-left card-rating-color">99</div>
          <div className="col-md-4 text-left">Strength</div>
          <div className="col-md-2 text-left card-rating-color">99</div>
        </div>
        <div className="row">
          <div className="col-md-4 text-left">Passing</div>
          <div className="col-md-2 text-left card-rating-color">99</div>
          <div className="col-md-4 text-left">Flair</div>
          <div className="col-md-2 text-left card-rating-color">99</div>
        </div>
        <div className="row">
          <div className="col-md-4 text-left">Finishing</div>
          <div className="col-md-2 text-left card-rating-color">99</div>
          <div className="col-md-4 text-left">Composure</div>
          <div className="col-md-2 text-left card-rating-color">99</div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Card
