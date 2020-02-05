import React from 'react';
import {ParticipantItem} from "./participantItem/ParticipantItem";

export class ParticipantList extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            participants: props.participants,
            fromOwner: props.fromOwner,
        };
    }

    componentDidUpdate(prevProps) {
        this.props.participants !== prevProps.participants
        && this.setState({ participants: this.props.participants });
    }

    render() {
        return(
            <ul className="list-group">
                {this.state.participants.map((item) =>
                    <ParticipantItem
                        onKickClick={this.props.onKickClick}
                        fromOwner={this.props.fromOwner}
                        key={item.id}
                        participantId={item.id}
                        participantName={item.fullName}/>)}
            </ul>
        );
    }

}