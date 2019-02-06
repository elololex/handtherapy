import React from 'react';
import {Text,TouchableOpacity, View, AsyncStorage, StyleSheet, Image,FlatList} from 'react-native';
import { Container,Content, Header, Left, Body, Right, Icon, Title ,Button, List, ListItem, Item} from 'native-base';
import {StackNavigator} from "react-navigation";
import {createStackNavigator,withNavigation, DrawerActions} from 'react-navigation';
import User from "../Data/User";
import CreateContent from '../Components/CreateContent';
import DefaultContent from './DefaultContentScreen';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
//const util = require('util');

class NotesScreen extends React.Component {
	
    static navigationOptions =({navigation, screenProps }) => ( {
        title: 'Notes',
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
            counter : 0,
            notes : '',
            data : []
        }
    }
    componentDidMount(){
        var Analytics = require('../Data/Analytics').default;
        Analytics.hitPage('AboutThisApp');
    }
   
     
    render(){
        const {navigation} = this.props;
        const pageSlug = navigation.getParam('slug', 'NO-ID');
        return (
            
                <View style={ styles.mainContainer}>
                <View style={{padding:10}}>
                    <TextInput
                        style={{borderColor:'#525c66', borderWidth:1, height:70}}
                        multiline = {true}
                        numberOfLines = {4}
                        onChangeText={(text) => {
                            this.setState({notes:text});
                        }}
                        value={this.state.text}
                    />
                </View>
                <View style={{padding:10}}>
                        <Button full onPress={() => {
                            var txt = [
                                this.state.notes,
                                ...this.state.data
                            ]

                            this.setState({data:txt});
                        }} style = {{}}>
                                <Text style ={{color:'#fff'}}>Add Notes</Text>
                    </Button>
                </View>
                <ScrollView>
                <List dataArray={this.state.data}
                    renderRow={(item) =>
                      <ListItem style={{height:100, borderColor:'#2CBBFF'}}>
                      
                        <Left style={{
                          flex:2, 
                          flexDirection:'column'
                          }}>
                        <Text>{item}</Text>  

                        </Left>
                        <Right style={{
                          flex:1
                          }}>
                        <Icon name='trash' style={{paddingLeft:10, paddingRight:10, color:'#2CBBFF'}}/>
                        </Right>
                      </ListItem>
                    }>
                  </List>
                </ScrollView>
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
    Main:{screen:NotesScreen}
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

