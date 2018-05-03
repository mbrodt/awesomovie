import React, { Component } from "react";
import "./Header.css";

export class Input extends Component {
  render() {
    return (
      <div className="box">
        <div className="main-container">
          <div className="titleinput">
            <h1>Awesomovie</h1>
            <h2>
              The quickest and easiest way to browse your favourite movies
            </h2>

            <input
              autoFocus
              id="main-input"
              type="text"
              // placeholder="Search for any movie or category"
              value={this.props.searchTerm}
              onChange={this.props.handleChange}
            />
            <button id="search-btn" onClick={this.props.getMovies}>
              Find movies!
            </button>
          </div>
          <div className="watchlist">
            <ul>
              {this.props.watchlist.map(movie => {
                console.log(movie.onWatchlist);
                return (
                  <li
                    onClick={() => {
                      this.props.removewatch(movie);
                    }}
                  >
                    {movie.title}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Input;
