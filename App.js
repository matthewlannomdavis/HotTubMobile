import React, {Component} from 'react';
import {View} from 'react-native';
import TemperatureDisplay from './CustomComponents/TemperatureDisplay';
import SwitchDisplay from './CustomComponents/SwitchDisplay';
import app_config from './appconfig.json';

const intervalTicker = 20 * 1000; // milliseconds
const appConfig = app_config;

const readDataUrl = appConfig.thingSpeak.readUrl.replace('{id}', appConfig.thingSpeak.dataChannel.id).replace('{read_key}', appConfig.thingSpeak.dataChannel.read_key);
const readControlUrl = appConfig.thingSpeak.readUrl.replace('{id}', appConfig.thingSpeak.controlChannel.id).replace('{read_key}', appConfig.thingSpeak.controlChannel.read_key);
const writeControlUrl = appConfig.thingSpeak.writeUrl.replace('{write_key}', appConfig.thingSpeak.controlChannel.write_key);

export default class App extends Component {
    state = {
        data:[],
        targetData:[],
        targetTemp: '102.0',
        heaterState:false,
        coldBlowerState:false,
        hotBlowerState:false,
        lightsState:false,
        jetsState:false,
        stateChanged:false,
        tickTimer: 0,
        refreshState:0,
    }

    componentDidMount(){
        // Do initial state pull from Thingspeak, and set refresh interval timer
        this.getThingSpeakData();
        this.timer = setInterval(() => this.compileOnInterval(), intervalTicker);
    }

    componentWillUnmount(){
        // Disable refresh interval timer
        clearInterval(this.timer);
    }

    getThingSpeakData(){
        // Read current hot tub state
        fetch(readDataUrl, {
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

        // Read current control state
        fetch(readControlUrl, {
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

    boolToBin(currentState){
        if(currentState) {
            return '1';
        } else {
            return '0';
        }
    }

    binToBool(currentState){
        //checks to see if a value of 0 or 1 is given and then returns true or false
        if(currentState === '0' || currentState == 0) {
            return false;
        } else {
            return true;
        }
    }

    compileInfo() {
        //this area handles uploading the control information
        var url = writeControlUrl
            .replace('{1}', this.state.targetTemp)
            .replace('{2}', this.boolToBin(this.state.jetsState))
            .replace('{3}', this.boolToBin(this.state.lightsState))
            .replace('{4}', this.boolToBin(this.state.coldBlowerState))
            .replace('{5}', this.boolToBin(this.state.hotBlowerState));
        console.log(url);
        this.uploadThingData(url);
    }

    uploadThingData(url) {
        fetch(url, {
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
    }

    async compileOnInterval(){
        if(this.state.stateChanged === true){
            this.compileInfo();
        }
        if(this.state.stateChanged === false){
            this.getThingSpeakData();
        }
    }

    newTargetTemp(newTargetTemp) {
        let temp = parseFloat(newTargetTemp);
        if(temp > 0 && temp < 104){
            this.setState({targetTemp:newTargetTemp, stateChanged:true}); 
        }
    }

    switchStateChange(stateName) {
        switch(stateName){
            case 'cBlower':
                this.setState({coldBlowerState: !this.state.coldBlowerState})
                break;
            case 'hBlower':
                this.setState({hotBlowerState: !this.state.hotBlowerState});
                break;
            case 'lights':
                this.setState({lightsState: !this.state.lightsState});
                break;
            case 'jets':
                this.setState({jetsState: !this.state.jetsState});
                break;
            default:
                console.error('ERROR: switchStateChange called but with ' + stateName + ' value instead of expected value');
                break;
        }
        this.setState({stateChanged:true});
    }

    updateTheStates(){
        if(this.state.refreshState === 1){
            if(this.state.data.length !== 0){
                this.setState({
                    temperature: this.state.data['feeds'][0]['field1'],
                    temperatureTime: this.state.data['feeds'][0]['create_at'],
                    heaterState: this.binToBool(this.state.data['feeds'][0]['field2']),
                    jetsState: this.binToBool(this.state.data['feeds'][0]['field3']),
                    lightsState: this.binToBool(this.state.data['feeds'][0]['field4']),
                    coldBlowerState: this.binToBool(this.state.data['feeds'][0]['field5']),
                    hotBlowerState: this.binToBool(this.state.data['feeds'][0]['field6']),
                    refreshState:0,
                });
                if(this.state.targetData.length !== 0){
                    this.setState({
                        targetTemp: (Math.round(100*this.state.targetData['feeds'][0]['field1'])/100).toString(),
                    });
                }
            }
        }
    }

    render() {
        this.updateTheStates(); // TODO: This should *not* occur during render(); render() should have no side effects
        return (
            <View style={{flex:2}}>
                <TemperatureDisplay
                    temperature={this.state.temperature}
                    temperatureTime={this.state.temperatureTime}
                />
                <SwitchDisplay 
                    currentStates={[this.state.heaterState, this.state.coldBlowerState, this.state.hotBlowerState, this.state.lightsState, this.state.jetsState]} 
                    targetTemp={this.state.targetTemp}  
                    callBackFunction={this.switchStateChange.bind(this)}
                    callBackTempChange={this.newTargetTemp.bind(this)}
                />
            </View>
        );
    }
}
