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
                                <TouchableOpacity style={styles.btncop}  activeOpacity={0.5} onPress={() => CopyToClipboard()}> 
                                    <Icon name ="copy-outline" size={25} color="white"/>
                                </TouchableOpacity>
                            </View>                    
                        </View> 
                        {/*Boton volver*/}       
                        <View>
                            <TouchableOpacity style={styles.btnC}  activeOpacity={0.5} onPress={() => navigation.goBack()} >
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
        alignItems:'center',
        paddingLeft: RFValue(15),
        paddingRight: RFValue(paddinrightios),
        paddingTop: RFValue(35), 
    },
    fondo:{
        height: windowHeight,
        margin:0,
        resizeMode: 'contain',
        width: windowWidth,
    },
    contenedorlogo:{
        alignItems: 'center',
        height: windowHeight*heightlogo,
        justifyContent: 'center',
    },
    logo:{
        resizeMode: 'contain',
        width: windowWidth*0.9,        
    },
    cuadroR:{
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'center',
        padding: RFValue(25),
        width: '100%',
    },
    textbtnR:{
        color:'#5b298a',
        fontSize:RFValue(15),
        fontWeight: 'bold',   
    },
    cuadro:{
        backgroundColor:'white',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        height: windowHeight*0.7,
        marginTop: RFValue(15),
        padding: RFValue(10),
    },
    cuadroQR:{
        alignItems:'center',
        justifyContent: 'center',
        marginTop:RFValue(10),
    },
    tablaqr:{
        borderColor: '#e0e0e0',
        borderWidth: 0.8,
        borderRadius:10,
        height: windowHeight*0.08,
        flexDirection:'row',
        marginTop: RFValue(12),
        paddingLeft: RFValue(10),
        paddingRight: RFValue(12),
    },
    cuadroqr:{
        justifyContent: 'center',
        width:'80%',  
    },
    inputqr:{ 
        color: '#5a5959',
        fontSize:RFValue(13),
        fontWeight: 'bold',
    },
    cbtncop:{
        width:'20%',
        alignItems:'center',
        justifyContent: 'center',
    },
    btncop:{
        alignItems:'center',
        backgroundColor:'#5b298a',
        borderRadius: 10,
        left: RFValue(5),
        padding: RFValue(5),   
    },
    txtcop:{
        color:'white',
        fontWeight: 'bold',
        fontSize:RFPercentage(1.5),
    },
    btnC:{
        alignItems:'center',
        backgroundColor:'#5b298a',
        borderRadius: 20,
        elevation:10,
        marginLeft: RFValue(30),
        marginRight: RFValue(30),
        marginTop: RFValue(15),
        paddingBottom: RFValue(12),
        paddingTop: RFValue(12),
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.5,
        shadowRadius: 8,
    },
    textCI:{
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
        borderWidth: 0.5,
        borderColor: 'white',
        borderRadius: 20,
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
export default Recibir