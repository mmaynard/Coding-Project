import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

function APIInfoDisplay(props) {
  return (
    <div class='info-container'>
      <h2>{props.apiData.displayType} Status</h2>
      <p><label>URL: </label>{props.apiData.url}</p>
      <p><label>StatusCode: </label>{props.apiData.statusCode}</p>
      <p><label>Req Duration: </label>{props.apiData.duration}</p>
      <p><label>Date: </label>{props.apiData.date}</p>
    </div>
  );
}

class App extends Component {
  state = {
    amazon: {},
    google: {},
    all: []
  };
  
  componentDidMount() {
    //initial loading of data
    this.loadData();
    setInterval(this.loadData.bind(this), 3000);
  }

  loadData() {
    try {
      axios.get('/api/v1/amazon-status').then((res) => {
        const response = res.data;
        this.setState({amazon: response});
      });
      axios.get('/api/v1/google-status').then((res) => {
        const response = res.data;
        this.setState({google: response});
      });
      axios.get('/api/v1/all-status').then((res) => {
        const response = res.data;
        this.setState({all: response});
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div className="App">
        <APIInfoDisplay apiData={this.state.amazon} />
        <APIInfoDisplay apiData={this.state.google} />

        <div class='info-container'> 
          {this.state.all.map(data => (
            <APIInfoDisplay apiData={data} />
          ))}
        </div>
      </div>
    );
  }
}

export default App;