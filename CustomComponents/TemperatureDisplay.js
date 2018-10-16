import React, {Component} from 'react';
import {Text, View} from 'react-native';
import styles from '../styles';

// \u2103 = degrees Celsius
// \u2109 = degrees Fahrenheit
// \u00B0 = degrees (no scale)
export default class TemperatureDisplay extends Component {
    render() {
        return  <View style={styles.temperatureContainer}>
                    <Text style={styles.temperature}>
                        { "101.5" + "\u2109" }
                    </Text>
                    {/*TODO:Fix date not being a finite value in DateTimeFormat format()
                    <Text style={styles.temperatureAsOf}>
                        as of { new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit',
                        }).format(Date.now)}
                    </Text>
                    */}
                </View>
    }
}
