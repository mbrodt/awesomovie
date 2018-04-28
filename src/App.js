import React, { Component } from "react";
import "./App.css";
import Movie from "./components/Movie";

class App extends Component {
  constructor() {
    super();
    this.state = {
      title: "Awesomovie",
      subtitle: "The quickest and easiest way to browse your favourite movies",
      movies: []
    };
  }
  render() {
    return (
      <div className="App">
        <h1>{this.state.title}</h1>
        <h2>{this.state.subtitle}</h2>
        <input
          id="main-input"
          type="text"
          placeholder="Search for any movie or category"
        />
        {/* <Movie /> */}
      </div>
    );
  }

  componentDidMount() {}
}

export default App;
