import * as React from 'react'
import { useState } from 'react'
import { KeyboardAvoidingView,StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Button, Alert, Modal, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { readKey, generateMnemonic, mnemonicToSeed, createAccount, getBalance, getToken,sendTokenTransaction, savePublicKey, saveMmemonic } from '../../api';
import LottieView from 'lottie-react-native';
import * as Animatable from 'react-native-animatable';
//Navegación
import { Dimensions } from 'react-native';

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
            scrollEnabled={false} >
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
                    <Text style={styles.labeluno} ></Text>
                </TextInput>                
                <Text style={styles.labeldos} numberOfLines={4}>Ingrese sus 12 palabras de respaldo en minusculas</Text>
                <TouchableOpacity
                    style={styles.btnC}
                    onPress={() => continuar()}>
                    <Text style={styles.textC}>ACEPTAR</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
    )
}

export default ImportarCuenta

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
    },
    textuno: {
        fontSize:RFPercentage(2.3),
        fontWeight: 'bold',
        color: '#625d5b'
    },
    titulo: {
        fontSize: 25,
        margin: 40
    },
    containerunorama: {
        marginTop: '2%',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    containerdos: {
        marginTop: '10%',
        marginLeft: '2%',
        marginRight: '2%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    TextInputf: {
        margin: 10,
        width: 300,
        height: 200,
        borderWidth: 0.8,
        borderColor: 'purple',
        borderRadius: 20,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop:'5%',
        fontWeight: 'bold',
        fontSize:RFPercentage(2.3),
        flexDirection: 'column',
        textAlignVertical : "center",
        justifyContent: 'center',
        textAlign:'center',
        alignItems: 'center'
        
    },
    labeluno: {
        margin: 8,        
    },
    botonCont: {
        marginBottom: 20,
        top: 20,
        backgroundColor: '#5B298A',
        width: '80%',
        alignItems: 'center',
        borderRadius: 8
    },
    textoBoton: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        padding: 10,
    },
    checkbox: {
        alignSelf: "center",
    },
    
    labeldos: {
        margin: 8,
        padding: 10,
        fontSize:RFPercentage(2.3),
        marginRight: '5%',
        marginLeft: '5%',
        textAlign:'center',
        color: '#b1b1b1',
    },
    btnC:{
        backgroundColor:'#5b298a',
        paddingTop: '4%',
        paddingBottom: '4%',
        borderRadius: 20,
        marginTop: '5%',
        alignItems: 'center',
    },
    textC:{
        color:'white',
        fontWeight: 'bold',
        fontSize:RFPercentage(2),
        marginLeft: '26%',
        marginRight: '26%',
    },


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
