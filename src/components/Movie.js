import React, { Component } from "react";
import "./Movie.css";
import FocusedMovie from "./FocusedMovie";

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
  toggleFocus(e) {
    let test = e.target.classList;
    // Check if user clicked on the black background "wrapper" div or the watchlist button. If yes, remove focus. Otherwise, add focus.
    test.contains("wrapper") || test.contains("watchlist-btn")
      ? this.setState({
          isActive: false
        })
      : this.setState({
          isActive: true
        });
  }

  addToWL() {
    this.setState({
      onWatchlist: true
    });
    this.props.add(this.props.movie);
  }

  render() {
    let focused = this.state.isActive;
    return (
      <div>
        {focused && (
          <FocusedMovie
            // key={this.props.idx}
            movie={this.props.movie}
            toggleFocus={this.toggleFocus}
            addToWL={this.addToWL}
          />
        )}
        <div className="Movie" onClick={this.toggleFocus}>
          <h3>{this.props.movie.title}</h3>
          <img src={this.props.movie.posterSmall} alt="" />
        </div>
      </div>
    );
  }
}

export default Movie;
