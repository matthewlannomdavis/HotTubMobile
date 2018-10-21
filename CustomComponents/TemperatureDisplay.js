import React, {Component} from 'react';
import {Text, View} from 'react-native';
import styles from '../styles';
import Moment from 'moment';

const dF = "\u2109"; // degrees Celsius symbol
const dC = "\u2103"; // degrees Fahrenheit symbol
const d = "\u00B0";  // degrees symbol (no scale)

scale = dF;

export default class TemperatureDisplay extends Component {
    render() {
        return  <View style={styles.temperatureContainer}>
                    <Text style={styles.temperature}>
                        { "101.5" + scale }
                    </Text>
                    <Text style={styles.asOf}>
                        as of { Moment(Date.now()).format('hh:mma') }
                    </Text>
                </View>
    }
}
