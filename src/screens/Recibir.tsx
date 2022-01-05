import React, { useState } from 'react'
import {ImageBackground,StyleSheet, Text, View,TouchableOpacity, Image, TextInput, Clipboard, Modal,Platform,Dimensions, ScrollView } from 'react-native'
import { readPublicKey } from '../../api';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import LottieView from 'lottie-react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
import QRCode from 'react-native-qrcode-svg';

    const windowWidth = Dimensions.get('screen').width;
    const windowHeight = Dimensions.get('screen').height;


const Recibir = ({navigation}: {navigation: any}) => {
  
    const [copiedText, setCopiedText] = useState('')
    const [anmt,setanmt]= useState("");
    const [copiadoModal, setCopiadoModal] = useState(false);
    const CopyToClipboard = () => {
        Clipboard.setString(pKey) 
        setCopiadoModal(true);
        setanmt("fadeInDownBig");
        setTimeout( () => {
            setanmt("fadeOutUp");
            setTimeout( () => {
                setCopiadoModal(false);
            }, 100 )
        },2000)   
    };
   
    const fetchCopiedText = async () => {
        const text = await Clipboard.getString()
        setCopiedText(text)
    };
   
    
    //funcion obtener llave publica
    const [pKey,setPKey] = useState("pubKey")

    async function obtenerPKey(){
        readPublicKey().then((val)=>{
            console.log("PUBLIC KEY:");
            console.log(val);
            setPKey(val)
        })
    }

    obtenerPKey()

    return (
        <View style={styles.body} >
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
                                    <Text style={styles.notificacion}>Ya puedes compartir tu dirección</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </Animatable.View>         
            </Modal>
            
            <ImageBackground source={require('./img/fondo.png')} style={styles.fondo} >
                <View style={styles.containeruno}>
                    {/* imagen superior */}
                    <View style={styles.contenedorlogo}>
                        <Image style={styles.logo} source={require('./img/recibir.png')}  />
                    </View>
                    {/*Boton Recibir */}
                    <View style={styles.cuadroR}>
                        <Text style={styles.textbtnR}>RECIBIR</Text> 
                    </View>
                    {/* cuadro blanco */}
                    <View style={styles.cuadro}>
                        {/* Imagen QR */}
                        <View style={styles.cuadroQR}>
                            <QRCode size={windowWidth*0.5}
                                value={pKey}                                
                            />
                        </View>                            
                        {/* Direccion y Copiar */}
                        <View style={styles.tablaqr} >
                            <View style={styles.cuadroqr}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                <TextInput style={styles.inputqr} value={pKey} editable={false}/>
                            </ScrollView>
                            </View>
                            <View style={styles.cbtncop}>
                                    <TouchableOpacity style={styles.btncop}  activeOpacity={0.9} onPress={() => CopyToClipboard()}> 
                                        <Icon name ="copy-outline" size={25} color="white"/>
                                    </TouchableOpacity>
                            </View>                    
                        </View> 
                        {/*Boton volver*/}       
                        <View>
                                <TouchableOpacity style={styles.btnC}  activeOpacity={0.9} onPress={() => navigation.goBack()} >
                                    <Text style={styles.textCI} >VOLVER</Text> 
                                </TouchableOpacity> 
                        </View>             
                        <Text>{copiedText}</Text>
                    </View>
                </View>             
            </ImageBackground>   
        </View>
    )
}


const alturaios = Platform.OS === 'ios' ? '11%' : '2%';
const paddinrightios = Platform.OS === 'ios' ? 15 : 12;
const heightlogo = Platform.OS === 'ios' ? 0.287 : 0.272;

const styles = StyleSheet.create({

    body: {
        height: windowHeight,
        width: windowWidth,
    },
    scroll:{
        backgroundColor: 'red'
    },
    containeruno:{
        paddingTop: RFValue(35),
        paddingLeft: RFValue(15),
        paddingRight: RFValue(paddinrightios),
        alignItems:'center',
    },
    fondo:{
        height: windowHeight,
        width: windowWidth,
        margin:0,
        resizeMode: 'contain',
    },
    contenedorlogo:{
        height: windowHeight*heightlogo,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo:{
        resizeMode: 'contain',
        width: windowWidth*0.9,        
    },
    cuadroR:{
        backgroundColor: 'white',
        borderRadius: 10,
        width: '100%',
        padding: RFValue(25),
        justifyContent: 'center',
        alignItems: 'center',
    },
    textbtnR:{
        color:'#5b298a',
        fontWeight: 'bold',
        fontSize:RFValue(15),
    },
    cuadro:{
        backgroundColor:'white',
        marginTop: RFValue(15),
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        padding: RFValue(10),
        height: windowHeight*0.7
    },
    cuadroQR:{
        alignItems:'center',
        marginTop:RFValue(10),
        justifyContent: 'center',
    },
    tablaqr:{
        borderWidth: 0.8,
        borderColor: '#e0e0e0',
        borderRadius:10,
        height: windowHeight*0.08,
        flexDirection:'row',
        paddingLeft: RFValue(10),
        paddingRight: RFValue(12),
        marginTop: RFValue(12),
    },
    cuadroqr:{
        width:'80%',
        justifyContent: 'center',
    },
    inputqr:{
        fontWeight: 'bold',
        fontSize:RFValue(13),
        color: '#5a5959',},
    cbtncop:{
        width:'20%',
        alignItems:'center',
        justifyContent: 'center',
    },
    btncop:{
        backgroundColor:'#5b298a',
        padding: RFValue(5),
        borderRadius: 10,
        alignItems:'center',
        left: RFValue(5)
    },
    txtcop:{
        color:'white',
        fontWeight: 'bold',
        fontSize:RFPercentage(1.5),
    },
    btnC:{
        backgroundColor:'#5b298a',
        alignItems:'center',
        marginRight: RFValue(30),
        marginLeft: RFValue(30),
        paddingTop: RFValue(12),
        paddingBottom: RFValue(12),
        borderRadius: 20,
        marginTop: RFValue(15),
        elevation:10,
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
        borderColor: 'white',
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
export default Recibir