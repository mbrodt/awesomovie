import React, { Component } from "react";
import Movie from "./Movie";
import { FocusedMovie } from "./FocusedMovie";

export class MovieList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="movie-container">
        {this.props.movies.map((movie, idx) => {
          return <Movie key={idx} movie={movie} />;
        })}
      </div>
    );
  }
}

export default MovieList;
