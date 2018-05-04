import React, { Component } from "react";
// import _ from "lodash";
import "./App.css";
import Header from "./components/Header";
import Movie from "./components/Movie";
import { WatchList } from "./components/WatchList";

class App extends Component {
  constructor() {
    super();
    this.state = {
      searchTerm: "action",
      loadingMovies: false,
      movies: [],
      genres: [],
      watchlist: [],
      errorState: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.removeFromWatchList = this.removeFromWatchList.bind(this);
    this.getMovies = this.getMovies.bind(this);
    this.addToWatchList = this.addToWatchList.bind(this);
  }

  handleChange(e) {
    let input = e.target.value;
    this.setState({
      searchTerm: input.toLowerCase()
    });
  }

  addToWatchList(movie) {
    this.setState(prevState => ({
      watchlist: [...prevState.watchlist, movie]
    }));
  }

  removeFromWatchList(movie) {
    let arr = [...this.state.watchlist];
    let index = arr.indexOf(movie);
    arr.splice(index, 1);
    this.setState({
      watchlist: arr
    });
  }

  resetState() {
    this.setState({
      errorState: false,
      movies: []
    });
    if (this.state.searchTerm === "") {
      this.setState({
        errorState: true
      });
    }
  }

  searchByGenre() {
    let genre_id = "";
    let findByGenre = false;
    this.state.genres.forEach(genre => {
      if (genre.name.toLowerCase() === this.state.searchTerm) {
        findByGenre = true;
        genre_id = genre.id;
      }
    });
    return { findByGenre: findByGenre, genre_id: genre_id };
  }

  setupUrl() {
    let { findByGenre, genre_id } = this.searchByGenre();
    const api_key = "api_key=394ba4836fb2f67bf883e42b3463c4d9";
    const base_url = "https://api.themoviedb.org/3/";
    const discover = "discover/movie?";
    const search = "search/movie?";
    const query = `&query=${this.state.searchTerm}`;
    let url = "";
    if (findByGenre) {
      url = `${base_url}${discover}${api_key}&with_genres=${genre_id}`;
    } else {
      url = `${base_url}${search}${api_key}${query}`;
    }
    return url;
  }

  getMovies() {
    this.resetState();
    if (this.state.searchTerm === "") return;
    let url = this.setupUrl();
    this.fetchData(url);
  }

  fetchData(url) {
    fetch(url)
      .then(res => res.json())
      .then(json => {
        let data = json.results;
        // We map over each movie object in the returned data array to only contain the data we want to use.
        let movies = data.map(movie => {
          //The genres for each movie is given as an id, but we want the string name of the genre, which is stored in state. So we map each genreId for each movie to their corresponding name in state by using "find" to match the IDs.
          let genres = movie.genre_ids.map(genreId => {
            let genre = this.state.genres.find(genre => genre.id === genreId);
            return genre.name;
          });
          return {
            title: movie.original_title,
            // runtime: json.runtime,
            description: movie.overview,
            release: movie.release_date,
            rating: movie.vote_average,
            posterTiny: "https://image.tmdb.org/t/p/w92" + movie.poster_path,
            posterSmall: "https://image.tmdb.org/t/p/w185" + movie.poster_path,
            posterLarge: "https://image.tmdb.org/t/p/w342" + movie.poster_path,
            genres: genres,
            isActive: false,
            onWatchlist: false
          };
        });
        this.postFetchUpdateState(movies);
      });
  }

  postFetchUpdateState(movies) {
    this.setState(prevState => ({
      movies: [...prevState.movies, ...movies],
      searchTerm: ""
    }));
  }

  render() {
    let error = this.state.errorState ? (
      <h1>Please search for a movie or category</h1>
    ) : (
      <div>
        <WatchList
          watchlist={this.state.watchlist}
          removeFromWatchList={this.removeFromWatchList}
        />

        <div className="movie-container">
          {this.state.movies.map((movie, idx) => {
            return (
              <Movie
                key={idx}
                movie={movie}
                addToWatchList={this.addToWatchList}
              />
            );
          })}
        </div>
      </div>
    );
    return (
      <div className="App">
        <Header
          getMovies={this.getMovies}
          handleChange={this.handleChange}
          searchTerm={this.state.searchTerm}
          watchlist={this.state.watchlist}
          removewatch={this.removeFromWatchList}
        />{" "}
        {error}
      </div>
    );
  }
  handleEnter(e) {
    if (e.code === "Enter") this.getMovies();
  }

  componentDidMount() {
    const input = document.querySelector("#main-input");
    input.addEventListener("keyup", this.handleEnter);
    const genreUrl =
      "https://api.themoviedb.org/3/genre/movie/list?api_key=394ba4836fb2f67bf883e42b3463c4d9";
    fetch(genreUrl)
      .then(res => res.json())
      .then(json => {
        this.setState(prevState => ({
          genres: [...prevState.genres, ...json.genres]
        }));
        console.log(this.state.genres);
      });
    this.getMovies();
  }
}

export default App;
