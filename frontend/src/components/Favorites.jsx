import React from 'react';
import './css/Favorites.css';
import Beer from './Beer';

class Favorites extends React.Component {
    render() {
        return (
            <div className="d-flex justify-content-center align-items-center flex-wrap">
                {this.props.favoriteList.map(beer => <Beer key={beer.id} beerKey={beer.id} attributes={beer} removeFromFavorites={this.props.removeFromFavorites}></Beer>)}
            </div>
        );
    }
}


export default Favorites;