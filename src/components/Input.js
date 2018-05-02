import React, { Component } from "react";
import "./Input.css";

export class Input extends Component {
  render() {
    return (
      <div className="box">
        <div className="main-container">
          <h1>Awesomovie</h1>
          <h2>The quickest and easiest way to browse your favourite movies</h2>

          <input
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
      </div>
    );
  }
}

export default Input;
