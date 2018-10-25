import React, {Component} from 'react';
import {View} from 'react-native';
import TemperatureDisplay from './CustomComponents/TemperatureDisplay';
import SwitchDisplay from './CustomComponents/SwitchDisplay';

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
