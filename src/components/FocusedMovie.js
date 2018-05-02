import React, { Component } from "react";
// import rater from "rater-js";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";

export class FocusedMovie extends Component {
  render() {
    return (
      <div className="wrapper" onClick={this.props.toggleFocus}>
        <div className="focused-movie">
          <img src={this.props.movie.posterLarge} alt="" />
          <div className="focused-content">
            {/* <div> */}
            <h2>{this.props.movie.title}</h2>
            <p>{this.props.movie.release}</p>
            <Rater
              total={10}
              rating={this.props.movie.rating}
              interactive={false}
            />{" "}
            <span>{this.props.movie.rating}/10 Stars</span>
            {/* </div> */}
            <p>{this.props.movie.description}</p>
            <div className="genres">
              {this.props.movie.genres.map((genre, idx) => {
                return <div className="genre-card">{genre + " "}</div>;
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FocusedMovie;
