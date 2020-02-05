import * as React from "react";
import './ConferenceItem.css';
import {Link} from "react-router-dom";

export class ConferenceItem extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            name: props.name,
            maxSeats: props.maxSeats,
            participants: props.participants
        };
    }

    render() {
        return(
            /*<a className="conference-list-item-link" href={'conference/' + this.state.id}>
                <li className="conference-list-item list-group-item d-flex justify-content-between align-items-center">
                    {this.state.name}
                    <span className="badge badge-primary badge-pill">{this.state.participants.length}/{this.state.maxSeats}</span>
                </li>
            </a>*/
            <Link to={'conference/' + this.state.id}>
                <li className="conference-list-item list-group-item d-flex justify-content-between align-items-center">
                    {this.state.name}
                    <span className="badge badge-primary badge-pill">{this.state.participants.length}/{this.state.maxSeats}</span>
                </li>
            </Link>

        );
    }

}