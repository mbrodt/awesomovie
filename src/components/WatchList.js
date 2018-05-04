import React, { Component } from "react";
import "./WatchList.css";

export class WatchList extends Component {
  watchListHeader() {
    let isEmpty = this.props.watchlist.length === 0;
    return isEmpty ? (
      <h2>Currently no movies in watchlist. Go add some!</h2>
    ) : (
      <h2 className="watchlist-header">Your watchlist: </h2>
    );
  }
  render() {
    return (
      <div className="watchlist">
        {this.watchListHeader()}
        <ul className="watchlist-content">
          {this.props.watchlist.map(movie => {
            return (
              <li
                className="watchlist-movie"
                onClick={() => {
                  this.props.removeFromWatchList(movie);
                }}
              >
                <img src={movie.posterTiny} alt="" />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default WatchList;
