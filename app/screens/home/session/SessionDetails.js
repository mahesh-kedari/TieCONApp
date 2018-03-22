import React, {Component} from 'react'
import {Text, View} from 'react-native';
import ReactMoment from 'react-moment';
import Moment from 'moment';

export class SessionDetails extends Component {
    static navigationOptions = {
        title: 'Session Details'.toUpperCase()
    };

    constructor(props) {
        super(props);
        let {params} = this.props.navigation.state;
        this.sessionId = params.id;
        this.session = params.session;
    }
    render() {
        const startTime = this
                .session
                .startTime
                .toString();
            const endTime = this
                .session
                .endTime
                .toString();
        return (
            <View style={{
                flexDirection: 'column'
            }}>
                <Text>
                    SessionId : {this.sessionId}
                </Text>
                <Text>Session Name: {this.session.eventName}</Text>
                <Text>{Moment(this.session.startTime).format('DD-MMM HH:mm')}</Text>
                <View style={{
                    flexDirection: 'row'
                }}>
                    <ReactMoment element={Text} diff={startTime} unit="minutes">{endTime}</ReactMoment>
                    <Text>Minutes</Text>
                </View>
            </View>
        )
    }
}

export default SessionDetails
