import React, { Component,useRef, useState } from 'react'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Text, StyleSheet, View, Image, Button, Alert, TextInput, TouchableOpacity, Modal, Platform } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import LottieView from 'lottie-react-native';
import * as Animatable from 'react-native-animatable';

import { readPassword } from '../../api';
//navegación


const CodigoVerificacion = ({navigation}: {navigation: any}) => {
  
        // Referencias para salto input
        const pin1Ref = useRef(null)
        const pin2Ref = useRef(null)
        const pin3Ref = useRef(null)
        const pin4Ref = useRef(null)

        const [pin1, setPin1] = useState("");
        const [pin2, setPin2] = useState("");
        const [pin3, setPin3] = useState("");
        const [pin4, setPin4] = useState("");

        const [storedPass, setStoredPass] = useState("")

        readPassword().then((val)=>{
            console.log("PASSWORD:");
            console.log(val);
            
            setStoredPass(val)
        })

        const [anmt,setanmt]= useState("");
        const [vacioModal, setVacioModal] = useState(false);

        function validarPassword() {
            const password = pin1+pin2+pin3+pin4
            if (password == storedPass) {
                navigation.navigate('Balance')
            } else {
                setVacioModal(true);
                setanmt("fadeInDownBig");            
                setTimeout( () => {
                setanmt("fadeOutUp");
                setTimeout( () => {
                    setVacioModal(false);
                }, 100 ) 
                },2000)
            }
        }

        return (
        <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.body}
        scrollEnabled={false}>

            
            <Modal
                visible={vacioModal}
                transparent
                onRequestClose={() =>
                    setVacioModal(false)
                }
                // animationType='slide'
                hardwareAccelerated
                
            >
                <Animatable.View animation={anmt} duration= {600}>
                    
                    <View style={styles.bodymodal}>
                        <View style={styles.ventanamodal}>
                            <View style={styles.icontext}>
                                <View style={styles.contenedorlottie}>
                                    <LottieView
                                        style={styles.lottie}
                                        source={require("./Lottie/error.json")}
                                        autoPlay
                                    />
                                </View>
                                
                                
                            </View>   
                            <View style={styles.textnoti}>
                                <View style={styles.contenedortext}>
                                        <Text style={styles.texticon}>Error</Text>
                                </View>
                                <View>
                                    <Text style={styles.notificacion}>Contraseña incorrecta</Text>
                                </View>
                            </View>               
                            

                        </View>
                
                    </View>
                </Animatable.View>         
            </Modal>


            <View style={styles.containeruno}>
                {/* logo */}
                <Image source={require('./img/logocolor.png')} style={styles.logo} />
                {/* BordeGris */}
                <View style={styles.containerBlanco}>
                    <Image source={require('./img/logmanito.png')} style={styles.logomano} />
                    {/* Codigo seguridad */}
                    <Text style={styles.textuno} numberOfLines={2}>INGRESA TU CÓDIGO DE SEGURIDAD</Text>
                    <View style={styles.containerunorama}>  
                        <TextInput style={styles.TextInput1} maxLength={1} keyboardType="numeric" autoFocus={true}  secureTextEntry={true} 
                           ref={pin1Ref}
                           onChangeText={text=>{
                               if(!text) pin1Ref.current.focus();
                               else text && pin2Ref.current.focus();
                               setPin1(text);                               
                           }}
                        />
                        <TextInput style={styles.TextInput1} maxLength={1} keyboardType="numeric" secureTextEntry={true} 
                            ref={pin2Ref}
                            onChangeText={text=>{
                                if(!text) pin2Ref.current.focus();
                                else text && pin3Ref.current.focus();
                                setPin2(text);
                                
                            }}
                        />
                        <TextInput style={styles.TextInput1} maxLength={1} keyboardType="numeric" secureTextEntry={true} 
                            ref={pin3Ref}
                            onChangeText={text=>{
                                if(!text) pin3Ref.current.focus();
                                else text && pin4Ref.current.focus();
                                setPin3(text);
                                
                            }}
                        />
                        <TextInput style={styles.TextInput1} maxLength={1} keyboardType="numeric" secureTextEntry={true} 
                            ref={pin4Ref}
                            onChangeText={text => setPin4(text)}
                        />
                    </View>
                    <View>
                        <TouchableOpacity
                            style={styles.btnC}
                            activeOpacity={0.9}
                            onPress={() => validarPassword()}
                        >
                            <Text style={styles.textCI}>CONFIRMAR</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>            

        </KeyboardAwareScrollView>
        )
    }


export default CodigoVerificacion

const alturaios = Platform.OS === 'ios' ? '11%' : '2%';

const styles = StyleSheet.create({
    body: {
        width: '100%',
        height: '100%',
        flex: 1,
        paddingTop: '8%'
    },
    containeruno: {
        alignItems: 'center',
    },
    containerBlanco: {
        marginTop: 10,
        alignItems: 'center',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingTop: '10%',
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.1,
        shadowRadius: 5,     
    },
    logo: {
        marginTop: '0%',
        width: 150,
        height: 150,
        resizeMode: 'contain',
        alignItems: 'center',
    },
    logomano: {
        top: '5%',
        alignItems: 'center',
        width: 100,
        height: 100,
        
    },
    textuno: {
        
        marginTop: '20%',
        fontSize:RFPercentage(1.5),
        fontWeight: 'bold',
        color: '#625d5b',
    }, 
    
    containerunorama: {
        flexDirection: 'row',
        //container para los textInput


    },
    TextInput1: {
        marginTop: '10%',
        flexDirection: 'row',
        width: 50,
        height: 50, 
        borderWidth: 1,
        borderColor: 'purple',
        margin: 5,
        paddingLeft: 22,
        borderRadius: 10,
        fontSize:RFPercentage(3),


    },
    btnC:{
        backgroundColor:'#5b298a',
        paddingTop: '4%',
        paddingBottom: '4%',
        borderRadius: 20,
        marginTop: '20%',
        alignItems: 'center',
    },
    textCI:{
        color:'white',
        fontWeight: 'bold',
        fontSize:RFPercentage(2),
        marginLeft: '22%',
        marginRight: '22%',
    },

    //Modal

    bodymodal: {
        flex: 1,
        alignItems: 'center',
    },
    ventanamodal: {
        width: 350,
        height: 80,
        backgroundColor: '#5B298A',
        borderWidth: 0.5,
        borderColor: '#000',
        borderRadius: 20,
        paddingLeft:'5%',
        paddingRight:'5%',
        flexDirection: 'row',
        alignItems: 'center',
        top:alturaios
    },
    icontext: {
        alignItems: 'center',
    },
    textnoti: {

    },
    contenedorlottie:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    lottie: {
        width:60,
        height:60,
    },
    contenedortext: {
        justifyContent: 'center',
    },
    texticon: {
        fontSize:RFValue(25),
        fontWeight: "bold",
        color:'white'

    },
    notificacion:{
        fontSize:RFValue(15),
        color:'white'
    },
})
