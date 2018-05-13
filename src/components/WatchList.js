import React, { Component } from "react";
import "./WatchList.css";

export class WatchList extends Component {
  // This method figures out if there are any movies on the watchlist currently.
  // If not, tell the user to add some. If yes, display an SVG and some text.
  watchListHeader() {
    let isEmpty = this.props.watchlist.length === 0;
    return isEmpty ? (
      <h2>Currently no movies in watchlist. Go add some!</h2>
    ) : (
      <h2 className="watchlist-header">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLineJoin="round"
          className="feather feather-film"
        >
          <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
          <line x1="7" y1="2" x2="7" y2="22" />
          <line x1="17" y1="2" x2="17" y2="22" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <line x1="2" y1="7" x2="7" y2="7" />
          <line x1="2" y1="17" x2="7" y2="17" />
          <line x1="17" y1="17" x2="22" y2="17" />
          <line x1="17" y1="7" x2="22" y2="7" />
        </svg>{" "}
        Your watchlist:
      </h2>
    );
  }

  render() {
    return (
      <div className="watchlist">
        {this.watchListHeader()}
        <ul className="watchlist-content">
          {/* Loop over each item in the watchlist and display their poster in a list item */}
          {this.props.watchlist.map((movie, idx) => {
            return (
              <li
                key={idx}
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
