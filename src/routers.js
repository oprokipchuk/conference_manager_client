import React from 'react';
import {Route, Switch} from 'react-router';
import {BrowserRouter} from 'react-router-dom';
import {Base} from "./component/base/base";
import {ConferenceDetails} from "./component/base/conferenceDetails/ConferenceDetails";
import {ConferenceCreator} from "./component/base/conferenceCreator/ConferenceCreator";
import {AuthManager} from "./component/authManager/AuthManager";
import {Logout} from "./component/logout/Logout";

export class Routers extends React.Component{
    render() {
        return(
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Base}/>
                    <Route path="/conference/:conferenceId" component={ConferenceDetails}/>
                    <Route path="/new_conference" component={ConferenceCreator}/>
                    <Route path="/login" component={AuthManager}/>
                    <Route path="/logout" component={Logout}/>
                </Switch>
            </BrowserRouter>
        );
    }
}