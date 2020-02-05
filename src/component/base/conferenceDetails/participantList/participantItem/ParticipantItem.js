import React from 'react';

export class ParticipantItem extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            participantId: props.participantId,
            participantName: props.participantName,
            fromOwner: props.fromOwner,
        };
    }

    render() {
        if (this.state.fromOwner) return (
            <li data-participant-id={this.state.participantId} className="list-group-item d-flex justify-content-between align-items-center">
                {this.state.participantName}
                <span onClick={this.props.onKickClick} style={{cursor: "pointer"}} className="badge badge-primary badge-pill">Kick</span>
            </li>
        );
        return(
            <li className="list-group-item">{this.props.participantName}</li>
        );
    }
}