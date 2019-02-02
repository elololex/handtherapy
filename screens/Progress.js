import React from 'react';
import {Text,TouchableOpacity, View, AsyncStorage, StyleSheet} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import {StackNavigator} from "react-navigation";
import {createStackNavigator,withNavigation, DrawerActions} from 'react-navigation';
import User from "../Data/User";
import CreateContent from '../Components/CreateContent';
import DefaultContent from './DefaultContentScreen';
//const util = require('util');

class ProgressScreen extends React.Component {
	
    static navigationOptions =({navigation, screenProps }) => ( {
        title: 'Progress',
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
    componentDidMount(){
        var Analytics = require('../Data/Analytics').default;
        Analytics.hitPage('AboutThisApp');
    }
   
     
    render(){
        const {navigation} = this.props;
        const pageSlug = navigation.getParam('slug', 'NO-ID');
        return (
            
                <View style={ styles.mainContainer}>
                    <View style={{flex:1}}>
                        <View style={{flex:0.6,alignItems:'center' ,justifyContent:'space-evenly'}}>
                            <View style={{width:180,height:180, backgroundColor:'red'}}>

                            </View>
                            <Text style={{fontSize:25, textAlign:'center'}}>
                               {` touch "i'm done!" \n after exercising`}
                            </Text>
                        </View>
                        <View style={{flex:0.3,alignItems:'center' ,justifyContent:'space-evenly', backgroundColor:'#f1f1f1'}}>
                            <Text style={{fontSize:30}}>
                                Today
                            </Text>
                            <View style={{flex:0.5,flexDirection:'row',justifyContent:'space-evenly'}}>
                                <View style={{flex:0.5, alignItems:'center'}}>
                                <Text style={{fontSize:20}}>
                                    Target
                                </Text>
                                <Text style={{fontSize:50}}>
                                    0
                                </Text>
                                </View>
                                <View style={{flex:0.5, alignItems:'center'}}>
                                <Text style={{fontSize:20}}>
                                    So far
                                </Text>
                                <Text style={{fontSize:50}}>
                                    0
                                </Text>
                                </View>

                            </View>
                        </View>
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
    Main:{screen:ProgressScreen},
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

