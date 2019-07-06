import React from 'react';
import './css/Navbar.css';
import { Dropdown } from 'react-bootstrap';
import logo from '../images/Brewdog-logo.png';

class Navbar extends React.Component {
  getAndDisplayBeers = () => {
    let searchValue = document.forms['search-form']['search'].value;
    document.forms['search-form']['search'].value = null;
    this.props.getAndDisplayBeers(searchValue);
  }

  submit = (e) => {
    e.preventDefault();
    this.getAndDisplayBeers();
  }

  redirect = (e) => {
    if (e.target.id === 'logo') {
      this.props.resetAndRedirect('');
    } else if (e.target.id === 'favorites-btn') {
      this.props.history.push('favorites');
    } else if (e.target.innerHTML === 'Sign in') {
      this.props.history.push('login')
    } else if (e.target.innerHTML === 'Sign up') {
      this.props.history.push('signup');
    } 
  }

  constructDropdown = () => {
    if (!this.props.loggedIn) {
      return (<Dropdown className="mr-2">
                <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
                  Sign in
                </Dropdown.Toggle>
    
                <Dropdown.Menu>
                  <Dropdown.Item onClick={this.redirect}>Sign in</Dropdown.Item>
                  <Dropdown.Item onClick={this.redirect}>Sign up</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>);
    }
    else {
      return (<Dropdown className="mr-2">
                <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
                  Hello {`${this.props.firstname}`}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={this.props.signOut}>Sign out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>);
    }
  }

  render() {
    return (
      <nav id="navbar" className="navbar navbar-light bg-light rounded shadow-sm fixed-top">
        <div id="logo-container" onClick={this.redirect}>
          <img id="logo" src={logo}></img>
        </div>
        <form className="d-flex flex-grow-1 ml-2 mr-2" name="search-form" id="search-form" onSubmit={this.submit}>
            <input id="search" type="text" className="form-control rounded-left border-right-0 flex-grow-1" placeholder="Search for beer..." name="search"></input>
            <button className="btn btn-primary rounded-right" type="submit" id="search-btn">Search</button>
        </form>
        {this.constructDropdown()}
        <button type="button" className="btn btn-primary" onClick={this.redirect} id="favorites-btn">
            <span className="text-nowrap">Favorites <span id="badge" className="badge badge-light">{this.props.favoriteNum}</span></span>
        </button>
      </nav>
    ); 
  }
}

export default Navbar;
