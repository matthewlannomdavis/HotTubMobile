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
        borderWidth:1,
        borderColor:'#ffeecc',
        justifyContent:"space-between",
    },
    baseText:{
        color: '#ffeecc',
        fontFamily: 'times',
        fontSize:24,
    },
    targetTemp:{
        flexDirection:'row'
    }

});