import React from 'react';
import './css/Favorites.css';
import Beer from './Beer';

class Favorites extends React.Component {
    favoritesContainer = () => {
        if (this.props.favoriteList !== null) {
          let favoritesLists = this.createAndRenderFavoritesLists();
          let html;
          if (this.props.favoriteList.length === 1) {
            html = (<div className="d-flex justify-content-center flex-wrap w-100 column-container">
                          <div id="beer-column-1" className="beer-column">{favoritesLists[1]}</div>
                        </div>);
          } else if (this.props.favoriteList.length === 2) {
            html = (<div className="d-flex justify-content-center flex-wrap w-100 column-container">
                          <div id="beer-column-1" className="beer-column mr-2">{favoritesLists[0]}</div>
                          <div id="beer-column-2" className="beer-column">{favoritesLists[2]}</div>
                        </div>);
          }
          else {
            html = (<div className="d-flex justify-content-center flex-wrap w-100 column-container">
                          <div id="beer-column-1" className="beer-column mr-2">{favoritesLists[0]}</div>
                          <div id="beer-column-2" className="beer-column">{favoritesLists[1]}</div>
                          <div id="beer-column-3" className="beer-column ml-2">{favoritesLists[2]}</div>
                        </div>);
          }
          return html;
        }
      }


    createAndRenderFavoritesLists = () => {
        let favoritesArr = this.props.favoriteList.map(beer => <Beer key={beer.id} beerKey={beer.id} attributes={beer} removeFromFavorites={this.props.removeFromFavorites}></Beer>);
        let baseNumOfBeers = Math.floor(favoritesArr.length / 3);
        let leftover = favoritesArr.length % 3;
        let favoritesList1;
        let favoritesList2;
        let favoritesList3;
        for (let i = 0; i < 3; i++) {
          if (i === 0) {
            if (leftover === 2) {
              favoritesList1 = favoritesArr.slice(0, baseNumOfBeers + 1);
            }
            else {
              favoritesList1 = favoritesArr.slice(0, baseNumOfBeers);
            }
          }
          else if (i === 1) {
            if (leftover === 1) {
              favoritesList2 = favoritesArr.slice(baseNumOfBeers, baseNumOfBeers * 2 + 1);
            }
            else if (leftover === 2) {
              favoritesList2 = favoritesArr.slice(baseNumOfBeers + 1, baseNumOfBeers * 2 + 1);
            }
            else {
              favoritesList2 = favoritesArr.slice(baseNumOfBeers, baseNumOfBeers * 2);
            }
          }
          else {
            if (leftover === 1 || leftover === 2) {
              favoritesList3 = favoritesArr.slice(baseNumOfBeers * 2 + 1);
            }
            else {
              favoritesList3 = favoritesArr.slice(baseNumOfBeers * 2);
            }
          }
        }
        return [favoritesList1, favoritesList2, favoritesList3];
      }



    render() {
        return (
            <div className="d-flex justify-content-center w-100 favorites-container">
                {this.favoritesContainer()}
            </div>
        );
    }
}


export default Favorites;