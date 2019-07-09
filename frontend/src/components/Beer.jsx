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
      return (<button className="btn btn-outline-primary beer-card-btn" onClick={this.addToFavorites}>Add to Favorites</button>);
    }
    else if (this.props.removeFromFavorites) {
      return (
      <button className="btn btn-outline-primary beer-card-btn" onClick={this.removeFromFavorites}>Remove from Favorites</button>);
    }
  }

  render() {
    return (<div className="beer-card border border-light rounded shadow mb-2">
              <h5 className="beer-name w-100 border-bottom border-secondary mb-2">{this.props.attributes.name}</h5>
              <div className="img-and-description-container mb-3">
                <div className="beer-img-container mr-4">
                    <img className="beer-img" src={this.props.attributes.img} alt="Beer"></img>
                </div>
                <div className="description-container">
                  <div className="beer-description mb-3">{this.props.attributes.description}</div>
                  {this.addButton()}
                </div>
              </div>
            </div>);
  }
}

export default Beer;
