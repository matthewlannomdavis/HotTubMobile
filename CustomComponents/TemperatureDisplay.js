import React, {Component} from 'react';
import {Text, View} from 'react-native';
import styles from '../styles';
import Moment from 'moment';

const dF = "\u2109"; // degrees Celsius symbol
const dC = "\u2103"; // degrees Fahrenheit symbol
const d = "\u00B0";  // degrees symbol (no scale)

scale = d;

export default class TemperatureDisplay extends Component {
    render() {
        return  <View style={styles.temperatureContainer}>
                    <Text style={styles.temperature}>
                        { this.props.temperature + scale }
                    </Text>
                    <Text style={styles.asOf}>
                        as of { Moment(this.props.temperatureTime).format('hh:mma') }
                    </Text>
                </View>
    }
}
