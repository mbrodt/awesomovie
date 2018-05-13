import React, { Component } from "react";
import Movie from "./Movie";
import "./MovieList.css";

export class MovieList extends Component {
  add(movie) {
    this.props.addToWatchList(movie);
  }
  render() {
    let loading = this.props.loading;
    return (
      <div>
        {loading && <h2>Loading movies...</h2>}
        <div className="movie-container">
          {this.props.movies.map((movie, idx) => {
            return <Movie key={idx} movie={movie} add={this.add.bind(this)} />;
          })}
        </div>
      </div>
    );
  }
}

export default MovieList;
