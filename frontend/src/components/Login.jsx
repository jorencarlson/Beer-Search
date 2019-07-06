import React from 'react';
import ReactDOM from 'react-dom';
import './css/Login.css'

class Login extends React.Component {
    formHandler = (e) => {
        e.preventDefault();
        let loginForm = document.forms['login-form'];
        let userInfo = {email: loginForm['email'].value,
                        password: loginForm['password'].value};
        this.login('http://localhost:5000/login', userInfo)

    }

    displayWarningText = (warningText) => {
        ReactDOM.render(<div className="d-flex justify-content-center align-items-center alert alert-warning w-100 h-100" role="alert">
        {warningText}</div>, document.getElementById('login-warning'));
    }

    login = async(url = '', data = {}) => {
        try {
            let response = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (response.status === 401) {
                this.displayWarningText('The email or password is incorrect.')
            }
            else {
                let json = await response.json();
                if (json.statusCode === 1) {
                    this.props.updateFavoritesFromLogin(json.beerIDs);
                    this.props.resetAndRedirect('', json.firstname);
                } 
            }
        } catch(error) {
            console.error(error.stack);
            return;
        };
    };
    
    render() {
        return (
            <div id="login-container" className="w-100 d-flex flex-column align-items-center">
                <div id="login-warning"></div>
                <form id="login-form" className="d-flex flex-column justify-content-center align-items-center border border-light rounded shadow" onSubmit={this.formHandler} name="login-form">
                    <input type="email" className="form-control mb-2 login" placeholder="Email" name="email" id="email" required></input>
                    <input type="password" className="form-control mb-3 login" placeholder="Password" name="password" id="password" required></input>
                    <button type="submit" className="btn btn-outline-primary align-self-center login mb-3" id="sign-in">Sign in</button>
                    <div id="sign-up-alert" className="alert alert-primary login d-flex justify-content-center align-items-center" role="alert">
                        <div>New user? Sign up <a href="/signup" className="alert-link">here</a>.</div>
                    </div>
                    </form>
            </div>
        );
    }
}

/*className="login warning mt-3 mb-3*/



export default Login;