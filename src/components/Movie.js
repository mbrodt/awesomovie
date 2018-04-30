import React, { Component } from "react";
import "./Movie.css";
import { FocusedMovie } from "./FocusedMovie";

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: props.movie.isActive
    };
    this.toggleFocus = this.toggleFocus.bind(this);
  }
  toggleFocus() {
    // console.log(this.props.movie);
    this.setState({
      isActive: !this.state.isActive
    });
    console.log(this.state);
  }

  render() {
    let focused = this.state.isActive ? (
      <FocusedMovie
        movie={this.props.movie}
        toggleFocus={this.toggleFocus.bind(this)}
      />
    ) : (
      <div /> //TODO: better way to do this
    );
    return (
      <div>
        {focused} {/* //will render a focusedmovie if a movie is clicked on */}
        <div
          className="Movie"
          onClick={() => {
            this.toggleFocus();
          }}
        >
          <h3>{this.props.movie.title}</h3>
          <img src={this.props.movie.posterSmall} alt="" />
        </div>
      </div>
    );
  }
}

export default Movie;
