import React from 'react';
import axios from "axios";

export class Logout extends React.Component{

    constructor(props) {
        super(props);

        this.urlBase = 'http://localhost';
        this.port = '8080';

    }

    componentDidMount() {
        this.logout()
    }

    logout = () => {
        let logoutUrl = `${this.urlBase}:${this.port}/logout`;
        axios.get(logoutUrl, {withCredentials: true})
            .then(() => {this.props.history.push("/login")});
    };

    render() {
        return(
            <div>Logout</div>
        );
    }


}