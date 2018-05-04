import React, { Component } from "react";

export class WatchList extends Component {
  render() {
    return (
      <div className="watchlist">
        <h2 className="watchlist-header">Your watchlist:</h2>
        <ul className="watchlist-content">
          {this.props.watchlist.map(movie => {
            console.log(movie.onWatchlist);
            return (
              <li
                className="watchlist-movie"
                onClick={() => {
                  this.props.removeFromWatchList(movie);
                }}
              >
                <img src={movie.posterTiny} alt="" />
                {/* <div>
                  <h4>{movie.title}</h4>
                  <p>{movie.release}</p>
                </div> */}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default WatchList;
