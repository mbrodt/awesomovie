import React, { Component } from "react";
import "./Movie.css";
import { FocusedMovie } from "./FocusedMovie";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: props.movie.isActive,
      onWatchlist: props.movie.onWatchlist
    };
    this.toggleFocus = this.toggleFocus.bind(this);
    this.addToWL = this.addToWL.bind(this);
    // console.log("in construct ", this.props.addToWatchlist());
  }
  toggleFocus() {
    // console.log(this.props.movie);
    this.setState({
      isActive: !this.state.isActive
    });
  }

  addToWL() {
    this.setState({
      onWatchlist: true
    });
    this.props.add(this.props.movie);
  }

  render() {
    let focused = this.state.isActive ? (
      <div className="wrapper" onClick={this.toggleFocus}>
        <div className="focused-movie">
          <img src={this.props.movie.posterLarge} alt="" />
          <div className="focused-content">
            {/* <div> */}
            <h2>{this.props.movie.title}</h2>
            <p>{this.props.movie.release}</p>
            <div>
              <Rater
                total={10}
                rating={this.props.movie.rating}
                interactive={false}
              />{" "}
              <span>{this.props.movie.rating}/10 Stars</span>
            </div>
            <p>{this.props.movie.description}</p>
            <div className="genres">
              {this.props.movie.genres.map((genre, idx) => {
                return <div className="genre-card">{genre + " "}</div>;
              })}
            </div>
            <button className="watchlist-btn" onClick={this.addToWL}>
              Add to watchlist
            </button>
          </div>
        </div>
      </div>
    ) : (
      <div /> //TODO: better way to do this
    );
    return (
      <div>
        {focused} {/* //will render a focusedmovie if a movie is clicked on */}
        <div className="Movie" onClick={this.toggleFocus}>
          <h3>{this.props.movie.title}</h3>
          <img src={this.props.movie.posterSmall} alt="" />
        </div>
      </div>
    );
  }
}

export default Movie;
