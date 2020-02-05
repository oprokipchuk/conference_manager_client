import React from 'react';
import './AuthManager.css';
import axios from "axios";

export class AuthManager extends React.Component{

    constructor(props) {
        super(props);

        this.urlBase = 'http://localhost';
        this.port = '8080';

        this.state = {
            loginError: false,
            registerError: "",
        };
    }

    componentDidMount() {
        this.loadUser();
    }

    loadUser = () => {
        let getUserUrl = `${this.urlBase}:${this.port}/api/v1/participant`;
        axios.get(getUserUrl, {withCredentials: true})
            .then(() => {this.props.history.push("/")});
    };

    onLogin = (event) => {
        let querystring = require('querystring');
        let loginForm = event.target.parentElement;
        let loginUrl = `${this.urlBase}:${this.port}/perform_login`;
        let loginData = {
            username: loginForm.username.value,
            password: loginForm.password.value,
        };
        return axios.post(loginUrl,
            querystring.stringify(loginData), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                withCredentials: true
            })
            .then(() => this.props.history.push("/"))
            .catch(() => this.setState({loginError: true}));
    };

    onRegister = (event) => {
        let registerForm = event.target.parentElement;
        let registerUrl = `${this.urlBase}:${this.port}/api/v1/register`;
        let registerData = {
            email: registerForm.username.value,
            password: registerForm.password.value,
            fullName: registerForm.fullName.value,
            birthDate: registerForm.birthDate.value,
        };
        return axios.post(registerUrl, registerData, {withCredentials: true})
            .then(() => {this.props.history.push("/")})
            .catch((error) => {
                if (error.response.data.errors !== undefined) this.setState({registerError: error.response.data.errors[0].defaultMessage});
                else if (error.response.data.message !== undefined) this.setState({registerError: error.response.data.message});
            });
    };

    RenderLoginError = () => {
        console.log("in render error");
        if (this.state.loginError === true) {
            console.log("return error");
            return (
                <div className="alert alert-danger" role="alert">
                    Incorrect login or password!
                </div>
            );
        }
        else return (<div></div>);
    };

    RenderRegisterError = () => {
        console.log("in render error");
        if (this.state.registerError !== "") {
            console.log("return error");
            return (
                <div className="alert alert-danger" role="alert">
                    {this.state.registerError}
                </div>
            );
        }
        else return (<div></div>);
    };

    render() {
        return(
            <div>
                <div className="auth-block login-main">
                    <div className="login-form">
                        <form>
                            <this.RenderLoginError/>
                            <div className="form-group">
                                <label>Email</label>
                                <input name="username" type="email" className="form-control" placeholder="example@example.com"/>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input name="password" type="password" className="form-control" placeholder="Password"/>
                            </div>
                            <button onClick={this.onLogin} type="button" className="login-btn btn btn-black">Login</button>
                        </form>
                    </div>
                </div>
                <div className="auth-block register-main">
                    <div className="login-form">
                        <form>
                            <this.RenderRegisterError/>
                            <div className="form-group">
                                <label>Email</label>
                                <input name="username" type="email" className="form-control" placeholder="example@example.com"/>
                            </div>
                            <div className="form-group">
                                <label>Full name</label>
                                <input name="fullName" type="text" className="form-control" placeholder="John Smith"/>
                            </div>
                            <div className="form-group">
                                <label>Birth date</label>
                                <input name="birthDate" type="date" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input name="password" type="password" className="form-control" placeholder="Password"/>
                            </div>
                            <button onClick={this.onRegister} type="button" className="btn btn-secondary">Register</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

}