import React from 'react';
import {Text, View} from 'native-base';
import {StyleSheet, FlatList, TouchableOpacity, Alert} from 'react-native';
import {RkComponent, RkTheme, RkText, RkButton, RkCard} from 'react-native-ui-kitten';
import {NavigationActions} from 'react-navigation';

import {Service} from '../../../services';
import ReactMoment from 'react-moment';
import Moment from 'moment';
import {Avatar} from '../../../components/userAvatar';

const SPEAKER_TABLE = 'Attendee';
export default class ScheduleTile extends RkComponent {

    constructor(props) {
        super(props);
        this.state={
            session : {
                speakers : []
            }
        }
    }

    onShowDetails = (event) => {
        Alert.alert('Test Dialog');
    }

    /**
    * Session Attend Request raised by Attendee
    *
    */
    onAttendRequest = (event) => {
        Alert.alert('Added to agenda');
    }
    getSpeakerDetails = (speakerId)=>{
        var docRef = Service.getDocRef(SPEAKER_TABLE).doc(speakerId);
        docRef.get().then(function(doc) {
            if (doc.exists) {
                return doc.data();
            }else{
                return {
                    firstName : 'no ref'
                }
            }
        }).catch(function(error) {
            return {
                firstName : 'error'
            }
        });
    }
    componentDidMount(){
        this.setState({
            session : this.props.session
        });
        this.props.session.speakers.forEach((session) =>{
            
        });
    }
    /**
        * Render Schedule Tile
        */
    render() {
        let speakers = <Text>Speakers</Text>
        if (this.state.session.speakers.length > 0) {
            speakers = this
                .state
                .session
                .speakers
                .map((speaker, index) => {
                    if(speaker.firstName){
                        let avatar = <Avatar image={ speaker.profileImage} name= {speaker.firstName} />;
                        return (
                           <TouchableOpacity
                                key={index}
                                onPress={() => this.props.navigation.navigate('ProfileV1')}
                                style={{
                                flexDirection: 'row'
                            }}>
                                
                                <Text style={styles.speakerName}>{speaker.firstName}</Text>
                            </TouchableOpacity> 
                        );
                    }else{
                        return (
                            <TouchableOpacity
                                    key={index}
                                    onPress={() => this.props.navigation.navigate('ProfileV1')}
                                    style={{
                                    flexDirection: 'row'
                                }}>
                                <Text>{speaker}</Text>
                            </TouchableOpacity>
                        );
                    }
                });
            const startTime = this
                .state
                .session
                .startTime
                .toString();
            const endTime = this
                .state
                .session
                .endTime
                .toString();
            return (
                <RkCard>
                    <View rkCardHeader style = {styles.header}> 
                        <Text style={styles.roomName}>{this.props.session.room}</Text>
                        <View style={styles.mainHeader}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('SessionDetails', {id: this.props.session.key, session: this.props.session})}>
                                <Text style={styles.headerText}>{this.props.session.eventName}</Text> 
                            </TouchableOpacity>
                            <RkButton rkType = 'success small' style ={styles.actionBtn} onPress={this.onAttendRequest}> Attend </RkButton>
                        </View>
                    </View >
                    <View rkCardContent>
                        {speakers}
                        <Text>{Moment(this.props.session.startTime).format('DD-MMM HH:mm')}</Text>
                        <View
                            style={{
                            flexDirection: 'row'
                        }}>
                            <ReactMoment element={Text} diff={startTime} unit="minutes">{endTime}</ReactMoment>
                            <Text>Minutes</Text>
                        </View>
                    </View>
                </RkCard>
            );
        } else { 
            return (<Text> Unable to fetch detailis </Text>);
        }
    }
}

/** * Component Styling Details */
const styles = StyleSheet.create ({
   header : {
       flex : 1,
       flexDirection : 'column'
   },
   mainHeader:{
       flex : 1,
       flexDirection : 'row',
       justifyContent: 'space-between',
   },
   roomName:{
       fontSize: 15,
       color : '#C9C9C9'
   },
   headerText : {
       fontWeight: 'bold',
       fontSize: 25
   },
   actionBtn : {
       width: 85,
       height: 20,
       alignSelf: 'flex-end'
   },
   avatar : {
       backgroundColor : '#C0C0C0',
       width: 40,
       height: 40,
       borderRadius: 20,
       textAlign: 'center',
       fontSize: 20,
       textAlignVertical: 'center' ,
       marginRight:5
   },
   speakerName: {
       textAlignVertical: 'center',
       fontStyle:'italic',
       fontSize: 15
   }
});