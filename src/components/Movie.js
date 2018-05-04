import React, { Component } from "react";
import "./Movie.css";
import { FocusedMovie } from "./FocusedMovie";

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
    this.props.addToWatchList(this.props.movie);
  }

  render() {
    let focused = this.state.isActive ? (
      <FocusedMovie
        movie={this.props.movie}
        toggleFocus={this.toggleFocus}
        addToWL={this.addToWL}
      />
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
