import React, {Component} from 'react';
import {View} from 'react-native';
import TemperatureDisplay from './CustomComponents/TemperatureDisplay';
import SwitchDisplay from './CustomComponents/SwitchDisplay';

export default class App extends Component {
  render() {
    return (
      <View>
          <TemperatureDisplay />
          <SwitchDisplay />
      </View>
    );
  }
}
