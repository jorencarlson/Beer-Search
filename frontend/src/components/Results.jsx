import React from 'react';
import './css/Results.css';
import Beer from './Beer';

class Results extends React.Component {
  displayButton = () => {
    if (this.props.displayButton === true) {
      return(<button className="btn btn-primary w-50" onClick={this.props.displayBeers}>Load More</button>);
    }
  }
  
  displayBeers = () => {
    if (this.props.beerList !== null) {
      return(this.props.beerList.map(beer => <Beer key={beer.id} beerKey={beer.id} attributes={beer} addToFavorites={this.props.addToFavorites}></Beer>));
    }
  }

  render() {
    return (
      <div>
        <div id="beers">
          {this.displayBeers()}
        </div>
        <div className="w-100 m-2 d-flex justify-content-center align-items-center" id="load-more-container">                    {this.displayButton()}
        </div>
      </div>
    );
  }
}

export default Results;
