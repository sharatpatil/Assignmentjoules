import React, { Component } from 'react';
import {  Text, StyleSheet, View ,Image,
      Dimensions, 
      StatusBar, ToastAndroid, BackHandler} from 'react-native'; 

import {  RFValue } from "react-native-responsive-fontsize";
import Sound from 'react-native-sound';
import {AudioRecorder, AudioUtils} from 'react-native-audio';
import Icon from 'react-native-vector-icons/Ionicons';
import Ripple from 'react-native-material-ripple';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
    
        const { navigation } = this.props;
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
        currentTime: 0.0,
        recording: false,
        paused: false,
        stoppedRecording: false,
        finished: false,
        audioPath: AudioUtils.DocumentDirectoryPath + '/test.aac',
        hasPermission: undefined,
        filename1:'',
        path:'',
      };
    }
      prepareRecordingPath(audioPath){
        AudioRecorder.prepareRecordingAtPath(audioPath, {
          SampleRate: 22050,
          Channels: 1,
          AudioQuality: "Low",
          AudioEncoding: "aac",
          AudioEncodingBitRate: 32000
        });
      }

      

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
}

componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}

handleBackButtonClick() {
   BackHandler.exitApp();
    return true;
}
  
      componentDidMount() {
        AudioRecorder.requestAuthorization().then((isAuthorised) => {
          this.setState({ hasPermission: isAuthorised });
  
          if (!isAuthorised) return;
  
          this.prepareRecordingPath(this.state.audioPath);
  
          AudioRecorder.onProgress = (data) => {
            this.setState({currentTime: Math.floor(data.currentTime)});
          };
  
          AudioRecorder.onFinished = (data) => {
            // Android callback comes in the form of a promise instead.
            if (Platform.OS === 'ios') {
              this._finishRecording(data.status === "OK", data.audioFileURL, data.audioFileSize);
            }
          };
        });
      }
  
     
 
  
  
      async _pause() {
        if (!this.state.recording) {
            ToastAndroid.show('Can\'t pause, not recording!', ToastAndroid.SHORT);
      
          return;
        }
  
        try {
          const filePath = await AudioRecorder.pauseRecording();
          this.setState({paused: true});
        } catch (error) {
          console.error(error);
        }
      }
  
      async _resume() {
        if (!this.state.paused) {
            ToastAndroid.show('Can\'t resume, not paused', ToastAndroid.SHORT); 
        
          return;
        }
  
        try {
          await AudioRecorder.resumeRecording();
          this.setState({paused: false});
        } catch (error) {
          console.error(error);
        }
      }
  
      async _stop() {
        if (!this.state.recording) {
            ToastAndroid.show('Can\'t stop, not recording!', ToastAndroid.SHORT); 
   
          return;
        }
  
        this.setState({stoppedRecording: true, recording: false, paused: false});
  
        try {
          const filePath = await AudioRecorder.stopRecording();
  
          if (Platform.OS === 'android') {
            this._finishRecording(true, filePath);
          }
          return filePath;
        } catch (error) {
          console.error(error);
        }
      }
  
      async _play() {
        if (this.state.recording) {
          await this._stop();
        }
  
        // These timeouts are a hacky workaround for some issues with react-native-sound.
        // See https://github.com/zmxv/react-native-sound/issues/89.
        setTimeout(() => {
          var sound = new Sound(this.state.audioPath, '', (error) => {
            if (error) {
              console.log('failed to load the sound', error);
            }
          });
        
          setTimeout(() => {
              sound.setVolume(10);
            sound.play((success) => {
                
              if (success) {
                  console.log(sound)
                  this.setState({currentTime:sound._duration})
                console.log('successfully finished playing');
              } else {
                console.log('playback failed due to audio decoding errors');
              }
            });
          }, 100);
        }, 100);
      }
      
  
      async _record() {
        if (this.state.recording) {
            ToastAndroid.show('Already recording!', ToastAndroid.SHORT); 
        
          return;
        }
  
        if (!this.state.hasPermission) {
            ToastAndroid.show('Can\'t record, no permission granted!', ToastAndroid.SHORT); 
        
          return;
        }
  
        if(this.state.stoppedRecording){
          this.prepareRecordingPath(this.state.audioPath);
        }
  
        this.setState({recording: true, paused: false});
  
        try {
          const filePath = await AudioRecorder.startRecording();
        } catch (error) {
          console.error(error);
        }
      }
  
      _finishRecording(didSucceed, filePath, fileSize) {
        this.setState({ finished: didSucceed });
        this.setState({filepaths:filePath});
        this.setState({filename1:'/test.aac', path:this.state.audioPath},)
        console.log(`Finished recording of duration ${this.state.currentTime} seconds at path: ${filePath} and size of ${fileSize || 0} bytes`);
      }
render() {

 
  return(
          
        <View  style={styles.container}>
                <StatusBar backgroundColor="white" barStyle="dark-content" />
              
             <Image style={{height:90, width:120, alignSelf:"center"}} source={require('../assets/images/logo.png')} />

             <Ripple onPress={()=> this._record()} style={styles.record}>
             <Icon name="ios-mic" size={30} color="#fff" />
             </Ripple>
             <Text style={{fontWeight:"bold", fontSize:18, margin:20, textAlign:'center'}}>{this.state.currentTime} sec</Text>
             <View style={{height:50, width:"100%", backgroundColor:"white" , flexDirection:"row", justifyContent:'space-around', alignItems:"center"}}>
         
             
             <Ripple  style={{alignItems:"center", justifyContent:"center"}} onPress={() =>this._pause()} >
             <Icon name="ios-pause" size={30} color="#449b8f" />
             <Text style={{fontWeight:"bold", fontSize:18, }}>Pause</Text>
             </Ripple>
             <Ripple  style={{alignItems:"center", justifyContent:"center"}}  onPress={() =>this._resume()} >
             <Icon name="ios-play" size={30} color="#449b8f" />
             <Text style={{fontWeight:"bold", fontSize:18, }}>Resume</Text>
             </Ripple>
             <Ripple  style={{alignItems:"center", justifyContent:"center"}} onPress={() =>this._stop()}>
             <Icon name="ios-stop" size={30} color="#449b8f" />
             <Text style={{fontWeight:"bold", fontSize:18, }}>Stop</Text>
            </Ripple>
          
                    
  
            </View>

            <Ripple onPress={()=> this._play()} style={styles.play}>
            <View  style={styles.record}>
            <Icon name="ios-play" size={30} color="#fff" />
        
             </View>
             <Text style={{fontWeight:"bold", fontSize:18, textAlign:"center" }}>Play</Text>
             </Ripple>
      
             <Text style={styles.texthead}>filename:  <Text style={styles.text} >{this.state.filename1}</Text></Text>
             <Text style={styles.texthead}>filepath:  <Text style={styles.text}  >{this.state.path}</Text></Text>
             <Text style={styles.texthead}>Duration:  <Text style={styles.text}  >{this.state.currentTime} sec</Text></Text>
             <Text style={styles.texthead}>Size:  <Text style={styles.text}  >{this.state.fileSize || 0} bytes</Text></Text>
        </View>
  );
}
    }



  const styles = StyleSheet.create({
      container: {
        width:'100%' ,
        height:'100%',
        backgroundColor:'#ffffff',
      
      },
      texthead:{
        fontWeight:"bold", 
        fontSize:RFValue(18, Height), 
        textAlign:'left',
         left:10,
      },
      text:{
        fontWeight:"bold", 
        fontSize:RFValue(18, Height), 
        color:'grey'
      },
      record:{
        height:50,
         width:50, 
         alignSelf:'center',

         borderRadius:100, 
         justifyContent:'center',
          alignItems:'center', 
          backgroundColor:"#449b8f"
      },
      play:{
        height:60, 
        width:60,
         alignSelf:'center',
          marginTop:30, marginBottom:30
      },
     
    
   
    });