import React, { Component } from "react";
// import _ from "lodash";
import "./App.css";
import Header from "./components/Header";
import { WatchList } from "./components/WatchList";
import { MovieList } from "./components/MovieList";

class App extends Component {
  constructor() {
    super();
    this.state = {
      searchTerm: "action",
      loading: false,
      movies: [],
      genres: [],
      watchlist: [],
      error: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.removeFromWatchList = this.removeFromWatchList.bind(this);
    this.getMovies = this.getMovies.bind(this);
    this.addToWatchList = this.addToWatchList.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
    this.speechToText = this.speechToText.bind(this);
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
    this.saveToLocalStorage();
  }

  removeFromWatchList(movie) {
    let arr = [...this.state.watchlist];
    let index = arr.indexOf(movie);
    // Find the index of the movie in the array, and remove it
    arr.splice(index, 1);
    this.setState({
      watchlist: arr
    });
    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    // Wait 200ms because setState is async and we want to make sure it has finished before we put the changes in localstorage
    setTimeout(() => {
      localStorage.setItem("watchlist", JSON.stringify(this.state.watchlist));
    }, 200);
  }

  resetState() {
    this.setState({
      error: false,
      movies: []
    });
    if (this.state.searchTerm === "") {
      this.setState({
        error: true
      });
    }
  }

  toggleLoading() {
    this.setState(prevState => ({
      loading: !prevState.loading
    }));
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
    this.toggleLoading();
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
          return this.createMovie(movie, genres);
        });
        this.postFetchUpdateState(movies);
      });
  }

  createMovie(movie, genres) {
    return {
      title: movie.original_title,
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
  }

  postFetchUpdateState(movies) {
    this.setState(prevState => ({
      movies: [...prevState.movies, ...movies],
      searchTerm: ""
    }));
    this.toggleLoading();
  }

  render() {
    let error = this.state.error;
    return (
      <div className="App">
        <Header
          getMovies={this.getMovies}
          handleChange={this.handleChange}
          searchTerm={this.state.searchTerm}
          watchlist={this.state.watchlist}
          removewatch={this.removeFromWatchList}
        />{" "}
        {error && <h2>Please search for a movie or category</h2>}
        <WatchList
          watchlist={this.state.watchlist}
          removeFromWatchList={this.removeFromWatchList}
        />
        <MovieList
          movies={this.state.movies}
          addToWatchList={this.addToWatchList}
          loading={this.state.loading}
        />
      </div>
    );
  }
  handleEnter(e) {
    if (e.code === "Enter") this.getMovies();
  }

  speechToText(e) {
    const transcript = Array.from(e.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join("");
    if (e.results[0].isFinal) {
      console.log("is final: " + transcript);
      this.setState({
        searchTerm: transcript
      });
      this.getMovies();
    }
  }

  setupSpeech() {
    var SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
    recognition.addEventListener("result", this.speechToText);
    recognition.addEventListener("end", recognition.start);
    recognition.interimResults = true; // save the recorded words while talking
    recognition.start();
  }

  componentDidMount() {
    let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    this.setState({
      watchlist: watchlist
    });
    // var SpeechRecognition =
    //   window.SpeechRecognition || window.webkitSpeechRecognition;
    this.setupSpeech();

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
