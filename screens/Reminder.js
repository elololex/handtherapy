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

import moment from 'moment'
//const util = require('util');
let data = [];


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
            enableReminder : false
        }
    }
    componentDidMount(){
        var Analytics = require('../Data/Analytics').default;
        Analytics.hitPage('AboutThisApp');

        for(var i=0;i<100;i++){
            data.push(i);
        }
    }
   
     
    render(){
        const {navigation} = this.props;
        const pageSlug = navigation.getParam('slug', 'NO-ID');
        return (
            
                <View style={ styles.mainContainer}>
                    <View style={{flex:0.5, justifyContent:'center'}}>

                        <View style={{flexDirection:'row', alignItems:"center",justifyContent:"center"}}>
                            <Text>Every</Text>
                            <View><Text>1</Text></View>
                            <Text>Hours</Text>
                        </View>
                        <View style={{flexDirection:'row', alignItems:"center",justifyContent:"center"}}>
                            <Text>Starting at</Text>
                            <View>
                                <DatePicker
                                mode="time"
                                format="HH:mm"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                showIcon= {false}
                                customStyles={{
                                    dateInput: {
                                        marginLeft: 0,
                                        borderWidth : 0,
                                        alignItems: 'flex-start',
                                        
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
                                format="HH:mm"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                showIcon= {false}
                                customStyles={{
                                    dateInput: {
                                        marginLeft: 0,
                                        borderWidth : 0,
                                        alignItems: 'flex-start',
                                        
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
                        <Switch onTintColor='#525c66' onValueChange={(val)=>{this.setState({enableReminder:val})}} value={this.state.enableReminder} />
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
      backgroundColor: '#2CBBFF',
    },
    headerBackTitle: null,
    headerTintColor: '#fff',
    headerMode: 'screen',
    headerTitleStyle: {
        fontFamily: 'Lato-Regular',
    }
  })
});

