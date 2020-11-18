import React, { Component } from 'react';
import BoardCard from '../components/Cards/BoardCard';
import PinCard from '../components/Cards/PinCard';

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
    if (searchType === 'boards') {
      // Make an api call that gets the boards with the search term .filter on all the boards
      this.setState({
        // results
        searchTerm,
        searchType,
      });
    } else {
      // Make an api call that gets the pins with the search term .filter on all the boards
      this.setState({
        // results
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
    const showResults = () => (
      results.map((result) => (
        searchType === 'boards' ? (
            <BoardCard key={result.firebaseKey} board={result} />
        ) : (
            <PinCard key={result.firebaseKey} pinData={result} />
        )
      )));
    return (
      <div>
        <h2>Search Results</h2>
        {showResults()}
      </div>
    );
  }
}
