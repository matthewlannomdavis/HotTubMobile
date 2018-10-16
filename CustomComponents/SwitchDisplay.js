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
        targetTemp:"00.0",
        editTargetTemp:false,
        heaterSwitch:false,
        cBlowerState:false,
        HBlowerState:false,
        lightsState:false,
        jetsState:false,
    };
    //Props:
    //  JetState, HBlowerState, CBlowerState, 
    //   OR
    //  Data, targetTemp
    //  functions:
    //      changeJetState, ChangeHBlowerState, targTempState, ...etc
    //       consider both functions and data to be arrays
    //<SwitchDisplay Data=variableArray targetTemp=102 neededFunctions=variableArray />
    // End of props expected

    switchPressed(switchName){

    }
    setTtemp(){
        this.setState({editTargetTemp:true});
    }
    //return a text component when not editing target temp 
    makeTargetTempEditable(){
        if(this.state.editTargetTemp === false) {
            return(
                <Text>{this.state.targetTemp}</Text>
            );
        }else if(this.state.editTargetTemp === true) {
            return(        
                <TextInput
                    editable={true}
                    maxLength={5}
                    autoFocus={true}
                    keyboardType={'numeric'}
                    onChangeText={(text) => this.setState({targetTemp:text})}
                    value={this.state.targetTemp}
                    onSubmitEditing={() => this.setState({editTargetTemp:false})}
                />
            );
        }
    }
    //set values as needed from props
    setVaules(){
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
        //in future have a single setState call here
    }

    render() {
        return (
            <View style={styles.controlComplex}> 
                <TouchableOpacity onPress={this.setTtemp.bind(this)} >
                <View style={styles.targetTemp}>
                    <Text style={styles.baseText}>Target Temperature</Text>
                    {this.makeTargetTempEditable()}
                </View>
                </TouchableOpacity>
                <View style={styles.switchesComplex}>
                    <View style={styles.switchColumn}>
                        <View style={styles.switchRow}>
                            <TouchableOpacity style={styles.switchField}>
                                <Text style={styles.baseText}>Heater</Text><Switch/>     
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.switchField}>
                                    <Text style={styles.baseText}>Cold Blower</Text><Switch/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.switchRow}>
                            <TouchableOpacity style={styles.switchField}>
                                <Text style={styles.baseText}>Hot Blower</Text><Switch/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.switchField}>
                                    <Text style={styles.baseText}>Lights</Text><Switch/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.switchRow}>
                            <TouchableOpacity style={styles.switchField}>
                                    <Text style={styles.baseText}>Jets</Text><Switch/>
                            </TouchableOpacity>
                        </View> 
                    </View>
                </View>
            </View>
        );
    }
}
