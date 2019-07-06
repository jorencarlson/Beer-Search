import React from 'react';
import './css/Signup.css';
import ReactDOM from 'react-dom';

class Signup extends React.Component {
    redirect = (e) => {
    }

    formHandler = (e) => {
        e.preventDefault();
        let signupForm = document.forms['signup-form'];
        if (signupForm['password1'].value !== signupForm['password2'].value) {
            this.displayWarningText('Passwords do not match.')
        }
        let userInfo = {firstname: signupForm['firstname'].value,
                        lastname: signupForm['lastname'].value,
                        email: signupForm['email'].value,
                        password: signupForm['password1'].value};
        this.signUp('http://localhost:5000/signup', userInfo)
    }

    displayWarningText = (warningText) => {
        ReactDOM.render(<div className="d-flex justify-content-center align-items-center alert alert-warning w-100 h-100" role="alert">
        {warningText}</div>, document.getElementById('sign-up-warning'));
    }
    
    signUp = (url = '', data = {}) => {
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((json) => {
            if (json.statusCode === 1) {
                this.props.history.push('/login');
            }
            else {
                this.displayWarningText(json.message);
                return;
            }
        })
        .catch((error) => {
            console.error(error.stack);
            return;
        });
    };

    render() {
        return (
            <div id="sign-up-container" className="w-100 d-flex flex-column align-items-center">
                <div id="sign-up-warning"></div>
                <form className="d-flex justify-content-center align-items-center flex-column border border-light rounded shadow" id="sign-up-form" onSubmit={this.formHandler} name="signup-form">
                    <div className="form-group mb-2 d-flex justify-content-center align-items-center sign-up">
                        <input type="text" className="form-control mr-3" placeholder="First name" name="firstname" required></input>
                        <input type="text" className="form-control" placeholder="Last name" name="lastname" required></input>
                    </div>
                    <div className="form-group mb-2 sign-up">
                        <input type="email" className="form-control" placeholder="Email" name="email" required></input>
                    </div>
                    <div className="form-group sign-up">
                        <input type="password" className="form-control mb-2" placeholder="Password" name="password1" required></input>
                        <input type="password" className="form-control" placeholder="Confirm password" name="password2" required></input>
                    </div>
                    <button type="submit" id="sign-up-btn" className="btn btn-outline-primary align-self-center">Sign up</button>
                </form>
            </div>
        );
    }
}

export default Signup;