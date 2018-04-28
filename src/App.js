import React, { Component } from "react";
import _ from "lodash";
import "./App.css";
import Movie from "./components/Movie";

class App extends Component {
  constructor() {
    super();
    this.state = {
      title: "Awesomovie",
      subtitle: "The quickest and easiest way to browse your favourite movies",
      searchTerm: "action",
      loadingMovies: false,
      movies: [],
      genres: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    // this.capitalizeFirstLetter = this.capitalizeFirstLetter.bind(this);
    this.getMovies = this.getMovies.bind(this);
  }

  handleChange(e) {
    let input = e.target.value;
    // let searchTerm = _.startCase(_.camelCase(input));
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
        console.log(genre_id);
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

    fetch(url)
      .then(res => res.json())
      .then(json => {
        // console.log(json)
        let data = json.results;
        // console.log(data);
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
          // return myMovie;
        });
        // console.log(movies);
        this.setState(prevState => ({
          movies: [...prevState.movies, ...movies]
        }));
      });
  }
  render() {
    return (
      <div className="App">
        <h1>{this.state.title}</h1>
        <h2>{this.state.subtitle}</h2>
        <input
          id="main-input"
          type="text"
          // placeholder="Search for any movie or category"
          value={this.state.searchTerm}
          onChange={this.handleChange}
        />
        <button id="search-btn" onClick={this.getMovies}>
          Find movies!
        </button>
        <div className="movie-container">
          {this.state.movies.map((movie, idx) => {
            // return (
            //   <div key={idx}>
            //     <h3>{movie.title}</h3>
            //     <img src={movie.poster} alt="" />
            //   </div>
            // );
            return <Movie key={idx} movie={movie} />;
          })}
        </div>
        {/* <h4>{this.state.movie.title}</h4> */}
        {/* <Movie movie={this.state.movie} /> */}
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
        // console.log(json);
        // json.genres.forEach(genre => console.log(genre));
        this.setState(prevState => ({
          genres: [...prevState.genres, ...json.genres]
        }));
        console.log(this.state.genres);
      });
    this.getMovies();
  }
}

export default App;
