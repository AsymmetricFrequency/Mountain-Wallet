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
        alignItems:'center',
        flex: 1,
        height: '100%',
        justifyContent:'center',
        paddingTop: '8%',
        width: '100%',
    },
    fondo:{
        alignItems:'center',
        height: '100%',
        justifyContent:'center',
        width: '100%',
        
    },
    textocarga: {
        fontFamily:'OpenSans',
        fontSize: 20,
        fontWeight:'bold',
        top: "-10%",
        
    },
    enviar: {
        alignItems: 'center',
        height: '100%',
        resizeMode: 'contain',
        width: '100%',
    },

})
