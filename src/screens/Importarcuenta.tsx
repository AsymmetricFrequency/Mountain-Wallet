import * as React from 'react'
import { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Modal, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { RFValue } from "react-native-responsive-fontsize";
import { mnemonicToSeed, createAccount, savePublicKey, saveMmemonic } from '../../api';
import LottieView from 'lottie-react-native';
import * as Animatable from 'react-native-animatable';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const ImportarCuenta = ({navigation}: {navigation: any}) => {

    const [twelfString, setTwelfString] = useState('')

    async function crearCuenta(twelf: string) {
        const docePalabras = mnemonicToSeed(twelf)
        docePalabras.then((value) => {
            const acc = createAccount(value)
            acc.then((value) => {
                navigation.navigate('PantallaCarga')
                savePublicKey(value.publicKey.toString())
            })
        })
    }

    const [anmt,setanmt]= useState("");
    const [vacioModal, setVacioModal] = useState(false);

    function continuar() {
        if (twelfString != "") {
            saveMmemonic(twelfString)
            navigation.navigate('PantallaCarga')
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
        <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.body}
            scrollEnabled={false} 
        >
            <Modal
                visible={vacioModal}
                transparent
                onRequestClose={() =>
                    setVacioModal(false)
                }
                // animationType='slide'
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
                                    <Text style={styles.notificacion}>No has ingresado las 12 palabras</Text>
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
                <Text style={styles.textuno} numberOfLines={2}>IMPORTAR CUENTA</Text>
                <TextInput 
                    style={styles.TextInputf}
                    autoFocus={true} multiline={true}
                    onChangeText={text => setTwelfString(text)}
                    autoCapitalize = 'none'>
                </TextInput>                
                <Text style={styles.labeluno} numberOfLines={4}>Ingrese sus 12 palabras de respaldo en minusculas</Text>
                <TouchableOpacity
                    style={styles.btnC}
                    onPress={() => continuar()}>
                    <Text style={styles.textC}>ACEPTAR</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
    )
}


const alturaios = Platform.OS === 'ios' ? '11%' : '2%';
const paddinrightios = Platform.OS === 'ios' ? 15 : 12;
const aceptartios = Platform.OS === 'ios' ? 15 : 5;

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
        color: '#616161'
    },
    TextInputf: {
        margin: RFValue(15),
        width: RFValue(300),
        height: RFValue(200),
        borderWidth: 0.8,
        borderColor: 'purple',
        borderRadius: 20,
        padding: RFValue(25),
        textAlign: 'center'        
    },
    labeluno: {
        margin: RFValue(8),
        fontSize: RFValue(15),
        marginRight: RFValue(20),
        marginLeft: RFValue(20),
        textAlign: 'justify',
        color: '#b1b1b1',
    },
    btnC:{
        backgroundColor:'#5b298a',
        alignItems:'center',
        paddingLeft: RFValue(80),
        paddingRight: RFValue(80),
        paddingTop: RFValue(12),
        paddingBottom: RFValue(12),
        borderRadius: 20,
        marginTop: RFValue(aceptartios),
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
export default ImportarCuenta