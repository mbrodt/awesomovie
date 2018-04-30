import React, { Component } from "react";

export class FocusedMovie extends Component {
  render() {
    return (
      <div className="wrapper" onClick={this.props.toggleFocus}>
        <div className="focused-movie">
          <img src={this.props.movie.posterLarge} alt="" />
          <div>
            <div>
              <h2>{this.props.movie.title}</h2>
              <p>{this.props.movie.release}</p>
            </div>
            <p>{this.props.movie.description}</p>
            <p>Rating: {this.props.movie.rating}</p>
            {/* <div className="genres">
              {this.props.movie.genres.map((genre, idx) => {
                return <span>{genre}</span>;
              })}
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default FocusedMovie;
