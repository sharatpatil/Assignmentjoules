import React, { Component } from 'react';
import {  Text, 
   
    Dimensions, 
    StatusBar, 
    StyleSheet,
    Image, 
    View,
    TextInput,
      BackHandler, 
       ScrollView, 
       Switch} from 'react-native'; 

import Ripple from 'react-native-material-ripple';
import Icon from 'react-native-vector-icons/Ionicons';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { showMessage, hideMessage } from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";


const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

export default class Login extends Component {
  constructor(props) {
    super(props);

    const { navigation } = this.props;
    this.show = this.show.bind(this);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      username:'',
      password:'',
    
      isVisible:false, 
      showPassword: true,

   };
  }


  show() {
    this.setState({ showPassword: !this.state.showPassword });
  }


  Login(){

    if(this.state.password=='')
    {
        showMessage({
            message: "Error",
            description: "Please Enter Password",
            type: "danger",
            
          });
    }
    else if(this.state.username=='')
    {
        showMessage({
            message: "Error",
            description: "Please Enter mail id",
            type: "danger",
            
          });
    }
    else{
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(this.state.username) === false) {
        console.log("Email ID is Not Correct");
 
        showMessage({
         message: "Error",
         description: "Email is not valid, Please Enter valid mail id",
         type: "danger",
         
       });

      }
      else{
        this.props.navigation.navigate("Dashboard");
      }
    }
  }



  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
}

componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}

handleBackButtonClick() {
    // this.props.navigation.goBack(null);
    return true;
}

render() {

    const Height = Dimensions.get('window').height;
    const Width = Dimensions.get('window').width;

  return(
          
    <ScrollView style={styles.maincontainer}>  
      
    <View style={styles.container}>
              <StatusBar backgroundColor="white" barStyle="dark-content" />
   
              <Image style={{height:90, width:120, marginTop:20}} source={require('../assets/images/logo.png')} />

      <View style={styles.whiteback}>
            <View style={styles.secondview}>
  
              <Text style={styles.Login}>Welcome</Text>
    
            </View>

    

            <View style={styles.Inputview}>
                <View style={styles.Icon}>
                <Icon name="ios-person" size={30} color="#449b8f" />
                </View>
                <View style={{width:'85%', height:50, justifyContent:'center' }}>
                <TextInput
                onChangeText = {text => this.setState({ username: text })}
                style={{left:10, width:'95%', fontWeight:'bold', fontSize:RFValue(18, Height)}} 
                placeholder="Username"
              /> 
                </View>
               </View>

                <View style={styles.Inputview}>
                <View style={styles.Icon}>
                <Icon name="ios-key" size={30} color="#449b8f" />
                </View>
                <View style={{width:'85%', height:50, justifyContent:'center' }}>
                <TextInput 
                secureTextEntry={this.state.showPassword}
                onChangeText = {text => this.setState({ password: text })}
                style={{left:10, width:'95%', fontWeight:'bold', fontSize:RFValue(18, Height)}} 
                placeholder="Password"
              /> 
                </View>
               </View>

               <View style={{flexDirection:'row', justifyContent:'space-around', alignSelf:"flex-start", marginLeft:20}}>
               <Switch
                onValueChange={this.show}
                value={!this.state.showPassword}
                /> 
                 <Text style={styles.Login}>Show Password</Text>
            </View>



       
        

         
              <Ripple    onPress={()=>this.Login()}   style={styles.Button}>
              <Text style={[styles.Hello,{color:'white', width:'100%'}]}>Login</Text>
            </Ripple>

       
    
  

   
    </View>
        </View>
        <FlashMessage position="bottom"  />   
        </ScrollView>
  );
}
    }


  const styles = StyleSheet.create({
    container: {
        width:Width, height:Height,
        backgroundColor:'white',
       alignItems:'center'
      },
      maincontainer:{
        flex:1
      },
      buttonText: {
        fontSize:20,
        textAlign: 'center'
      },
      Text:{
        color:'white', 
        fontSize:24, 
        fontFamily:"HelveticaNeueBold", 
    },
   
    secondview:{
        justifyContent:'space-around',
        alignItems:"center",
        height:Height*.1,
        width:Width,
    
    },
    Login:{
        color:'#449b8f', 
        fontSize:RFValue(18, Height), 
        fontWeight:'bold'
        
    },
    
    Hello:{
      color:'#313131', 
      fontSize:RFValue(16, Height), 
        fontWeight:"bold",
      textAlign:'center',width:Width
    },
    
    Inputview:{
        width:'95%',
         height:50,  
         backgroundColor:"white",
         elevation:0, margin:15, flexDirection:'row', borderWidth:1.5, borderRadius:50, borderColor:"#449b8f", justifyContent:'center', alignItems:'center'
    },
   
    Button:{
        width:200,
        height:45,  
        justifyContent:'center',
        backgroundColor:"#449b8f",
         
        marginTop:20, alignItems:'center', borderRadius:50,
    },
   
      whiteback:{
        width:Width, 
        alignItems:'center',
         backgroundColor:'white', 
         height:Height*.7
      },
    
      Icon:{
        width:'15%',
         height:50,
          justifyContent:'center', 
          alignItems:'center'
      },
    
    
     
    
    });
  