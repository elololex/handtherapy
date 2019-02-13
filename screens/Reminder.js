import React from 'react';
import {Text,TouchableOpacity, View, AsyncStorage, StyleSheet} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title ,Switch} from 'native-base';
import {StackNavigator} from "react-navigation";
import {createStackNavigator,withNavigation, DrawerActions} from 'react-navigation';
import User from "../Data/User";
import CreateContent from '../Components/CreateContent';
import DefaultContent from './DefaultContentScreen';
import Picker from 'react-native-picker';
import DatePicker from 'react-native-datepicker'
import RNPickerSelect from 'react-native-picker-select';

import moment from 'moment'
//const util = require('util');


class ReminderScreen extends React.Component {
	
    static navigationOptions =({navigation, screenProps }) => ( {
        title: 'Reminde Me',
        headerTitleStyle: {
            fontFamily: 'Lato-Regular',
            textAlign: 'center',
            flexGrow:1,
            alignSelf:'center',
        },
        headerLeft: (
            
            <Button transparent
            onPress={() => navigation.openDrawer()}>
              <Icon ios='ios-menu' android="md-menu" style={{fontSize: 30, color: 'white'}}/>
            </Button>
        ),
        headerRight: (
            
            <View></View>
        ),
    });

    constructor(props){
        super(props);
        
        this.state = {
            reminderStatus : false,
            fromTime : moment().format("HH:mm"),
            toTime : moment().format("HH:mm"),
            hoursSelector:[],
            selectedHourInterval : 1
        }
    }

    loadReminderSettings = async()=>{

        var reminderDetails = await AsyncStorage.getItem("@reminderDetails")
        if(reminderDetails !=null){
        var _parsedReminderDetails = JSON.parse([reminderDetails]);
            this.setState({
                fromTime: _parsedReminderDetails.fromTime,
                toTime: _parsedReminderDetails.toTime,
                reminderStatus:_parsedReminderDetails.reminderStatus,
                selectedHourInterval:_parsedReminderDetails.selectedHourInterval
            })
 
        }else{
            console.log('its empty');
        }
     }


    updateReminderSettings = async()=>{
   
            try{
                //Calculate new notification
                var _fromTime = moment(this.state.fromTime,'HH:mm');
                var _toTime = moment(this.state.toTime,'HH:mm');
                var _diff = moment.duration(_toTime.diff(_fromTime));
                var _hours = _diff.asHours();
                var _interval = Math.floor(_hours/this.state.selectedHourInterval);
                cconsole.log(_interval);
                var _remStatus = {
                    fromTime: this.state.fromTime,
                    toTime: this.state.toTime,
                    reminderStatus:this.state.reminderStatus,
                    selectedHourInterval : this.state.selectedHourInterval,
                    reminderInterval : _interval
                }
                await AsyncStorage.setItem("@reminderDetails",JSON.stringify(_remStatus))
            }catch(err){
                console.log(err)
            }
     }



    updateReminderStatus = async(val)=>{
        this.setState({reminderStatus:val})

        //Set storage
        await AsyncStorage.setItem('@reminderDetails',val.toString());
    }

    

    componentDidMount(){
        var Analytics = require('../Data/Analytics').default;
        Analytics.hitPage('AboutThisApp');
        this.loadReminderSettings();
        let data = [];

        for(var i=2;i<12;i++){
            data.push(
                {
                    label: `${i}`,
                    value:i,
                }
            );
            
        }
        this.setState({hoursSelector:data});
    }

     
    render(){
        const {navigation} = this.props;
        const pageSlug = navigation.getParam('slug', 'NO-ID');
        return (
            
                <View style={ styles.mainContainer}>
                    <View style={{flex:0.5, justifyContent:'center'}}>

                        <View style={{flexDirection:'row', alignItems:"center",justifyContent:"center"}}>
                            <Text>Every</Text>
                            <View style={{marginLeft:10,marginRight:10}}>
                    <RNPickerSelect
                    placeholder={{
                        label: '1',
                        value: 1,
                    }}
                    items={this.state.hoursSelector}
                    onValueChange={(value) => {
                        this.setState({
                            selectedHourInterval: value,
                        });
                    }}
                    style={{
                        ...pickerSelectStyles,
                        iconContainer: {
                            top: 20,
                            right: 10,
                        },
                    }}
                    value={this.state.selectedHourInterval}
                    placeholderTextColor="purple"
                    Icon={() => {
                        return (
                            <View
                                style={{
                                    backgroundColor: 'transparent',
                                    borderTopWidth: 10,
                                    borderTopColor: 'gray',
                                    borderRightWidth: 10,
                                    borderRightColor: 'transparent',
                                    borderLeftWidth: 10,
                                    borderLeftColor: 'transparent',
                                    width: 0,
                                    height: 0,
                                }}
                            />
                        );
                    }}
                />

                            </View>
                            <Text>Hours</Text>
                        </View>
                        <View style={{flexDirection:'row', alignItems:"center",justifyContent:"center"}}>
                            <Text>Starting at</Text>
                            <View>
                                <DatePicker
                                mode="time"
                                format="HH:mm"
                                date = {this.state.fromTime}
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                showIcon= {false}
                                is24Hour = {true}
                                locale={"SV"}
                                onDateChange={(time) => {
                                    this.setState({fromTime: time})
                                }}
                                customStyles={{
                                    dateInput: {
                                        marginLeft: 0,
                                        borderWidth : 0,
                                        
                                    },
                                    dateText:{
                                        fontSize: 17,
                                fontFamily: 'Lato-Light',textAlign: 'left',
                                    }
                                }}/>
                            </View>
                        </View>
                        <View style={{flexDirection:'row', alignItems:"center",justifyContent:"center"}}>
                            <Text>Ending at</Text>
                            <View>              
                                <DatePicker
                                mode="time"
                                date = {this.state.toTime}
                                format="HH:mm"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                showIcon= {false}
                                locale={"SV"}
                                onDateChange={(time) => {
                                    this.setState({toTime: time})
                                }}
                                customStyles={{
                                    dateInput: {
                                        marginLeft: 0,
                                        borderWidth : 0,                                        
                                    },
                                    dateText:{
                                        fontSize: 17,
                                fontFamily: 'Lato-Light',textAlign: 'left',
                                    }
                                }}/>
                            </View>
                        </View>
                   </View>

                   <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
                        <Text>Reminders enabled</Text>
                        <Switch onTintColor='#525c66' onValueChange={(val)=>
                            {
                                this.updateReminderStatus(val);
                                
                            }} value={this.state.reminderStatus} />
                    </View>
                    <Text style={{alignSelf:'center',marginTop:20}}>Slide switch to toggle notification</Text>

                    <View style={{margin:20}}>
                    <Button full onPress={() => 
                    {
                        this.updateReminderSettings();
                    }} style = {{}}>
                                <Text style ={{color:'#fff'}}>Update reminder</Text>
                    </Button>
                    </View>

                </View>
        );
    }
}
const styles = StyleSheet.create(
    {
       mainContainer:{
        flex:1, 
        backgroundColor: '#fff', 
       },
       topView:{
        height: 70,
        flex:1, 
       },
        bottomView:{
     
          width: '100%', 
          height: 70, 
          backgroundColor: '#808080', 
          justifyContent: 'center', 
          alignItems: 'center',
          position: 'absolute',
          bottom: 0,
          flex:1, 
        },
     
        textStyle:{
        fontFamily: 'Lato-Regular',
          color: '#fff',
          fontSize:16
        }
    });
export default createStackNavigator({
    Main:{screen:ReminderScreen},
    DefaultContent:{screen:DefaultContent},
},
{
    headerMode: 'float',
  /* The header config from HomeScreen is now here */
  navigationOptions: ({navigation, screenProps }) => ({
    headerStyle: {
      backgroundColor: global.appMainColor,
    },
    headerBackTitle: null,
    headerTintColor: '#fff',
    headerMode: 'screen',
    headerTitleStyle: {
        fontFamily: 'Lato-Regular',
    }
  })
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});


