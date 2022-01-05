import React, { useEffect,useRef, useState } from 'react'
import { RFValue } from "react-native-responsive-fontsize";
import { Text, StyleSheet, View, Image, TextInput, TouchableOpacity, Modal, Platform, Dimensions, Keyboard  } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as Animatable from 'react-native-animatable';
import { savePassword } from '../../api';
import LottieView from 'lottie-react-native';
// Fuente
import * as Font from 'expo-font'

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const CodigoVerificacion = ({navigation}: {navigation: any}) => {
  
        // Referencias para salto input
        const pin1Ref = useRef(null);
        const pin2Ref = useRef(null);
        const pin3Ref = useRef(null);
        const pin4Ref = useRef(null);

        const cof1Ref = useRef(null)
        const cof2Ref = useRef(null)
        const cof3Ref = useRef(null)
        const cof4Ref = useRef(null)
        //Cambiar estados
        const [pin1, setPin1] = useState("")
        const [pin2, setPin2] = useState("")
        const [pin3, setPin3] = useState("")
        const [pin4, setPin4] = useState("")
    
        const [cof1, setCof1] = useState("")
        const [cof2, setCof2] = useState("")
        const [cof3, setCof3] = useState("")
        const [cof4, setCof4] = useState("")


        const [anmt,setanmt]= useState("");
        const [incorrectoModal, setIncorrectoModal] = useState(false);
        const [vacioModal, setvacioModal] = useState(false);

        function validarPassword() {
            if(pin1 === cof1 && pin2 === cof2 && pin3 === cof3 && pin4 === cof4 && pin1 != "" && pin2 != "" && pin3 != "" && pin4 != ""){
                //Entonces aqui ya guardariamos el password y pasariamos al Balance
                //Para guardar el password pues si hay que concatenar pin1+pin2+pin3+pin4 en un solo string
                const password = pin1+pin2+pin3+pin4
                savePassword(password)
                navigation.navigate('PantallaCarga')
            } else if(pin1 == "" || pin2 == "" || pin3 == "" || pin4 == ""  || cof1 == "" || cof2 == "" || cof3 == "" || cof4 == "") {
                setvacioModal(true);
                setanmt("fadeInDownBig");
                setTimeout( () => {
                    setanmt("fadeOutUp");
                    setTimeout( () => {
                        setvacioModal(false);
                    }, 100 )
                },2000)
            } else {
                //Y aqui pues le dariamos un alert que verifique la password
                setIncorrectoModal(true);
                setanmt("fadeInDownBig");
                setTimeout( () => {
                    setanmt("fadeOutUp");
                    setTimeout( () => {
                        setIncorrectoModal(false);
                    }, 100 )
                },2000)
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
        
        return (
        <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.body}
            scrollEnabled={false}
        >
            <Modal
                visible={incorrectoModal}
                transparent
                onRequestClose={() =>
                    setIncorrectoModal(false)
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
                                    <Text style={styles.notificacion}>Los codigos no coinciden</Text>
                                </View>
                            </View> 
                        </View>
                    </View>
                </Animatable.View>         
            </Modal>

            <Modal
                visible={vacioModal}
                transparent
                onRequestClose={() =>
                    setvacioModal(false)
                }
                hardwareAccelerated
            >
                <Animatable.View animation={anmt} duration={600}>
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
                                    <Text style={styles.notificacion}>Algunos de los campos estan vacios</Text>
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
                    <Text style={styles.textuno} numberOfLines={2}>CREAR CÓDIGO DE SEGURIDAD</Text>
                    <View style={styles.containerunorama}>  
                        <TextInput style={styles.TextInput1} maxLength={1} keyboardType="numeric" 
                            ref={pin1Ref}
                            onChangeText={text=>{
                                if(text === "") {
                                    setPin1("")
                                }   else {
                                        text && pin2Ref.current.focus()
                                        setPin1(text);
                                    }                               
                            }}
                        />
                        <TextInput style={styles.TextInput1} maxLength={1} keyboardType="numeric" 
                            ref={pin2Ref}
                            onChangeText={text=>{
                                if(text === "") {
                                    setPin2("")
                                }   else {
                                        text && pin3Ref.current.focus()
                                        setPin2(text);
                                    }                               
                            }}
                        />
                        <TextInput style={styles.TextInput1} maxLength={1} keyboardType="numeric" 
                            ref={pin3Ref}
                            onChangeText={text=>{
                                if(text === "") {
                                    setPin3("")
                                }   else {
                                        text && pin4Ref.current.focus()
                                        setPin3(text);
                                    }                               
                            }}
                        />
                        <TextInput style={styles.TextInput1} maxLength={1} keyboardType="numeric" 
                            ref={pin4Ref}
                            onChangeText={text=>{
                                if(text === "") {
                                    setPin4("")
                                }   else {
                                        text && cof1Ref.current.focus()
                                        setPin4(text);
                                    }                               
                            }}
                        />
                    </View>
                    {/* Confirmar codigo */}
                    <Text style={styles.textdos} numberOfLines={2}>CONFIRMAR CÓDIGO DE SEGURIDAD</Text>
                    <View style={styles.containerunorama}>
                        <TextInput style={styles.TextInput2} maxLength={1} keyboardType="numeric"
                            ref={cof1Ref}
                            onChangeText={text=>{
                                if(text === "") {
                                    setCof1("")
                                }   else {
                                        text && cof2Ref.current.focus()
                                        setCof1(text);
                                    }                               
                            }}
                        />
                        <TextInput style={styles.TextInput2} maxLength={1} keyboardType="numeric"
                            ref={cof2Ref}
                            onChangeText={text=>{
                                if(text === "") {
                                    setCof2("")
                                }   else {
                                        text && cof3Ref.current.focus()
                                        setCof2(text);
                                    }                               
                            }}
                        />
                        <TextInput style={styles.TextInput2} maxLength={1} keyboardType="numeric"
                            ref={cof3Ref}
                            onChangeText={text=>{
                                if(text === "") {
                                    setCof3("")
                                }   else {
                                        text && cof4Ref.current.focus()
                                        setCof3(text);
                                    }                               
                            }}
                        />
                        <TextInput style={styles.TextInput2} maxLength={1} keyboardType="numeric"
                            ref={cof4Ref}
                            onChangeText={text =>{  
                                if(text === "") {
                                    setCof4(text)
                                }   else if(text != "" && pin1 != "" && pin2 != "" && pin3 != "" && pin4 != "" && cof1 != "" && cof2 != "" && cof3 != "") {
                                        setCof4(text) 
                                        Keyboard.dismiss()
                                }   else {
                                        setCof4(text)
                                    }                                                  
                            }} 
                        />                    
                    </View>
                    <View>
                        <TouchableOpacity
                            style={styles.btnC}
                            activeOpacity={0.5}
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
        marginTop:RFValue(20),
    },
    logomano: {
        width: RFValue(110), 
        height: RFValue(110),
        resizeMode: 'contain',
    },
    containerunorama: {
        flexDirection: 'row',
    },
    textuno: {
        marginTop: RFValue(25),
        fontSize:RFValue(13),
        fontWeight: 'bold',
        color: '#625d5b',
        fontFamily:'opensans-regular'
    }, 
    textdos: {
        marginTop: RFValue(25),
        fontSize:RFValue(13),
        fontWeight: 'bold',
        color: '#625d5b',
        fontFamily:'opensans-regular'
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
    },
    TextInput2: {
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