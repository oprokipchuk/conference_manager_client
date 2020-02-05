import React from 'react';
import axios from 'axios';
import './base.css';
import {ConferenceItem} from "./conferenceItem/ConferenceItem";


export class Base extends React.Component{

    constructor(props) {
        super(props);

        this.urlBase = 'http://localhost';
        this.port = '8080';

        this.state = {
            conferenceList: [],
        };

    }

    componentDidMount() {
        //this.tempLogin().catch(() => this.initConferenceList());
        this.initUser().then(() => this.initConferenceList());
    }

    tempLogin = () => {
        let loginUrl = `${this.urlBase}:${this.port}/login`;
        let loginData = {
            username: 'user1@gmail.com',
            password: 'user1',
        };
        return axios.post(loginUrl, loginData, {withCredentials: true, auth: loginData})
            .then((response) => console.log(response));
    };

    initUser = () => {
        let getUserUrl = `${this.urlBase}:${this.port}/api/v1/participant`;
        return axios.get(getUserUrl, {withCredentials: true})
            .catch(() => {this.props.history.push("/login")});
    };

    initConferenceList = () => {
        this.loadConferenceList()
            .then((response) => this.setState({conferenceList: response.data}));
    };

    loadConferenceList = () => {
        let loadUrl = `${this.urlBase}:${this.port}/api/v1/conference`;
        return axios.get(loadUrl, {withCredentials: true});
    };

    onNewConferenceClick = () => {
        this.props.history.push("/new_conference");
    };

    render() {
        return(
            <div>
                <h2 className="conference-list-header">Conferences</h2>
                <div className="conference-list-button-container">
                    <button onClick={this.onNewConferenceClick} type="button" className="btn btn-outline-primary">+</button>
                </div>
                <div className="conference-list-container">
                    <ul className="conference-list list-group">
                        {this.state.conferenceList.map((item) => {
                            return (
                                <ConferenceItem
                                    id={item.id}
                                    key={item.id}
                                    name={item.name}
                                    participants={item.participants}
                                    maxSeats={item.conferenceRoom.maxSeats}
                                />
                            );
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}
