import * as React from 'react'
import { useState, useRef, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Button, Alert, Clipboard, Modal, Platform, Dimensions } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { generateMnemonic, mnemonicToSeed, createAccount, getBalance, getToken, sendTokenTransaction, savePublicKey } from '../../api';
import LottieView from 'lottie-react-native';
import * as Animatable from 'react-native-animatable';
//Fuente
import * as Font from 'expo-font'

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;


const Crearcuenta = ({navigation}: {navigation: any}) => {
    
    const [isSelected, setSelection] = useState(false);
    const [botoncontinuar, setbotoncontinuar] = useState(false);
    const [botonpalabras, setbotonpalabras] = useState(false);

    const [words, setWords] = useState('')

    const [anmt,setanmt]= useState("");
    const [showModal, SetModal] = useState(false);
    const [copiadoModal, setCopiadoModal] = useState(false);
    const vermodal = () => {
        setCopiadoModal(true);

        setanmt("fadeInDownBig");
   
        
        setTimeout( () => {
            setanmt("fadeOutUp");
            setTimeout( () => {
            
                setCopiadoModal(false);
                
                // if(anmt === "lightSpeedOut") SetModal(false);
            }, 100 )
            
            // if(anmt === "lightSpeedOut") SetModal(false);
        },2000)
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


    function generarMnemonic(){
        const memo = generateMnemonic()
        memo.then((value) => {
          console.log(value);
          setWords(value)
        });setbotonpalabras(true);     
    }
    const CopyToClipboard = () => {
        //Si no genera las 12 palabras
        if(!botonpalabras){
            SetModal(true);
            setanmt("fadeInDownBig");
            setTimeout( () => {
                setanmt("fadeOutUp");
                setTimeout( () => {
                    SetModal(false);
                }, 100 )
            },1200)
        }else{
            // accion de copiar
            Clipboard.setString(words) 
            setCopiadoModal(true);
            setanmt("fadeInDownBig");
            setTimeout( () => {
                setanmt("fadeOutUp");
                setTimeout( () => {
                    setCopiadoModal(false);
                }, 100 )
            },900)
            setbotoncontinuar(true);
        } 
    };   

    return (
        <View style={styles.body}>
            <Modal
                visible={showModal}
                transparent
                onRequestClose={() =>
                    SetModal(false)
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
                                    <Text style={styles.notificacion}>No has generado las 12 palabras</Text>
                                </View>
                            </View>  
                        </View>
                    </View>
                </Animatable.View>         
            </Modal>



            <Modal
                visible={copiadoModal}
                transparent
                onRequestClose={() =>
                    setCopiadoModal(false)
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
                                        source={require("./Lottie/copiado.json")}
                                        autoPlay
                                    />
                                </View>
                            </View>   
                            <View style={styles.textnoti}>
                                <View style={styles.contenedortext}>
                                        <Text style={styles.texticon}>Texto Copiado</Text>
                                </View>
                                <View>
                                    <Text style={styles.notificacion}>Guarda las 12 palabras</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </Animatable.View>         
            </Modal>

            <View style={styles.containeruno}>
                <Image source={require('./img/logocolor.png')} style={styles.logo} />
            </View>
            <View style={styles.containerBlanco}>
                {/* texto */}
                <Text style={styles.textuno} numberOfLines={2}>CREAR CUENTA</Text>
                <Text style={styles.labeluno} numberOfLines={4}>Oprima en "Generar" y copie las 12 palabras porque son de gran importancia para la seguridad de su cuenta.</Text>
               
                <TouchableOpacity
                    style={styles.btnG}
                    onPress={() => generarMnemonic()} activeOpacity={0.9}>
                    
                    <Text style={styles.textG}>GENERAR</Text>
                </TouchableOpacity>

                {/* cuadro de 12 palabras */}
                <TouchableOpacity style={styles.TextInput} onPress={() => CopyToClipboard()}>
                    <View>
                        <Text  style={styles.labeldos}>{words}</Text>
                    </View>
                </TouchableOpacity>


                <TouchableOpacity
                    style={[styles.btnC,{backgroundColor:!botoncontinuar?"rgba(91, 41, 137, 0.58)":"#5b298a"}]}
                    activeOpacity={0.9}
                    disabled={!botoncontinuar}
                    onPress={() => navigation.navigate('CrearPass')}
                    
                >
                    <Text style={styles.textC} >CONTINUAR</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const alturaios = Platform.OS === 'ios' ? '11%' : '2%';
const paddinrightios = Platform.OS === 'ios' ? 15 : 12;
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
    textuno: {
        marginTop:RFValue(20),
        fontSize:RFValue(16),
        fontWeight: 'bold',
        color: '#616161',
        fontFamily:'opensans-regular'
    },
    labeluno: {
        margin:RFValue(15),
        fontSize: RFValue(15),
        marginRight: RFValue(20),
        marginLeft: RFValue(20),
        textAlign: 'justify',
        color: '#b1b1b1',
        fontFamily:'opensans-regular'
    },
    btnG:{
        backgroundColor:'#5b298a',
        alignItems:'center',
        paddingLeft: RFValue(85),
        paddingRight: RFValue(85),
        paddingTop: RFValue(12),
        paddingBottom: RFValue(12),
        borderRadius: 20,
        marginTop: RFValue(5),
        elevation:24,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.5,
        shadowRadius: 8,
    },
    textG:{
        color:'white',
        fontWeight: 'bold',
        fontSize:RFValue(11.5),
    },
    TextInput: {
        margin: RFValue(15),
        width: RFValue(300),
        height: RFValue(200),
        borderWidth: 0.8,
        borderColor: 'purple',
        borderRadius: 20,
        padding: RFValue(25),
        alignItems: 'center',
        justifyContent: 'center',
    },
    labeldos: {
        margin: 8,
        fontWeight: 'bold',
        fontSize:RFValue(15),
        textAlign: 'justify'  
    },    
    btnC:{
        backgroundColor:'#5b298a',
        alignItems:'center',
        paddingLeft: RFValue(80),
        paddingRight: RFValue(80),
        paddingTop: RFValue(12),
        paddingBottom: RFValue(12),
        borderRadius: 20,
        marginTop: RFValue(5),
        elevation:24,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.5,
        shadowRadius: 8,

    },
    textC:{
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
export default Crearcuenta