import React, { Component } from "react";
import _ from "lodash";
import "./App.css";
import Input from "./components/Input";
import { MovieList } from "./components/MovieList";
import { FocusedMovie } from "./components/FocusedMovie";

class App extends Component {
  constructor() {
    super();
    this.state = {
      searchTerm: "action",
      loadingMovies: false,
      movies: [],
      genres: [],
      focusedMovie: undefined
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.getMovies = this.getMovies.bind(this);
  }

  handleChange(e) {
    let input = e.target.value;
    this.setState({ searchTerm: input.toLowerCase() });
  }

  getMovies() {
    this.setState({
      movies: []
    });
    let genre_id = "";
    let findByGenre = false;
    this.state.genres.forEach(genre => {
      if (genre.name.toLowerCase() === this.state.searchTerm) {
        findByGenre = true;
        genre_id = genre.id;
        // console.log(genre_id);
      }
    });
    const api_key = "api_key=394ba4836fb2f67bf883e42b3463c4d9";
    const base_url = "https://api.themoviedb.org/3/";
    const discover = "discover/movie?";
    const search = "search/movie?";
    const query = `&query=${this.state.searchTerm}`;
    // let url = `${base_url}${search}${api_key}${query}`;
    let url = "";
    if (findByGenre) {
      url = `${base_url}${discover}${api_key}&with_genres=${genre_id}`;
    } else {
      url = `${base_url}${search}${api_key}${query}`;
    }
    this.fetchData(url);
  }

  fetchData(url) {
    fetch(url)
      .then(res => res.json())
      .then(json => {
        let data = json.results;
        let movies = data.map(movie => {
          return {
            title: movie.original_title,
            // runtime: json.runtime,
            description: movie.overview,
            release: movie.release_date,
            rating: movie.vote_average,
            posterSmall: "https://image.tmdb.org/t/p/w185" + movie.poster_path,
            posterLarge: "https://image.tmdb.org/t/p/w342" + movie.poster_path,
            genres: movie.genre_ids,
            isActive: false
          };
        });
        this.setState(prevState => ({
          movies: [...prevState.movies, ...movies]
        }));
      });
  }

  render() {
    return (
      <div className="App">
        <h1>Awesomovie</h1>
        <h2>The quickest and easiest way to browse your favourite movies</h2>
        <Input
          getMovies={this.getMovies}
          handleChange={this.handleChange}
          searchTerm={this.state.searchTerm}
        />
        <MovieList movies={this.state.movies} />
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
        // console.log(this.state.genres);
      });
    this.getMovies();
  }
}

export default App;
