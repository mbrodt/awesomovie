import React, { Component } from "react";
import Movie from "./Movie";

export class MovieList extends Component {
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
