import React from 'react';
import './ConferenceCreator.css';
import axios from "axios";

export class ConferenceCreator extends React.Component{

    constructor(props) {
        super(props);

        this.url = 'https://conference-manager-server.herokuapp.com/';

        this.state = {
            user: {},
            rooms: [],
        }
    }

    componentDidMount() {
        this.initUser().then(() => {
            this.initRooms();
        });
    }

    tempLogin = () => {
        let loginUrl = `${this.url}/login`;
        let loginData = {
            username: 'user1@gmail.com',
            password: 'user1',
        };
        return axios.post(loginUrl, loginData, {withCredentials: true, auth: loginData})
            .then((response) => console.log(response));
    };

    initUser = () => {
        console.log("in init user");
        let getUserUrl = `${this.url}/api/v1/participant`;
        return axios.get(getUserUrl, {withCredentials: true})
            .then((response) => this.setState({
                user: response.data,
            }))
            .catch(() => {this.props.history.push("/login")});
    };

    initRooms = () => {
        this.loadRooms().then((response) => this.setState({
            rooms: response.data
        }));
    };

    loadRooms = () => {
        let getRoomsUrl = `${this.url}/api/v1/conference_room`;
        return axios.get(getRoomsUrl, {withCredentials: true});
    };

    onCreate = (event) => {
        let createUrl = `${this.url}/api/v1/conference`;
        let creationForm = event.target.parentElement;
        let createData = {
            name: creationForm.name.value,
            participants: [],
            conferenceRoom: {
                id: creationForm.conferenceRoom.value,
            },
            conferenceDate: creationForm.date.value,
        };
        axios.post(createUrl, createData, {withCredentials: true})
            .then(() => this.props.history.push("/"));
    };

    render() {
        return(
            <div>
                <h2 className="conference-list-header">New Conference</h2>
                <div className="conference-creation-form-container">
                    <form>
                        <div className="form-group">
                            <label htmlFor="newConferenceName">Name:</label>
                            <input name="name" type="text" className="form-control" id="newConferenceName"
                                   placeholder="Conference No. 3"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="newConferenceRoom">Conference room:</label>
                            <select name="conferenceRoom" className="form-control" id="newConferenceRoom">
                                {this.state.rooms
                                    .map((item) => <option
                                        key={item.id}
                                        value={item.id}>{item.roomName}/{item.location}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="newConferenceDate">Start date:</label>
                            <input name="date" type="datetime-local" className="form-control" id="newConferenceDate"/>
                        </div>
                        <button onClick={this.onCreate} type="button" className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        );
    }

}