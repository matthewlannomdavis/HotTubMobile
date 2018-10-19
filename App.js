import React, {Component} from 'react';
import {View} from 'react-native';
import TemperatureDisplay from './CustomComponents/TemperatureDisplay';
import SwitchDisplay from './CustomComponents/SwitchDisplay';

export default class App extends Component {
  state = {
    data:[],
    cBlowerState:false,
    HBlowerState:false,
    lightsState:false,
    jetsState:false,
    stateChanged:false,
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
    return (
      <View style={{flex:2}}>
          <TemperatureDisplay />
          <SwitchDisplay />
      </View>
    );
  }
}
