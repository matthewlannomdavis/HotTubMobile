import {Dimensions, StyleSheet} from 'react-native';

const screen = Dimensions.get('window');

export default StyleSheet.create ({
    temperatureContainer: {
        padding: 10,
        alignItems: 'flex-end',
        backgroundColor: '#000000',
    },
    temperature: {
        fontSize: 72,
        fontFamily: 'times',
        color: '#ffeecc',
    },
    asOf: {
        fontSize: 10,
        color: '#ffeecc',
    },
    controlComplex:{
        flex:3,
        flexDirection:'column',
        padding:1,
        backgroundColor: '#000000',
        borderTopColor: '#ffeecc',
        borderTopWidth:1,
    },
    tempControl:{
        flex:1,
        flexDirection:'row',
        alignItems:'stretch',
    },
    tempControlInput:{
        backgroundColor:'white',
    },
    switchesComplex:{
        flex:1,
        flexDirection:'row',
    },
    switchColumn:{
        flex:1,
        flexDirection:'column',
    },
    switchRow:{
        marginTop:1,
        flexDirection:'row',
        alignItems:'stretch',
    },
    switchField:{
        flex:1,
        flexDirection:'row',
        margin:1,
        justifyContent:"space-between",
        backgroundColor: "#333333",
    },
    baseText:{
        color: '#ffeecc',
        fontFamily: 'times',
        fontSize:14,
    },
    targetTemp:{
        flexDirection:'row'
    }
});