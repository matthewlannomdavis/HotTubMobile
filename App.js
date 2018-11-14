import React, {Component} from 'react';
import {View} from 'react-native';
import TemperatureDisplay from './CustomComponents/TemperatureDisplay';
import SwitchDisplay from './CustomComponents/SwitchDisplay';
import theAPI from './Api.json';

const intervalTicker = 30000;
const API = theAPI;
console.log(API);

export default class App extends Component {
  
  state = {
    data:[],
    targetData:[],
    targetTemp: '100.0',
    heaterState:false,
    cBlowerState:false,
    HBlowerState:false,
    lightsState:false,
    jetsState:false,
    stateChanged:false,
    tickTimer: 0,
    refreshState:0,
    
  }
  componentDidMount(){
    this.getThingSpeakData();
    this.timer = setInterval(() => this.compileOnInterval(), intervalTicker);
  }
  componentWillUnmount(){
    clearInterval(this.timer);
  }
  getThingSpeakData(){
    //TODO: make a call to thing speak and then update state
    
    fetch(API["readingURLs"][0]["data_directory_URL"] + API["readingKeys"][0]["data_api_key"] +'&results=2',{
      method: 'GET',
      headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
    })
    .then((response) => response.json())
    .then((responseJson) => this.setState({data:responseJson, refreshState:1}))
    .catch((error) => {
      console.error(error);
    }).done();

    //fetch for target data
    fetch(API["readingURLs"][0]["target_directory_URL"] + API["readingKeys"][0]["target_api_key"] + '&results=2',{
      method: 'GET',
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((responseJson) => this.setState({targetData: responseJson, refreshState:1}))
    .catch((error) => {
      console.error(error);
    }).done();
  }

  currentStateTester(currentState){
    if(currentState === true){
      return '1';
    }else{
      return '0';
    }
  }
  currentStateTransformer(currentState){
    //checks to see if a value of 0 or 1 is given and then returns true or false
    if(currentState === "0"){
      return false;
    }else if(currentState === "1"){
      return true;
    }
    if(currentState === 0){
      return false;
    }else if(currentState === 1){
      return true;
    }
    console.log("currentStatTransformer was called but given value " + currentState
                + "\n returning false fallback");
    return false;
  }
  //this area handles uploading the control information
  compileInfo() {
    let jets = this.currentStateTester(this.state.jetsState);
    let light = this.currentStateTester(this.state.lightsState);
    let coldBlower = this.currentStateTester(this.state.cBlowerState);
    let hotBlower = this.currentStateTester(this.state.HBlowerState);

    var theInformation =
    API[ "sendingTargetData"][0]["directory_URL"] + API[ "sendingTargetData"][0]["api_key"] +
    '&field1='+this.state.targetTemp+
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
    .then((response) => console.log(response))
    .then(this.setState({stateChanged: false}))
    .catch((error) => {
      console.error(error);
    });
    console.log('end of update thing data')
  }//end of updateThingData Func
  //end of updating the channels

  async compileOnInterval(){
    if(this.state.stateChanged === true){
      this.compileInfo();
    }
    if(this.state.stateChanged === false){
    this.getThingSpeakData();
    }
  }

  newTargetTemp(newTargetTemp){
    let temp = parseFloat(newTargetTemp);
    console.log('new target temp is ' + newTargetTemp);
    if(temp > 0 && temp < 104){
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

  updateTheStates(){
    if(this.state.refreshState === 1){
      if(this.state.data.length !== 0){
        if(this.state.targetData.length !== 0){
          this.setState({
            targetTemp: (Math.round(100*this.state.targetData['feeds'][1]['field1'])/100).toString(),
            jetsState: this.currentStateTransformer(this.state.data['feeds'][1]['field3']),
            lightsState: this.currentStateTransformer(this.state.data['feeds'][1]['field4']),
            cBlowerState: this.currentStateTransformer(this.state.data['feeds'][1]['field5']),
            HBlowerState: this.currentStateTransformer(this.state.data['feeds'][1]['field6']),
            heaterState: this.currentStateTransformer(this.state.data['feeds'][1]['field2']),
            refreshState:0,
          });
        }else{
          this.setState({
            jetsState: this.currentStateTransformer(this.state.data['feeds'][1]['field3']),
            lightsState: this.currentStateTransformer(this.state.data['feeds'][1]['field4']),
            cBlowerState: this.currentStateTransformer(this.state.data['feeds'][1]['field5']),
            HBlowerState: this.currentStateTransformer(this.state.data['feeds'][1]['field6']),
            heaterState: this.currentStateTransformer(this.state.data['feeds'][1]['field2']),
            refreshState:0,
          });
        }
      }
    }
  }

  render() {
    console.log(this.state);
    this.updateTheStates();
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
