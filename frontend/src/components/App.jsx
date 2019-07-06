import React from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import Results from './Results';
import Favorites from './Favorites';
import Navbar from './Navbar';
import Signup from './Signup';
import Login from './Login';
import './css/App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        let favoriteList = JSON.parse(localStorage.getItem('favoriteList'));
        let favoriteListDB = JSON.parse(localStorage.getItem('favoriteListDB'));
        if (favoriteList === null) {
            favoriteList = [];
            localStorage.setItem('favoriteList', JSON.stringify(favoriteList));
        }
        if (favoriteListDB === null) {
            favoriteListDB = [];
            localStorage.setItem('favoriteListDB', JSON.stringify(favoriteListDB));
        }
        this.state = {
            favoriteList: favoriteList,
            favoriteListDB: favoriteListDB,
            json: null, 
            jsonIndex: 0,
            searchTerm: null,
            page: 1,
            beerList: [],
            displayButton: false,
            haventSearched: true,
            loggedIn: false,
            firstname: ''
        }
    }

    getAndDisplayBeers = (searchTerm) => {
        if (searchTerm === '') {
            return;
        }
        if (searchTerm === this.state.searchTerm) {
            if (this.state.jsonIndex < this.state.json.length || this.state.json.length < 80) {
                return;
            }
        }
        fetch(`https://api.punkapi.com/v2/beers?page=${this.state.page}&per_page=80&beer_name=${searchTerm}`)
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          if (json.length === 0) {
             return;
          }
          else if (searchTerm === this.state.searchTerm) {
            this.setState({json: json,
                           jsonIndex: 0}, () => {
                              this.displayBeers();
                            });
          }
          else {
            this.setState({json: json,
                           jsonIndex: 0,
                           searchTerm: searchTerm,
                           page: 1,
                           beerList: null,
                           haventSearched: false}, () => {
                              this.displayBeers();
                          });
          }
        })
        .catch((error) => {
          console.error(error);
        })
    }

    displayBeers = () => {
        let numBeers = this.state.json.length - this.state.jsonIndex;
        if (numBeers >= 6) {
            this.makeBeerListThenDisplay(6);
        }
        else if (numBeers !== 0) {
            this.makeBeerListThenDisplay(numBeers);
        }
        else if (this.state.json.length === 80) {
            this.setState({page: this.props.app.state.page + 1}, () => {
            this.getAndDisplayBeers(this.state.searchTerm);
            });
        }
        else {
            this.setState({page: this.props.app.state.page + 1}, () => {
            return;
            });
        }
    }

    makeBeerListThenDisplay = (numBeers) => {
        let beerList = [];
        if (this.state.beerList != null) { 
          for (let i = 0; i < this.state.beerList.length; i++) {
              beerList.push(this.state.beerList[i]);
          }
        }
        let jsonIndex = this.state.jsonIndex;
        for (let i = 0; i < numBeers; i++) {
            beerList.push({id: this.state.json[jsonIndex].id,
                           img: this.state.json[jsonIndex].image_url,
                           name: this.state.json[jsonIndex].name,
                           description: this.state.json[jsonIndex].description});
            jsonIndex++;               
        }
        this.setState({beerList: beerList, jsonIndex: jsonIndex}, () => {
            let trueOrFalse;
            if (this.state.jsonIndex !== this.state.json.length) {
                trueOrFalse = true;
            }
            else {
                trueOrFalse = false;
            }
            this.setState({displayButton: trueOrFalse}, () => {
                this.props.history.push('/');
            });
        });
    }

    addToFavorites = (beer) => {
        let favoriteList = this.state.favoriteList;
        let beerFound = favoriteList.find((beer1) => {
            return beer1.id === beer.id;
        });
        if (!beerFound) {
            let newFavoriteList = favoriteList;
            newFavoriteList.push(beer);
            localStorage.setItem('favoriteList', JSON.stringify(newFavoriteList));
            this.setState({favoriteList: newFavoriteList});
        }
    }

    updateFavoritesFromLogin = async(beerIDs) => {
        this.setState({favoriteListDB: beerIDs.map((beerID) => parseInt(beerID))});
        localStorage.setItem('favoriteListDB', JSON.stringify(beerIDs));
        let url = this.createURLForStoredBeerIDs(beerIDs);
        let response = await fetch(url);
        let fullInfoBeers = await response.json();
        let favoriteList = this.state.favoriteList;
        for (let i = 0; i < fullInfoBeers.length; i++) {
            let beerFound = favoriteList.find((beer) => {
                return beer.id === fullInfoBeers[i].id;
            });
            if (!beerFound) {
                favoriteList.push({id: fullInfoBeers[i].id,
                                  img: fullInfoBeers[i].image_url,
                                  name: fullInfoBeers[i].name,
                                  description: fullInfoBeers[i].description});
            }
        }
        localStorage.setItem('favoriteList', JSON.stringify(favoriteList));
        this.setState({favoriteList: favoriteList});
    }

    createURLForStoredBeerIDs = (beerIDs) => {
        let url = 'https://api.punkapi.com/v2/beers?ids=';
        for (let i = 0; i < beerIDs.length; i++) {
            if (i < beerIDs.length - 1) {
                url += `${beerIDs[i]}|`;
            }
            else {
                url += `${beerIDs[i]}`;
            }
        }
        return url;
    }

    resetAndRedirect = (route, firstname) => {
        if (firstname !== undefined) {
            this.setState({firstname: firstname,
                           loggedIn: true})
        }
        this.setState({json: null, 
                       jsonIndex: 0,
                       searchTerm: null,
                       page: 1,
                       beerList: [],
                       displayButton: false,
                       haventSearched: true}, () => {
                           if (route === '') {
                                this.getAndDisplayBeers('beer');
                            }
                           this.props.history.push(`/${route}`);
                       });
    }

    redirect = (route) => {
        this.props.history.push(`/${route}`);
    }
    

    removeFromFavorites = (beer) => {
        let favoriteList = this.state.favoriteList;
        let beerIndex = favoriteList.findIndex((beer1) => {
            return beer1.id === beer.id;
        });
        let newFavoriteList = favoriteList;
        newFavoriteList.splice(beerIndex, 1);
        localStorage.setItem('favoriteList', JSON.stringify(newFavoriteList));
        this.setState({favoriteList: newFavoriteList});
    }

    signOut = async() => {
        let res = await fetch('http://localhost:5000/favorites', {
            method: 'DELETE', 
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({favoriteList: this.state.favoriteList.map((beer) => beer.id),
                                  favoriteListDB: this.state.favoriteListDB})
        });
        if (res.status === 200) {
            res = await fetch('http://localhost:5000/favorites', {
                method: 'PUT', 
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({favoriteList: this.state.favoriteList.map((beer) => beer.id),
                                      favoriteListDB: this.state.favoriteListDB})
            });
            if (res.status === 200) {
                let res = await fetch('http://localhost:5000/signout', {
                    method: 'POST',
                    credentials: 'include'});
                if (res.status === 200) {
                    localStorage.setItem('favoriteList', JSON.stringify([]));
                    localStorage.setItem('favoriteListDB', JSON.stringify([]));
                    this.setState({favoriteList: [],
                                   favoriteListFromDB: [],
                                   loggedIn: false,
                                   firstname: ''}, () => this.resetAndRedirect(''));
                }
            }
        }
    }

    async componentDidMount() {
        if (this.props.history.location.pathname === '/') {
            if (this.state.haventSearched) {
                this.getAndDisplayBeers('beer');
            }
        }
        try {
            let res = await fetch('http://localhost:5000/loggedin', 
                {credentials: 'include'});
            let json = await res.json();
            if (json.loggedIn) {
                this.setState({
                    firstname: json.firstname,
                    loggedIn: true
                })
            }
        } catch(error) {
            console.error(error.stack);
        }
    }

    render() {
        return (
            <Router history={this.props.history}>
                <Route
                    path="/"
                    render={(props) => <Navbar {...props} getAndDisplayBeers={this.getAndDisplayBeers} favoriteNum={this.state.favoriteList.length} resetAndRedirect={this.resetAndRedirect} redirect={this.redirect} loggedIn={this.state.loggedIn} firstname={this.state.firstname} signOut={this.signOut}></Navbar>}>
               </Route>
                <Switch>
                    <Route 
                        exact path="/login" 
                        render={(props) => <Login {...props} updateFavoritesFromLogin={this.updateFavoritesFromLogin} resetAndRedirect={this.resetAndRedirect}></Login>}>
                    </Route>
                    <Route 
                        exact path="/signup" 
                        render={(props) => <Signup {...props}></Signup>}>
                    </Route>
                    <Route 
                        exact path="/" 
                        render={(props) => 
                                <Results favoriteList={this.state.favoriteList} addToFavorites={this.addToFavorites} beerList={this.state.beerList} displayButton={this.state.displayButton} displayBeers={this.displayBeers}></Results>}>
                    </Route>
                    <Route 
                        path="/favorites" 
                        render={(props) =>
                                <Favorites favoriteList={this.state.favoriteList} removeFromFavorites={this.removeFromFavorites}></Favorites>}>
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default App;