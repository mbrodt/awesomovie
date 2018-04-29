import React, { Component } from "react";

export class Input extends Component {
  render() {
    return (
      <div>
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
    );
  }
}

export default Input;
