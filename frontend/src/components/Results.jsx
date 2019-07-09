import React from 'react';
import './css/Results.css';
import Beer from './Beer';
import ReactDOM from 'react-dom';

class Results extends React.Component {
  displayButton = () => {
    if (this.props.displayButton === true) {
      return(<button className="btn btn-primary w-50" onClick={this.props.displayBeers}>Load More</button>);
    }
  }

  beerContainer = () => {
    if (this.props.beerList !== null) {
      let beerLists = this.createAndRenderBeerLists();
      let html;
      if (this.props.beerList.length === 1) {
        html = (<div className="d-flex justify-content-center flex-wrap w-100 column-container">
                      <div id="beer-column-1" className="beer-column">{beerLists[1]}</div>
                    </div>);
      } else if (this.props.beerList.length === 2) {
        html = (<div className="d-flex justify-content-center flex-wrap w-100 column-container">
                      <div id="beer-column-1" className="beer-column mr-2">{beerLists[0]}</div>
                      <div id="beer-column-2" className="beer-column">{beerLists[2]}</div>
                    </div>);
      }
      else {
        html = (<div className="d-flex justify-content-center flex-wrap w-100 column-container">
                      <div id="beer-column-1" className="beer-column mr-2">{beerLists[0]}</div>
                      <div id="beer-column-2" className="beer-column">{beerLists[1]}</div>
                      <div id="beer-column-3" className="beer-column ml-2">{beerLists[2]}</div>
                    </div>);
      }
      return html;
    }
  }

  createAndRenderBeerLists = () => {
    let beerArr = this.props.beerList.map(beer => <Beer key={beer.id} beerKey={beer.id} attributes={beer} addToFavorites={this.props.addToFavorites}></Beer>);
    console.log(beerArr.length);
    let baseNumOfBeers = Math.floor(beerArr.length / 3);
    let leftover = beerArr.length % 3;
    let beerList1;
    let beerList2;
    let beerList3;
    for (let i = 0; i < 3; i++) {
      if (i === 0) {
        if (leftover === 2) {
          beerList1 = beerArr.slice(0, baseNumOfBeers + 1);
        }
        else {
          beerList1 = beerArr.slice(0, baseNumOfBeers);
        }
      }
      else if (i === 1) {
        if (leftover === 1) {
          beerList2 = beerArr.slice(baseNumOfBeers, baseNumOfBeers * 2 + 1);
        }
        else if (leftover === 2) {
          beerList2 = beerArr.slice(baseNumOfBeers + 1, baseNumOfBeers * 2 + 1);
        }
        else {
          beerList2 = beerArr.slice(baseNumOfBeers, baseNumOfBeers * 2);
        }
      }
      else {
        if (leftover === 1 || leftover === 2) {
          beerList3 = beerArr.slice(baseNumOfBeers * 2 + 1);
        }
        else {
          beerList3 = beerArr.slice(baseNumOfBeers * 2);
        }
      }
    }
    return [beerList1, beerList2, beerList3];
  }

  /*componentDidUpdate() {
    if (this.props.beerList !== null) {
      this.createAndRenderBeerLists();
    }
  }   
  
  componentDidMount() {
    if (this.props.beerList !== null) {
      this.createAndRenderBeerLists(); 
    }  
  }*/

  render() {
    return (
      <div className="d-flex align-items-center flex-column w-100">
        {this.beerContainer()}
        <div className="w-100 m-2 d-flex justify-content-center align-items-center load-more-container">                    {this.displayButton()}
        </div>
      </div>
    );
  }
}

export default Results;
