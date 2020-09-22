import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Splash from './src/Splash';
import Login from './src/Login';
import Dashboard from './src/Dashboard';


const MainNavigator = createStackNavigator({
 

  Splash: {  navigationOptions:{
    headerShown:null
  },screen: Splash},


  Login: {  navigationOptions:{
    headerShown:null
  },screen: Login},

  Dashboard: {  navigationOptions:{
    headerShown:null
  },screen: Dashboard},



},
{
  initialRouteName: 'Splash',

}

);





const App = createAppContainer(MainNavigator);



export default App;

