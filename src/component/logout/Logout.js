import React from 'react';
import axios from "axios";

export class Logout extends React.Component{

    constructor(props) {
        super(props);

        this.url = 'https://conference-manager-server.herokuapp.com';

    }

    componentDidMount() {
        this.logout()
    }

    logout = () => {
        let logoutUrl = `${this.url}/logout`;
        axios.get(logoutUrl, {withCredentials: true})
            .then(() => {this.props.history.push("/login")});
    };

    render() {
        return(
            <div>Logout</div>
        );
    }


}