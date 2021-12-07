import React, { useState } from 'react'
import { ImageBackground,StyleSheet, Text, View,TouchableOpacity, Image,Button , Alert, TextInput} from 'react-native'
import { generateMnemonic, mnemonicToSeed, createAccount, getBalance, getToken,sendTokenTransaction } from '../../api';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, Hoverable, ScrollView } from "react-native-web-hover";
// import { TextInput } from 'react-native-element-textinput';



const Importar = () => {

//traer account

//Funcion enviar token
async function sendToken(){
    const send = sendTokenTransaction("uja3w9XG1g6DQSVT6YASK99FVmdVwXoHVoQEgtEJdLv","7TMzmUe9NknkeS3Nxcx6esocgyj8WdKyEMny9myDGDYJ", 1)
    send.then((value) => {
      console.log(value);
    })
  }

    return (
        <View style={styles.body}>
            <ImageBackground source={require('./img/fondo.png')} style={styles.fondo} >
                <View style={styles.containeruno}>
                    <Image style={styles.logo} source={require('./img/enviar.png')}  />
                    {/*Boton Depositar */}
                    <View style={styles.cuadroD}>
                        <TouchableOpacity style={styles.btnD}  activeOpacity={1}>
                            <Text style={styles.textbtnD}>ENVIAR</Text> 
                        </TouchableOpacity>
                    </View>
                    
                    <View style={styles.cuadro}>
                        {/* Email */}
                        <View style={styles.tablamail} >
                            <View style={styles.cuadromail}>
                                <TextInput style={styles.inputmail} placeholder="DIRECCIÓN: Ezq3cnFnLi3xXxxxXXXxx..." autoFocus={true}/>
                            </View>
                            <View style={styles.cqr}>
                                <TouchableOpacity style={styles.btnqr}  activeOpacity={0.9}>
                                    <Image style={styles.imgqr} source={require('./img/qr.png')}  />
                                </TouchableOpacity>
                            </View>                      
                        </View>
                        {/* Importe*/}
                        <View style={styles.tablaimp} >
                            <View style={styles.cuadroimp}>
                                <TextInput style={styles.inputimp} placeholder="IMPORTE" />
                            </View>
                            <View style={styles.cmax}>
                                <View style={styles.ccnd}>
                                    <Text>CNDR</Text>
                                </View>
                                <View style={styles.cbtnmax}>
                                    <TouchableOpacity style={styles.btnmax}  activeOpacity={0.9}> 
                                        <Text style={styles.txtmax}>MAX</Text>                        
                                    </TouchableOpacity>
                                </View>                                
                            </View>                      
                        </View>
                        {/* BotonConfirmar */}
                        <View>
                            <TouchableOpacity style={styles.btnC}  activeOpacity={0.9} onPress={() => sendToken()}>
                                <Text style={styles.textCI}>CONFIRMAR</Text> 
                            </TouchableOpacity>        
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
    },
    fondo:{
        flex: 1,
        resizeMode:'contain',
    },
    logo:{
        width: 310,
        height: 250,
        top:'4%',
        resizeMode: 'contain',
    },
    cuadroD:{
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        marginTop: '5%',
        width: '100%'
    },
    btnD:{
        backgroundColor:'transparent',
        alignItems:'center',
        paddingTop: '3%',
        paddingBottom: '3%',
        borderRadius: 20,
    },
    textbtnD:{
        color:'#5b298a',
        fontWeight: 'bold',
        fontSize:RFPercentage(3),
    },
    cuadro:{
        backgroundColor:'white',
        width: '100%',
        height: '100%',
        marginTop: '3%',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        padding: '2%',
    },
    tablamail:{
        marginTop:'4%',
        borderWidth: 0.8,
        borderColor: '#e0e0e0',
        borderRadius:10,
        height: '5.8%',
        flexDirection:'row',
        paddingLeft:'2.5%',
        paddingRight:'3.5%',
        paddingTop:'0%'
    },
    cuadromail:{
        width:'80%',
        justifyContent: 'center',
        paddingLeft: '2%'
    },
    inputmail:{
        fontWeight: 'bold',
        fontSize:RFPercentage(1.8),
        color: '#5a5959',
    },
    cqr:{
        width:'20%',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    btnqr:{
        backgroundColor:'#5b298a',
        alignItems:'center',
        paddingTop: '12%',
        paddingBottom: '12%',
        paddingLeft: '23%',
        paddingRight: '23%',
        borderRadius: 10,
    },
    imgqr:{
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
    tablaimp:{
        marginTop:'4%',
        borderWidth: 0.8,
        borderColor: '#e0e0e0',
        borderRadius:10,
        height: '5.8%',
        flexDirection:'row',
        paddingLeft:'2.5%',
        paddingRight:'3.5%',
        paddingTop:'0%'
    },
    cuadroimp:{
        width:'70%',
        justifyContent: 'center',
        paddingLeft: '2%'
    },
    inputimp:{
        fontWeight: 'bold',
        fontSize:RFPercentage(1.8),
        color: '#5a5959',
    },
    cmax:{
        width:'30%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'row',
    },
    ccnd:{
        width:'50%',
    },
    cbtnmax:{
        width:'50%',
    },
    btnmax:{
        backgroundColor:'#5b298a',
        alignItems:'center',
        paddingTop: '20%',
        paddingBottom: '20%',
        paddingLeft: '10%',
        paddingRight:'10%',
        borderRadius: 10,
    },
    txtmax:{
        color:'white',
        fontWeight: 'bold',
        fontSize:RFPercentage(1.5),
    },
    btnC:{
        backgroundColor:'#5b298a',
        alignItems:'center',
        marginRight: '10%',
        marginLeft: '10%',
        paddingTop: '4%',
        paddingBottom: '4%',
        borderRadius: 20,
        marginTop: '20%'
    },
    textCI:{
        color:'white',
        fontWeight: 'bold',
        fontSize:RFPercentage(2),
    },
})
export default Importar