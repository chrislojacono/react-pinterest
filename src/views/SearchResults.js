import React, { Component } from 'react';
import BoardCard from '../components/Cards/BoardCard';
import PinCard from '../components/Cards/PinCard';
import { getAllUserBoards } from '../helpers/data/boardData';
import { getAllPins } from '../helpers/data/pinData';
import getUid from '../helpers/data/authData';

export default class SearchResults extends Component {
  state = {
    results: [],
    searchTerm: '',
    searchType: '',
  };

  componentDidMount() {
    this.performSearch();
  }

  performSearch = () => {
    const searchTerm = this.props.match.params.term;
    const searchType = this.props.match.params.type;
    const getUser = getUid();
    const results = [];
    if (searchType === 'boards') {
      getAllUserBoards(getUser).then((response) => {
        console.warn('response', response);
        const searchBoardResults = response.filter(
          (item) => item.name === searchTerm,
        );
        console.warn('filtered array', searchBoardResults);
        results.push(searchBoardResults);
      });

      this.setState({
        results,
        searchTerm,
        searchType,
      });
    } else {
      getAllPins().then((response) => {
        const searchBoardResults = response.filter(
          (item) => item.name === searchTerm,
        );
        results.push(searchBoardResults);
      });
      // Make an api call that gets the pins with the search term .filter on all the boards
      this.setState({
        results,
        searchTerm,
        searchType,
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchTerm !== this.props.match.params.term) {
      this.performSearch();
    }
  }

  render() {
    const { results, searchType } = this.state;
    const finalResults = Object.values(results);
    const showResults = () => (
      finalResults.map((result) => (
        searchType === 'boards' ? (
                <BoardCard key={result[0].firebaseKey} boardData={result[0]} />
        ) : (
                <PinCard key={result[0].firebaseKey} pinData={result[0]} />
        )
      ))
    );
    return (
      <div>
        <h2>Search Results</h2>
        <div className="d-flex flex wrap container">
        {showResults()}
        </div>
      </div>
    );
  }
}
