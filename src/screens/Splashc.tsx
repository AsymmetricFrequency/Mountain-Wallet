import React, { useState } from 'react'
import { ImageBackground,StyleSheet, Text, View,TouchableOpacity, Image,Button , Alert, TextInput} from 'react-native'
import { generateMnemonic, mnemonicToSeed, createAccount, getBalance, getToken,sendTokenTransaction } from '../../api';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, Hoverable, ScrollView } from "react-native-web-hover";
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';


const Splashc = () => {

    const navigation = useNavigation();

    setTimeout(() => {
        navigation.navigate("Home" as any)
    }, 2500);

    return (
        <View style={styles.body}>

          <View style={styles.containeruno}>
            {/* <Image style={styles.logorigin} source={require('./img/logocolor.png')}  /> */}
            <Animatable.View 
                    animation="fadeInDownBig"
                    duration={2000}>
                    <Image style={styles.logo} source={require('./img/mm1.png')}  />
            </Animatable.View>
            <Animatable.View
                    animation="fadeInUp"
                    duration={2000}>
                    <Image style={styles.logo2} source={require('./img/mm2.png')}  />
                    <Image style={styles.letras} source={require('./img/mm3.png')}/>
            </Animatable.View>
          </View>
        </View>
    )
}

export default Splashc

const styles = StyleSheet.create({
  body: {
      width: '100%',
      height: '100%',
      flex: 1,
      justifyContent: 'center',
  },
  containeruno:{
      paddingLeft: '5%',
      paddingRight: '4%',
      alignItems:'center',
  },
  logorigin:{
      width: 250,
      height: 250,
      resizeMode: 'contain',
  },
  logo:{
    width: 250,
    height: 250,
    resizeMode: 'contain',
    top: '100%',
  },
  logo2:{
      width: 250,
      height: 250,
      resizeMode: 'contain',
  },
  letras: {
      width: 250,
      height: 250,
      resizeMode: 'contain',
      top: '-50%',
  },
})
