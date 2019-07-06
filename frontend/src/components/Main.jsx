import React from 'react';
import './css/Main.css';

class Main extends React.Component {
    redirect = (e) => {
        if (e.target.innerHTML === 'Log In')
            this.props.history.push('/login');
        else if (e.target.innerHTML === 'Sign Up') {
            this.props.history.push('/signup');
        }
    }
    
    render() {
        return (
            <div id="main-container" className="d-flex flex-column justify-content-center align-items-center h-100 w-100">
                <button className="btn btn-outline-primary mb-4 w-25" onClick={this.redirect}>Log In</button>
                <button className="btn btn-outline-primary w-25" onClick={this.redirect}>Sign Up</button>
            </div>
        );
    }
}



export default Main;