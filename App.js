import React, {Component} from 'react';
import {View} from 'react-native';
import TemperatureDisplay from './CustomComponents/TemperatureDisplay';
import SwitchDisplay from './CustomComponents/SwitchDisplay';
import API from './Api.json';

export default class App extends Component {
  state = {
    data:[],
    targetTemp: '100.0',
    heaterState:false,
    cBlowerState:false,
    HBlowerState:false,
    lightsState:false,
    jetsState:false,
    stateChanged:false,
    
  }
  getThingSpeakData(){
    //TODO: make a call to thing speak and then update state
    
    fetch(API["readingURLs"]["data_directory_URL"] + API["readingKeys"]["data_api_key"] +'&results=2',{
      method: 'GET',
      headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
    })
    .then((response) => response.json())
    .then((responseJson) => this.setState({data:responseJson}))
    .catch((error) => {
      console.error(error);
    }).done();

    //fetch for target data
    fetch(API["readingURLs"]["target_directory_URL"] + API["readingKeys"]["target_api_key"] + '&results=2',{
      method: 'GET',
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((responseJson) => this.setState({targetData: responseJson}))
    .catch((error) => {
      console.error(error);
    }).done();
  }
  
  uploadTargetData(){

  }
  currentStateTester(currentState){
    if(currentState === true){
      return '1';
    }else{
      return '0';
    }
  }
  //this area handles uploading the control information
  compileInfo() {
    let jets = this.currentStateTester(this.state.jetsState);
    let light = this.currentStateTester(this.state.lightsState);
    let coldBlower = this.currentStateTester(this.state.cBlowerState);
    let hotBlower = this.currentStateTester(this.state.HBlowerState);

    var theInformation =
    API[ "sendingTargetData"]["directory_URL"] + API[ "sendingTargetData"]["api_key"] +
    '&field1='+targetTemp+
    '&field2='+jets+
    '&field3='+light+
    '&field4='+coldBlower+
    '&field5='+hotBlower;
    
    console.log(theInformation);
    this.uploadThingData(theInformation);
  }//end of compileInfo func

  uploadThingData(compiledInfo) {
    console.log('Awaiting response from thingData after sending data')
    var url = compiledInfo
    fetch(url,{
      method: 'GET',
      headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
    })
    .then((response) => console.log(response.json()))
    .then(this.setState({dirtyFlag: false}))
    .catch((error) => {
      console.error(error);
    });
    console.log('end of update thing data')
  }//end of updateThingData Func
  //end of updating the channels

  async compileOnInterval(){
    if(this.state.stateChanged === true){

    }
  }

  newTargetTemp(newTargetTemp){
    let temp = parseFloat(newTargetTemp);
    console.log('new target temp is ' + newTargetTemp)
    if(temp < 0 && temp > 102){
      this.setState({targetTemp:newTargetTemp, stateChanged:true}); 
    }
  }
  switchStateChange(stateName){
    switch(stateName){
      case 'cBlower':
        if(this.state.cBlowerState === false){
          this.setState({stateChanged:true, cBlowerState:true});
        }else{
          this.setState({stateChanged:true, cBlowerState:false});
        }
      break;
      case 'hBlower':
        if(this.state.HBlowerState === false){
          this.setState({stateChanged:true, HBlowerState:true});
        }else{
          this.setState({stateChanged:true, HBlowerState:false});
        }
      break;
      case 'lights':
        if(this.state.lightsState === false){
          this.setState({stateChanged:true, lightsState:true});
        }else{
          this.setState({stateChanged:true, lightsState:false});
        }
      break;
      case 'jets':
        if(this.state.jetsState === false){
          this.setState({stateChanged:true, jetsState:true});
        }else{
          this.setState({stateChanged:true, jetsState:false});
        }
      break;
      default:
        console.log('ERROR: switchStateChange called but with ' + stateName + ' value instead of expected value')
        break;
    }
  }

  render() {
    console.log(this.state);
    console.log(API["readingURLs"]["data_directory_URL"] + API["readingKeys"]["data_api_key"] +'&results=2');
    return (
      <View style={{flex:2}}>
          <TemperatureDisplay />
          <SwitchDisplay 
            currentStates={[this.state.heaterState, this.state.cBlowerState, this.state.HBlowerState, this.state.lightsState, this.state.jetsState]} 
            targetTemp={this.state.targetTemp}  
            callBackFunction={this.switchStateChange.bind(this)}
            callBackTempChange={this.newTargetTemp.bind(this)}
          />
      </View>
    );
  }
}
