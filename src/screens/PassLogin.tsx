import React, { Component,useEffect,useRef, useState } from 'react'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Text, StyleSheet, View, Image, Button, Alert, TextInput, TouchableOpacity, Modal, Platform, Dimensions, Keyboard} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import LottieView from 'lottie-react-native';
import * as Animatable from 'react-native-animatable';

import { readPassword } from '../../api';
// Fuente
import * as Font from 'expo-font'

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;
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
                },900)
                setPin1("")
                setPin2("")
                setPin3("")
                setPin4("")
                   
            }
        }

    //Función fuentes tipograficas

    const[fontsLoaded, setFontsLoaded] = useState(false);

        useEffect(() => {
            if (!fontsLoaded) {
                loadFonts();
            }
        });
    const loadFonts = async () => {
        await Font.loadAsync({

            //Fuente
            'opensans-regular': require('../../assets/fonts/OpenSans-Regular.ttf'),           
        });

        setFontsLoaded(true);
    }

    if (!fontsLoaded) {
        return(<View/>);
    }
    ///

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
                    <View style={styles.imgmano}>
                        <Image source={require('./img/logmanito.png')} style={styles.logomano} />
                    </View>
                    {/* Codigo seguridad */}
                    <Text style={styles.textuno} numberOfLines={2}>INGRESA TU CÓDIGO DE SEGURIDAD</Text>
                    <View style={styles.containerunorama}>  
                        <TextInput style={styles.TextInput1} maxLength={1} keyboardType="numeric" autoFocus={true}  secureTextEntry={true} 
                           ref={pin1Ref}
                           value={pin1}
                           onChangeText={text=>{
                               if(!text) pin1Ref.current.focus();
                               else text && pin2Ref.current.focus();
                               setPin1(text);                               
                           }}
                        />
                        <TextInput style={styles.TextInput1} maxLength={1} keyboardType="numeric" secureTextEntry={true} 
                            ref={pin2Ref}
                            value={pin2}
                            onChangeText={text=>{
                                if(!text) pin2Ref.current.focus();
                                else text && pin3Ref.current.focus();
                                setPin2(text);                                
                            }}
                        />
                        <TextInput style={styles.TextInput1} maxLength={1} keyboardType="numeric" secureTextEntry={true} 
                            ref={pin3Ref}
                            value={pin3}
                            onChangeText={text=>{
                                if(!text) pin3Ref.current.focus();
                                else text && pin4Ref.current.focus();
                                setPin3(text);                                
                            }}
                        />
                        <TextInput style={styles.TextInput1} maxLength={1} keyboardType="numeric" secureTextEntry={true} 
                            ref={pin4Ref}
                            value={pin4}
                            onChangeText={text =>{
                                setPin4(text);
                                Keyboard.dismiss()
                            }}                            
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

const alturaios = Platform.OS === 'ios' ? '11%' : '2%';
const paddinrightios = Platform.OS === 'ios' ? 15 : 12;
const cuadroios = Platform.OS === 'ios' ? 55 : 45;
const styles = StyleSheet.create({
    body: {
        height: windowHeight,
        width: windowWidth,
    },
    containeruno: {
        paddingTop: RFValue(35),
        alignItems:'center',
    },
    logo: {
        resizeMode: 'contain',
        width: windowWidth*0.5,
        height: windowHeight*0.2
    },
    containerBlanco: {
        paddingLeft: RFValue(15),
        paddingRight: RFValue(paddinrightios),
        marginTop: RFValue(12),
        alignItems: 'center',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        height: windowHeight*0.8,
        width: windowWidth,
        backgroundColor: 'white',
        elevation:24,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.1,
        shadowRadius: 5,    
    },
    imgmano: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:RFValue(100),
    },
    logomano: {
        width: RFValue(110), 
        height: RFValue(110),
        resizeMode: 'contain',
    },
    textuno: {
        marginTop: RFValue(25),
        fontSize:RFValue(13),
        fontWeight: 'bold',
        color: '#625d5b',
        fontFamily: 'opensans-regular'
    }, 
    
    containerunorama: {
        flexDirection: 'row',
    },
    TextInput1: {
        marginTop: RFValue(12),
        width: RFValue(cuadroios),
        height: RFValue(cuadroios), 
        borderWidth: 1,
        borderColor: 'purple',
        margin: RFValue(5),
        justifyContent: 'center',
        textAlign: 'center',
        borderRadius: 10,
        fontSize:RFValue(15),
        fontWeight: 'bold',
    },
    btnC:{
        backgroundColor:'#5b298a',
        alignItems:'center',
        paddingLeft: RFValue(80),
        paddingRight: RFValue(80),
        paddingTop: RFValue(12),
        paddingBottom: RFValue(12),
        borderRadius: 20,
        marginTop: RFValue(25),
        elevation:24,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.5,
        shadowRadius: 8,
    },
    textCI:{
        color:'white',
        fontWeight: 'bold',
        fontSize:RFValue(11.5),
    },

    //Modal
    bodymodal: {
        flex: 1,
        alignItems: 'center',
    },
    ventanamodal: {
        width: windowWidth*0.95,
        height: windowHeight*0.1,
        backgroundColor: '#5B298A',
        borderWidth: 0.5,
        borderColor: 'black',
        borderRadius: 20,
        paddingLeft:RFValue(12),
        paddingRight:RFValue(12),
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
        fontSize:RFValue(18),
        fontWeight: "bold",
        color:'white'
    },
    notificacion:{
        fontSize:RFValue(12),
        color:'white'
    },
})
export default CodigoVerificacion