import React, { Component } from 'react';
import './App.css';
import Report from './components/Report';
import { Container } from 'reactstrap'
import Header from './components/Header';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Container>
          <Header />
          <Report />
        </Container>
      </div>
    );
  }
}

export default App;
