import React, { Component } from "react";
import Clarifai from "clarifai";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Particles from "react-particles-js";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import "./App.css";

//You must add your own API key here from Clarifai.
const app = new Clarifai.App({
  apiKey: "4708d1ac3db146e4a0b715b809337f75" // "YOUR_API_HERE"
});

const particlesOptions = {
  particles: {
    number: {
      value: 200,
      density: {
        enable: true,
        value_area: 800
      }
    },
    size: {
      value: 3
    }
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageURL: ""
    };
  }

  onInputChange = event => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
      function(response) {
        console.log(
          response.outputs[0].data.regions[0].region_info.bounding_box
        );
      },
      function(err) {
        console.log(err);
      }
    );
  };

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition imageUrl={this.state.imageURL} />
      </div>
    );
  }
}

export default App;
