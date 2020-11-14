import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import firebase from 'firebase/app';
import Routes from '../helpers/Routes';
import fbConnection from '../helpers/data/connection';
import MyNavbar from '../components/MyNavbar';

fbConnection();
class App extends React.Component {
  state = {
    authed: false,
    boards: [],
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
        });
      } else {
        this.setState({
          authed: false,
        });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed } = this.state;
    return (
      <div className="App">
        <Router>
        <MyNavbar authed={authed}/>
        <Routes authed={authed}/>
        </Router>
      </div>
    );
  }
}

export default App;
