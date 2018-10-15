import {Dimensions,StyleSheet} from 'react-native';

const screen = Dimensions.get('window');
export default StyleSheet.create ({
    temperatureContainer: {
        padding: 10,
        height: '30%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000',
    },
    temperature: {
        fontSize: 72,
        fontFamily: 'times',
        color: '#ffeecc',
        textAlign: 'right',
    },
    controlComplex:{
        flex:3,
        flexDirection:'column',
        alignItems:'stretch',
    },
    switchesComplex:{
        flex:1,
        flexDirection:'row',
        alignItems:'stretch',
        margin:4,
    },
    switchColumn:{
        flex:3,
        flexDirection:'column',
        alignItems:'stretch',
    },
    switchField:{
        flex:1,
        flexDirection:'row',
        alignItems:'stretch',
        margin:4,
    },
    baseText:{
        fontFamily: 'times',
    },

});