import React from 'react'
import { View, StyleSheet, ImageBackground, Image} from 'react-native';

const EnviarAnimado = ({navigation}: {navigation: any}) => {


    return (
        <View style={styles.body}>
            <ImageBackground source={require('./img/FondoCargar.png')} style={styles.fondo}>
                <Image style={styles.enviar} source={require('./img/enviar.gif')}/>
            </ImageBackground>
        </View>
    )
}

export default EnviarAnimado

const styles = StyleSheet.create({
    
    body: {
        width: '100%',
        height: '100%',
        flex: 1,
        paddingTop: '8%',
        alignItems:'center',
        justifyContent:'center'
    },
    fondo:{
        width: '100%',
        height: '100%',
        alignItems:'center',
        justifyContent:'center'
    },
    textocarga: {
        top: "-10%",
        fontWeight:'bold',
        fontFamily:'OpenSans',
        fontSize: 20
    },
    enviar: {
        alignItems: 'center',
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },

})
