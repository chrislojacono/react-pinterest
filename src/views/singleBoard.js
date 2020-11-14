import React from 'react';
import boardData from '../helpers/data/boardData';

export default class SingleBoard extends React.Component {
  state = {
    pins: [],
  };

  componentDidMount() {
    boardData.getBoardPins(this.boardFireBaseKey).then((response) => {
      this.setState({
        pins: response,
      });
    });
  }

  boardFireBaseKey = this.props.match.params.id;

  render() {
    return (
      <div>
        <h1>Single board</h1>
      </div>
    );
  }
}
