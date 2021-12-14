import React, { useState } from 'react'
import { ImageBackground,StyleSheet, Text, View,TouchableOpacity, Image,Button , Alert } from 'react-native'
import { generateMnemonic, mnemonicToSeed, createAccount, getBalance, getToken,sendTokenTransaction } from '../../api';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, Hoverable, ScrollView } from "react-native-web-hover";
import { TextInput } from 'react-native-element-textinput';
//import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
//navegación


const Home = ({navigation}: {navigation: any}) => {

    setTimeout(() => {
        navigation.navigate("Home" as any)
    }, 2500);

    return (
        <View style={styles.body}>
            <ImageBackground source={require('./img/fondo.png')} style={styles.fondo} >
                <View style={styles.containeruno}>
                    <Image style={styles.logo} source={require('./img/logoblanco.png')}  />
                   
                    <View style={styles.botonesCI}>
                        <View style={styles.Developed}>
                            <Text style={styles.textDeveloped}>DEVELOPED BY</Text>
                            <Text style={styles.textDeveloped}>CONDORCOIN</Text>
                        </View>  
                        <View>
                            <TouchableOpacity style={styles.btnC}  activeOpacity={0.5} onPress={() => navigation.navigate('Crear')}>
                                <Text style={styles.textCI}>CREAR CUENTA</Text> 
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnI}  activeOpacity={0.5} onPress={() => navigation.navigate('ImportarCuenta')}>
                                <Text style={styles.textCI}>IMPORTAR</Text> 
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.fabLocationBR}  onPress={() => Linking.openURL('https://famonterrey.org/')}>
                            
                                <Animatable.View style={styles.fab}
                                    animation="tada"
                                    duration={2000}
                                    iterationCount={"infinite"}>
                                    <Image source={require('./img/LogoMini.png')} style={styles.miniLogo}/>
                                </Animatable.View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.Developed}>
                            <Text style={styles.textDeveloped} onPress={() => Alert.alert('Visita nuestra página','https://condorcoin.co/')}>DEVELOPED BY</Text>
                            <Text style={styles.textDeveloped} onPress={() => Alert.alert('Visita nuestra página','https://condorcoin.co/')}>CONDORCOIN</Text>
                            <Animatable.Image  
                                animation="bounceInRight"
                                duration={2000}
                                source={require('./img/conoce.png')} 
                                style={styles.letrasConoce}
                            >
                            </Animatable.Image>
                        </View>                                       
                    </View>
                </View>             
            </ImageBackground>   
        </View>
    )
}


const styles = StyleSheet.create({
    body: {
        width: '100%',
        height: '100%',
        flex: 1,
    },
    containeruno:{
        paddingTop: '8%',
        paddingLeft: '5%',
        paddingRight: '4%',
        alignItems:'center',
        justifyContent:'center'
    },
    fondo:{
        
        height:'100%',
        resizeMode:'contain',
    },
    logo:{
        width: 250,
        height: 250,
        resizeMode: 'contain',
    },
    botonesCI:{
        backgroundColor:'white',
        width: '100%',
        height: '70%',
        marginTop: '3%',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        paddingTop: '50%',        
    },
    btnC:{
        backgroundColor:'#5b298a',
        alignItems:'center',
        marginRight: '10%',
        marginLeft: '10%',
        paddingTop: '4%',
        paddingBottom: '4%',
        borderRadius: 20,
    },
    btnI:{
        backgroundColor:'#5b298a',
        alignItems:'center',
        marginTop:'5%',
        marginRight: '10%',
        marginLeft: '10%',
        paddingTop: '4%',
        paddingBottom: '4%',
        borderRadius: 20,
    },
    textCI:{
        color:'white',
        fontWeight: 'bold',
        fontSize:RFPercentage(2),
    },
    Developed:{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute', 
        left: 0, 
        right: 0, 
        bottom: 0,
        paddingTop: 0
    },
    textDeveloped:{
        color:'#e0e0e0',
        fontWeight:'bold',
        fontSize:RFPercentage(1.5),
        fontFamily: 'Roboto'
    },
    fabLocationBR: {
        position: 'absolute',
        bottom: -220,
        left: 5
    },
    fab: {
        backgroundColor: '#5b298a',  
        width: 60,
        height: 60,
        borderRadius: 100,
        justifyContent: 'center'
    },
    miniLogo: {
        width: 50,
        height: 50,
        alignSelf: 'center'
    },
    letrasConoce: {
        top: "28%",
        width: 150,
        height: 52,
        resizeMode: 'contain'
    },
})
export default Home