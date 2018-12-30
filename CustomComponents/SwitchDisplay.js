import React, {Component} from 'react';
import { 
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Switch
} from 'react-native';
import styles from '../styles';


export default class SwitchDisplay extends Component {
    state = {
        targetTemp: '<?>',
        editTargetTemp:false,
    };

    //Props:
    //  JetState, HBlowerState, CBlowerState, 
    //   OR
    //  Data, targetTemp
    //  functions:
    //      changeJetState, ChangeHBlowerState, targTempState, ...etc
    //       consider both functions and data to be arrays
    //<SwitchDisplay Data=variableArray targetTemp=102 callbackFunction=callbackFunction />
    // End of props expected
    
    componentWillMount() {
    }

    setTtemp() {
        this.setState({editTargetTemp:true});
    }

    //return a text component when not editing target temp 
    makeTargetTempEditable() {
        if(this.state.editTargetTemp === false) {
            return(
                <Text style={styles.baseText}>{this.props.targetTemp}</Text>
            );
        } else if(this.state.editTargetTemp === true) {
            return(
                <TextInput
                    style={styles.tempControlInput}
                    editable={true}
                    maxLength={5}
                    clearTextOnFocus={true}
                    autoFocus={true}
                    keyboardType={'numeric'}
                    onChangeText={(text) => this.setState({targetTemp:text})}
                    value={this.state.targetTemp}
                    onSubmitEditing={
                        () => {
                            this.setState({editTargetTemp:false})
                            this.props.callBackTempChange(this.state.targetTemp)
                        }
                    }
                />
            );
        }
    }

    getswitchColor(currentSwitchState){
        if(currentSwitchState === false){
            return('red');
        }else if(currentSwitchState === true){
            return('green');
        }else if(currentSwitchState === 'unknown'){
            return('yellow');
        }
    }

/*
    //set values as needed from props
    setValues(){
        //for converting to a single state rerender
        let neededData = false;
        let neededTemp = false;
        let neededFuncs = false;

        if(this.props.Data !== null){
            if(this.props.Data.length !== 0){
                neededData = true;
            }
        }

        if(this.props.targetTemp !== null){
            neededTemp = true;
        }

        if(this.props.neededFunctions !== null){
            if(this.props.neededFunctions.length !== 0){
                neededFuncs = true;
            }
        }
        // TODO: In future have a single setState call here
    }
 */

    render() {
        console.log(this.props);
        return (
            <View style={styles.controlComplex}> 
                <TouchableOpacity onPress={this.setTtemp.bind(this)} >
                    <View style={styles.targetTemp}>
                        <Text style={styles.baseText}>Target Temperature    </Text>
                        {this.makeTargetTempEditable()}
                    </View>
                </TouchableOpacity>
                <View style={styles.switchesComplex}>
                    <View style={styles.switchColumn}>
                        <View style={styles.switchRow}>
                            <TouchableOpacity style={styles.switchField}>
                                <Text style={styles.baseText}>Heater</Text>
                                <Switch
                                    value={this.props.currentStates[0]}
                                    tintColor={this.getswitchColor(this.props.currentStates[0])}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.switchField} onPress={() => this.props.callBackFunction('cBlower')}>
                                    <Text style={styles.baseText}>Cold Blower</Text>
                                    <Switch
                                        value={this.props.currentStates[1]}
                                        onValueChange={() => this.props.callBackFunction('cBlower')}
                                        tintColor={this.getswitchColor(this.props.currentStates[1])}
                                    />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.switchRow}>
                            <TouchableOpacity style={styles.switchField} onPress={() => this.props.callBackFunction('hBlower')}>
                                <Text style={styles.baseText}>Hot Blower</Text>
                                <Switch
                                    value={this.props.currentStates[2]}
                                    onValueChange={() => this.props.callBackFunction('hBlower')}
                                    tintColor={this.getswitchColor(this.props.currentStates[2])}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.switchField} onPress={() => this.props.callBackFunction('lights')}>
                                    <Text style={styles.baseText}>Lights</Text>
                                    <Switch
                                        value={this.props.currentStates[3]}
                                        onValueChange={() => this.props.callBackFunction('lights')}
                                        tintColor={this.getswitchColor(this.props.currentStates[3])}
                                    />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.switchRow}>
                            <TouchableOpacity style={styles.switchField} onPress={() => this.props.callBackFunction('jets')}>
                                    <Text style={styles.baseText}>Jets</Text>
                                    <Switch
                                        value={this.props.currentStates[4]}
                                        onValueChange={() => this.props.callBackFunction('jets')}
                                        tintColor={this.getswitchColor(this.props.currentStates[4])}
                                    />
                            </TouchableOpacity>
                        </View> 
                    </View>
                </View>
            </View>
        );
    }
}
