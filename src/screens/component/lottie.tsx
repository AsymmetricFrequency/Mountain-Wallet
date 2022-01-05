import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import LottieView from 'lottie-react-native';



const Lotierror = () => {
    return (
        <LottieView
            style={styles.lottie}  
            speed={2}                                          
            source={require("../Lottie/error.json")}
            autoPlay
        />
    )
    
}
const Lotiexito = () => {
    return (
        <LottieView
            style={styles.lottiexito}                                            
            source={require("../Lottie/exito.json")}
            speed={2.5}
            autoPlay
            loop={false}
        />
    )
    
}

const Lotieqr = () => {
    return (
        <LottieView
            style={styles.lottieqr}                                            
            source={require("../Lottie/qrscan.json")}
            speed={1}
            autoPlay
            // loop={false}
        />
    )
    
}


const styles = StyleSheet.create({
    lottie: {
        width:60,
        height:60,
    },
    lottiexito: {
        width:200,
        height:200,
    },
    lottieqr: {
        width:380,
        height:380,

    },
})

export {Lotierror, Lotiexito, Lotieqr};

