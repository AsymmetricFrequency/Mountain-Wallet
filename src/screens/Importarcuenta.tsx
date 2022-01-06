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
        alignItems:'center',
        paddingTop: RFValue(35),
        
    },
    logo: {
        height: windowHeight*0.2,
        resizeMode: 'contain',
        width: windowWidth*0.5,
    },
    containerBlanco: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        elevation:24,
        height: windowHeight*0.8,
        marginTop: RFValue(12),
        paddingLeft: RFValue(15),
        paddingRight: RFValue(paddinrightios),
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.1,
        shadowRadius: 5, 
        width: windowWidth,
    },
    textuno: {
        color: '#616161',
        fontSize:RFValue(16),
        fontWeight: 'bold',
        marginTop:RFValue(20),
    },
    TextInputf: {
        borderWidth: 0.8,
        borderColor: 'purple',
        borderRadius: 20,
        height: RFValue(200),
        margin: RFValue(15),
        padding: RFValue(25),
        textAlign: 'center',
        width: RFValue(300),        
    },
    labeluno: {
        color: '#b1b1b1',
        margin: RFValue(8),
        fontSize: RFValue(15),
        marginLeft: RFValue(20),
        marginRight: RFValue(20),
        textAlign: 'justify',
    },
    btnC:{
        alignItems:'center',
        backgroundColor:'#5b298a',
        borderRadius: 20,
        elevation:24,
        marginTop: RFValue(aceptartios),
        paddingBottom: RFValue(12),
        paddingLeft: RFValue(80),
        paddingRight: RFValue(80),
        paddingTop: RFValue(12),
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.5,
        shadowRadius: 8,
    },
    textC:{
        color:'white',
        fontSize:RFValue(11.5),
        fontWeight: 'bold',
    },

    //Modal
    bodymodal: {
        flex: 1,
        alignItems: 'center',
    },
    ventanamodal: {
        alignItems: 'center',
        backgroundColor: '#5B298A',
        borderColor: 'black',
        borderRadius: 20,
        borderWidth: 0.5,
        flexDirection: 'row',
        height: windowHeight*0.1,
        paddingLeft:RFValue(12),
        paddingRight:RFValue(12),
        top:alturaios,
        width: windowWidth*0.95,
    },
    icontext: {
        alignItems: 'center',
    },
    textnoti: {
        //--- No borrar ---//
    },
    contenedorlottie:{
        alignItems: 'center',
        justifyContent: 'center',
    },
    lottie: {
        height:60,
        width:60,
    },
    contenedortext: {
        justifyContent: 'center',
    },
    texticon: {
        color:'white',
        fontSize:RFValue(18),
        fontWeight: "bold",
    },
    notificacion:{
        color:'white',
        fontSize:RFValue(12),
    },
})
export default ImportarCuenta