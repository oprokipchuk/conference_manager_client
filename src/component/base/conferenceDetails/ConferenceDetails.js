import React from 'react';
import './ConferenceDeatils.css';
import axios from "axios";
import {ParticipantList} from "./participantList/ParticipantList";

export class ConferenceDetails extends React.Component{

    constructor(props) {
        super(props);

        this.url = 'http://localhost';

        this.state = {
            isOwner: false,
            conferenceId: props.match.params.conferenceId,
            conference: {
                participants: [],
                owner: {},
            },
            conferenceRoom: {},
            user: {},
        };
    }

    componentDidMount() {
        this.initUser().then(() => {
            this.initParams();
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

    initParams = () => {
        console.log("in init params");
        return this.loadConference()
            .then((response) => this.setState({
                isOwner: response.data.owner.id === this.state.user.id,
                conference: response.data,
                conferenceRoom: response.data.conferenceRoom,
            }));
    };

    loadConference = () => {
        let loadUrl = `${this.url}/api/v1/conference/${this.state.conferenceId}`;
        return axios.get(loadUrl, {withCredentials: true});
    };

    onLeaveClick = () => {
        let leaveUrl = `${this.url}/api/v1/conference/delete/${this.state.conferenceId}`;
        axios.put(leaveUrl,{},{withCredentials: true}).then(() => {
            this.initParams();
        })
    };

    onJoinClick = () => {
        let joinUrl = `${this.url}/api/v1/conference/add/${this.state.conferenceId}`;
        axios.put(joinUrl,{},{withCredentials: true}).then(() => {
            this.initParams();
        })
    };

    onDeleteConferenceClick = () => {
        let deleteUrl = `${this.url}/api/v1/conference/${this.state.conferenceId}`;
        axios.delete(deleteUrl, {withCredentials: true}).then(() => {
            this.props.history.push("/");
        });
    };

    onKickClick = (event, target) => {
        let kickId = event.target.parentElement.getAttribute("data-participant-id");
        let kickUrl = `${this.url}/api/v1/conference/delete/${this.state.conferenceId}/participant/${kickId}`;
        axios.put(kickUrl,{},{withCredentials: true}).then(() => {
            this.initParams();
        })
    };

    renderBasicEntranceButtons = () => {
        let isEntered = false;
        this.state.conference.participants.forEach((item) => {
            if (item.id === this.state.user.id) {
                isEntered = true;
            }
        });
        let deleteConferenceButton = '';
        if (this.state.isOwner) {
            deleteConferenceButton = <button
                onClick={this.onDeleteConferenceClick}
                type="button"
                className="btn btn-outline-primary">
                Cancel conference
            </button>;
        }
        if (isEntered) return(
            <div className="conference-entrance-button-set">
                <button onClick={this.onLeaveClick} type="button" className="btn btn-outline-primary">Leave</button>
                {deleteConferenceButton}
            </div>
        );
        return(
            <div className="conference-entrance-button-set">
                <button onClick={this.onJoinClick} type="button" className="btn btn-outline-primary">Join</button>
                {deleteConferenceButton}
            </div>
        );
    };

    render() {
        let date = new Date(this.state.conference.conferenceDate);
        /*let formattedDate = [date.getMonth()+1,
                date.getDate(),
                date.getFullYear()].join('/')+' '+
            [date.getHours(),
                date.getMinutes()].join(':');*/
        let formattedDate = date.toUTCString();

        return(
            <div>
                <h2 className="conference-details-header">Conference '{this.state.conference.name}' Start date: {formattedDate}</h2>
                <h3 className="conference-details-room-header">Conference Room</h3>
                <ul className="conference-details-room-data">
                    <li>Room name: {this.state.conferenceRoom.roomName}</li>
                    <li>Location: {this.state.conferenceRoom.location}</li>
                </ul>
                <h3 className="conference-details-participants-header">
                    Participants {this.state.conference.participants.length}/{this.state.conferenceRoom.maxSeats}
                </h3>
                {this.renderBasicEntranceButtons()}
                <div className="conference-participants-list-container">
                    <ParticipantList
                        onKickClick={this.onKickClick}
                        fromOwner={this.state.isOwner}
                        participants={this.state.conference.participants}/>
                </div>
            </div>
        );
    }

}