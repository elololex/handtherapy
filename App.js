import React, {Component} from 'react';
import { StyleSheet, Text, View ,SafeAreaView, ScrollView, Image,FlatList,TouchableOpacity} from 'react-native';
import {createStackNavigator,createDrawerNavigator,createSwitchNavigator , DrawerItems} from 'react-navigation';
import {Header, Item, Icon, Input, InputGroup,List, ListItem,Left,Right,Button} from 'native-base'
//Screen
import SplashScreen from './screens/SplashScreen';
import WelcomeScreen from "./screens/WelcomeScreen";
import HomeScreen from './screens/HomeScreen';
import MaternityUnitsScreen from './screens/MaternityUnitsScreen';
import HospitalPageScreen from './screens/HospitalPageScreen';
import DefaultContent from './screens/DefaultContentScreen';
import SecondScreen from './screens/SecondScreen';
import ThirdScreen from "./screens/ThirdScreen";
import DefaultContentScreen from "./screens/DefaultContentScreen";
// import AppointmentsScreen from './screens/AppointmentsScreen';
import BackupScreen from './screens/BackupScreen';
import PersonalCarePlanScreen from './screens/PersonalCarePlanScreen';
import LeafletScreen from './screens/LeafletScreen';
import AllExerciseScreen from './screens/AllExerciseScreen';
import AfterYourBabyIsBornScreen from './screens/AfterYourBabyIsBornScreen';
import AboutTheAppScreen from './screens/AboutTheAppScreen';
import GetInvolvedScreen from './screens/GetInvolvedScreen';
import FeedbackScreen from './screens/FeedbackScreen';
import DonationScreen from './screens/DonationScreen';
import NotesScreen from './screens/NotesScreen';

//header 
import MainMenuHeader from './Components/HeaderMenu';
//search
import SearchResultsScreen from './screens/SearchResultsScreen';
import SearchBrokerScreen from './screens/searchStack/SearchBroker';
//screen
import AppointmentScreen from './screens/AppointmentsScreen';
import ReminderScreen from './screens/Reminder';
import ProgressScreen from './screens/Progress';
import MyExerciseScreen from './screens/Myexercises';
import AddAppointmentScreen from './screens/appointment_stack/AddAppointment';
import ViewAppointmentScreen from './screens/appointment_stack/ViewAppointments';
import EditAppointmentScreen from './screens/appointment_stack/EditAppointment';
import SearchBrookerScreen from './screens/searchStack/SearchBroker';

//Menu
const mainColor =  '#1ba9d5';
global.appMainColor = '#1ba9d5'
  const CustomContentComponent = (props)=>{
    return (
      <View style={{flex:1}}>
      <View style={{height:150,  backgroundColor:global.appMainColor, alignItems:'center',
        justifyContent:'center',}} searchBar rounded>
      <View style={{flex:1,alignItems:'center', justifyContent:'flex-end'}}>
      <Image
                source={require('./assets/images/menu_logo.png')}
                style={styles.logoImage}
            />
      </View>
      <View style={{flex:1}}>
      <InputGroup rounded style={{backgroundColor:'rgba(255, 255, 255, 0.4)', width:200, height:30,margin:20}}>
            <Icon name='search' style={{color:'#fff',fontSize:14}}/>
            <Input onChange={(va)=>{}} returnKeyType='search'   onSubmitEditing={()=>{

              console.log('submitting ...')
      }}
 placeholder='Search...' placeholderTextColor="#fff" style={{color:'#fff',fontSize:14} }/>
            <TouchableOpacity onPress={()=>{}}>
            <Icon name='close-circle' style={{color:'#fff',fontSize:14}}/>
            </TouchableOpacity>
          </InputGroup>
      </View>
        </View>
      <ScrollView>
        <DrawerItems {...props}
        
        getLabel = {(scene) => (
          <View style={{height:40,flexDirection:'row',justifyContent:'center',alignItems:'center', paddingLeft:20}}>
            {/* <Icon style={{color:mainColor}}  name='bicycle'/> */}
            <Text style={{ color:mainColor, fontSize:14} }>{props.getLabel(scene)}</Text>
          </View>
        )}
        />
      </ScrollView>
      </View>
    )
  }

  //Update menu icons
  const styles = StyleSheet.create(
    {
      logoImage: {
        height:33,
        width:162,
      },
    });


  const MaternityUnitsStack = createStackNavigator({
    MaternityUnitsScreen : {
      screen:MaternityUnitsScreen,
      navigationOptions : ({navigation})=>({
        title: 'Maternity units',
        headerTitleStyle: {
          fontFamily: 'Lato-Regular',
          textAlign: 'center',
          flexGrow:1,
          alignSelf:'center',
      },
        drawerLabel: 'Home',
        drawerIcon: ({ tintColor }) => (
          <Icon
            name=''
          />
        ),
        headerLeft: (
            <Button transparent
            onPress={() => navigation.openDrawer()}>
              <Icon ios='ios-menu' android="md-menu" style={{fontSize: 30, color: 'white'}}/>
            </Button>
        )
      }),
    },
    HospitalPage:{screen:HospitalPageScreen},
    DefaultContent:{screen:DefaultContent},
  },{
        headerMode: 'float',
      navigationOptions: ({navigation, screenProps }) => ({
        headerStyle: {
          backgroundColor: global.appMainColor,
        },
        headerBackTitle: null,
        headerTintColor: '#fff',
        headerMode: 'screen',
        headerTitleStyle: {
          fontFamily: 'Lato-Regular',
          textAlign: 'center',
          flexGrow:1,
          alignSelf:'center',
      },
      })
    });





const MainMenuNavigation = createDrawerNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      drawerLabel: ()=>{
        return (
          <Text style={{height:10}}> Home</Text>
        )
      },
      drawerIcon: () => (
        <Icon  name='home' style={{color :mainColor}}
        />
      )
    }
  },
  SearchScreen : createSwitchNavigator({
    SearchBrokerScreen:{
    screen : SearchBrokerScreen},
    SearchResultsScreen : {
      screen: SearchResultsScreen
    }
  }),
  MyExerciseScreen:{screen:MyExerciseScreen,
    navigationOptions: {
      drawerLabel: 'My Exercises',
      drawerIcon: () => (
        <Image
                source={require('./assets/images/myexercises_icon.png')}
                style={{height:25, width:25}}
            />
      )
    }},
    AllExerciseScreen:{screen:AllExerciseScreen,  navigationOptions: {
    drawerLabel: 'All Exercises',
    drawerIcon: () => (
      <Image
                source={require('./assets/images/allexercises_icon.png')}
                style={{height:25, width:25}}
            />
    )
  }},
  NotesScreen:{screen:NotesScreen,  navigationOptions: {
    drawerLabel: 'Notes',
    drawerIcon: () => (
      <Image
                source={require('./assets/images/allexercises_icon.png')}
                style={{height:25, width:25}}
            />
    )
  }},
  ReminderScreen: {screen:ReminderScreen,  navigationOptions: {
    drawerLabel: 'Remind Me',
    drawerIcon: () => (
      <Image
                source={require('./assets/images/reminder_icon.png')}
                style={{height:25, width:25}}
            />
    )
  }},
  ProgressScreen: {screen:ProgressScreen,  navigationOptions: {
    drawerLabel: 'Progress ',
    drawerIcon: () => (
      
      <Image
                source={require('./assets/images/progress_icon.png')}
                style={{height:25, width:25}}
            />
    )
  }},
  LeafletsScreen:{screen:LeafletScreen, Title: "Personal Care Plan",  navigationOptions: {
    drawerLabel: 'Leaflets ',
    drawerIcon: () => (
      
      <Image
                source={require('./assets/images/leaflet_icon.png')}
                style={{height:25, width:25}}
            />
    )
  }},
  DonationScreen:{screen:DonationScreen,  navigationOptions: {
    drawerLabel: 'Donate ',
    drawerIcon: () => (
      
      <Image
                source={require('./assets/images/donate_icon.png')}
                style={{height:25, width:25}}
            />
    )
  }},
  AboutTheAppScreen:{screen:AboutTheAppScreen,  navigationOptions: {
    drawerLabel: 'About ',
    drawerIcon: () => (
      
      <Image
                source={require('./assets/images/aboutus_icon.png')}
                style={{height:27, width:25}}
            />
    )
  }},
 },{
  initialRouteName: 
  'AboutTheAppScreen',
  contentComponent : (props) => <MainMenuHeader {...props} />,
  // contentComponent : props => <CustomContentComponent {...props} />
});

const MainSwitchNavigator = createSwitchNavigator({
  Splash:{screen:SplashScreen},
  Welcome:{screen: WelcomeScreen},
  MainApp :{screen: MainMenuNavigation}
})





  export default class HomePage extends Component{
    constructor(props){
      super(props)
      this.state ={
        searchVal : '---------'
      }
    }
    render(){
      return(
        <MainSwitchNavigator />
      )
    }
  };
