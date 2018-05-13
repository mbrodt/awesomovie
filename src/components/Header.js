import React, { Component } from "react";
import "./Header.css";

export class Header extends Component {
  render() {
    return (
      <div className="box">
        <div className="main-container">
          <div className="titleinput">
            <h1>Awesomovie</h1>
            <h2>
              The easiest way to browse your favorite movies by title or
              category
            </h2>
            <input
              autoFocus
              id="main-input"
              type="text"
              value={this.props.searchTerm}
              onChange={this.props.handleChange}
            />
            <button id="search-btn" onClick={this.props.getMovies}>
              Find movies!
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
