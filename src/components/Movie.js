import React, { Component } from "react";
import "./Movie.css";

class Movie extends Component {
  constructor(props) {
    super(props);
    let isActive = props.movie.isActive;
    this.state = {
      isActive: props.movie.isActive
    };
    console.log(this.state.isActive);
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
    // console.log(this.props.movie);
    // this.setState({});
    if (this.state.isActive) {
      return (
        <div className="wrapper" onClick={this.toggleFocus}>
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
    } else {
      return (
        <div className="Movie" onClick={this.toggleFocus}>
          <h3>{this.props.movie.title}</h3>
          <img src={this.props.movie.posterSmall} alt="" />
        </div>
      );
    }
  }
}

export default Movie;
