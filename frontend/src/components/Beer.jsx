import React from 'react';
import './css/Beer.css';

class Beer extends React.Component {
  trimDescription = () => {
    let descriptionArr = this.props.attributes.description.split(' ');
    let wordLimit = 40;
    if (descriptionArr.length <= wordLimit) {
      return this.props.attributes.description;
    }
    let description = '';
    for (let i = 0; i < wordLimit; i++) {
      let word = descriptionArr[i];
      if (i === wordLimit - 1) {
        if (word.charAt(word.length - 1) === '.') {
          word = word.slice(0, word.length - 1);
        }
        description += `${word}...`;
      }
      else {
        description += `${word} `;
      }
    }
    return description;
  }

  addToFavorites = () => {
    this.props.addToFavorites(this.props.attributes);
  }

  removeFromFavorites = () => {
    this.props.removeFromFavorites(this.props.attributes);
  }

  addButton = () => {
    if (this.props.addToFavorites) {
      return (<div className="favorite-container">
      <button className="btn btn-outline-primary" onClick={this.addToFavorites}>Add to Favorites</button>
      </div>);
    }
    else if (this.props.removeFromFavorites) {
      return (<div className="favorite-container">
      <button className="btn btn-outline-primary" onClick={this.removeFromFavorites}>Remove from Favorites</button>
      </div>);
    }
  }

  render() {
    return (<div className="beer-card border border-light rounded shadow m-2">
              <div className="img-and-description-container">
                <div className="beer-img-container">
                    <img className="beer-img" src={this.props.attributes.img} alt="Beer"></img>
                </div>
                <div className="description-container">
                  <h5 className="beer-name">{this.props.attributes.name}</h5>
                  <div className="beer-description">{this.trimDescription()}</div>
                </div>
              </div>
              {this.addButton()}
            </div>);
  }
}

export default Beer;
