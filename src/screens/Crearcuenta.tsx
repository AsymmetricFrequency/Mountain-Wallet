import * as React from 'react'
import { useState, useRef } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Button, Alert, Clipboard, Modal } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { generateMnemonic, mnemonicToSeed, createAccount, getBalance, getToken, sendTokenTransaction, savePublicKey } from '../../api';
import LottieView from 'lottie-react-native';
import * as Animatable from 'react-native-animatable';




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
    


    function generarMnemonic(){
        const memo = generateMnemonic()
        memo.then((value) => {
          console.log(value);
          setWords(value)
        });setbotonpalabras(true);     
    }
    const CopyToClipboard = () => {
        if(!botonpalabras){
            SetModal(true);

            setanmt("fadeInDownBig");
    
            
            setTimeout( () => {
                setanmt("fadeOutUp");
                setTimeout( () => {
                
                    SetModal(false);
                    
                    // if(anmt === "lightSpeedOut") SetModal(false);
                }, 100 )
                
                // if(anmt === "lightSpeedOut") SetModal(false);
            },2000)

        }else{
            Clipboard.setString(words) 
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




            setbotoncontinuar(true);
        } 
    };

    async function crearCuentejere(palabras: string) {
        const docePalabras = mnemonicToSeed(palabras)
        docePalabras.then((value) => {
            const acc = createAccount(value)
            acc.then((value) => {
                navigation.navigate('PantallaCarga')
                savePublicKey(value.publicKey.toString())
                console.log(value.publicKey);
            })
        })
    }

    

    return (
        <View style={styles.body}>
            <Modal
                visible={showModal}
                transparent
                onRequestClose={() =>
                    SetModal(false)
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
                <Text style={styles.textuno} numberOfLines={2}>CREAR CUENTA</Text>
                <Text style={styles.labeldos} numberOfLines={4}>Oprima en "Generar" y copie las 12 palabras porque son de gran importancia para la seguridad de su cuenta.</Text>
                <TouchableOpacity
                    style={styles.btnG}
                    // onPress={() => vermodal()} activeOpacity={0.9}>
                    onPress={() => generarMnemonic()} activeOpacity={0.9}>
                    
                    <Text style={styles.textG}>GENERAR</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.TextInput} onPress={() => CopyToClipboard()}>
                    <View>
                        <Text  style={styles.labeluno}>{words}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.btnC,{backgroundColor:!botoncontinuar?"rgba(91, 41, 137, 0.58)":"#5b298a"}]}
                    activeOpacity={0.9}
                    disabled={!botoncontinuar}
                    onPress={() => navigation.navigate('PantallaCarga')}
                    
                >
                    <Text style={styles.textC} >CONTINUAR</Text>
                </TouchableOpacity>
                {/* <ActivityIndicator size="small" color="purple" /> */}
            </View>
        </View>
    )
}

export default Crearcuenta

const styles = StyleSheet.create({
    body: {
        width: '100%',
        height: '100%',
        flex: 1,
        paddingTop: '8%'
    },
    containeruno: {
        alignItems: 'center'
    },
    logo: {
        marginTop: '0%',
        width: 150,
        height: 150,
        resizeMode: 'contain',
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
    textuno: {
        fontSize:RFPercentage(2.3),
        fontWeight: 'bold',
        color: '#616161'
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
        marginTop: '5%',
        marginLeft: '5%',
        marginRight: '5%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    TextInput: {
        margin: 10,
        width: 300,
        height: 200,
        borderWidth: 0.8,
        borderColor: 'purple',
        borderRadius: 20,
        padding: 50,
        paddingLeft: 10,
        paddingRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:'5%'
    },
    botonGen: {
        top: 25,
        marginBottom: 20,
        backgroundColor: '#5B298A',
        width: '83%',
        alignItems: 'center',
        borderRadius: 20
    },
    labeluno: {
        margin: 8,
        fontWeight: 'bold',
        fontSize:RFPercentage(2.3),
        textAlign: 'justify'        
    },
    labeldos: {
        margin: 8,
        padding: 10,
        fontSize:RFPercentage(2.3),
        marginRight: '5%',
        marginLeft: '5%',
        textAlign: 'justify',
        color: '#b1b1b1',
    },
    btnG:{
        backgroundColor:'#5b298a',
        paddingTop: '4%',
        paddingBottom: '4%',
        borderRadius: 20,
        marginTop: '5%',
        alignItems: 'center',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.1,
        shadowRadius: 5,  
    },
    btnC:{
        paddingTop: '4%',
        paddingBottom: '4%',
        borderRadius: 20,
        marginTop: '5%',
        alignItems: 'center',

    },
    textG:{
        color:'white',
        fontWeight: 'bold',
        fontSize:RFPercentage(2),
        marginLeft: '15%',
        marginRight: '15%',
    },
    textC:{
        color:'white',
        fontWeight: 'bold',
        fontSize:RFPercentage(2),
        marginLeft: '24%',
        marginRight: '24%',
    },



    //Estilo de modal
    bodymodal: {
        flex: 1,
        // backgroundColor: '#00000099',
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
        top:'2%'
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
