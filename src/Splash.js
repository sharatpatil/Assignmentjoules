import React, { Component } from 'react';
import { Button, Text, StyleSheet, View ,Image, TouchableOpacity, Dimensions, AsyncStorage, StatusBar} from 'react-native'; 

import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

export default class Splash extends Component {
  state = {
    token: null,
    timer:2,
    items :[{}],
 }
 componentDidMount()
 {
   this.interval = setInterval(
     () => this.setState((prevState)=> ({ timer: prevState.timer - 1 })),
     1000
   );
   
 }




componentDidUpdate()
{
  if(this.state.timer === 0){ 
    clearInterval(this.interval);
    this.props.navigation.navigate("Login")
  }
}

componentWillUnmount()
{
 clearInterval(this.interval);
}


render() {

    const Height = Dimensions.get('window').height;
    const Width = Dimensions.get('window').width;

  return(
          
        <View  style={styles.container}>
                <StatusBar backgroundColor="white" barStyle="dark-content" />
                  <View style={styles.coin}>
             <Image style={{height:90, width:120}} source={require('../assets/images/logo.png')} />
                </View>
        </View>
  );
}
    }



  const styles = StyleSheet.create({
      container: {
        width:'100%' ,
        height:'100%',
        justifyContent:'center', 
        backgroundColor:'#ffffff',
       alignItems:'center'
      },
      buttonText: {
        fontSize: RFValue(20, Height),
        textAlign: 'center'
      },
      Text:{
        color:'white', 
        fontSize:RFValue(22, Height), 
        fontFamily:"Helvetica95Black", 
       
        
    },
    coin:{
        height:180,
        width:180,
        elevation:20,
        backgroundColor:'#fff',
        borderRadius:10, justifyContent:'center', alignItems:'center'
    },
    });