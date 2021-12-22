import React, { useState } from 'react'
import {ImageBackground,StyleSheet, Text, View,TouchableOpacity, Image,Button , Alert, TextInput, SafeAreaView,Clipboard, ToastAndroid, Modal} from 'react-native'
import { generateMnemonic, mnemonicToSeed, createAccount, getBalance, getToken,sendTokenTransaction,readPublicKey } from '../../api';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, Hoverable, ScrollView } from "react-native-web-hover";
import LottieView from 'lottie-react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
// import { TextInput } from 'react-native-element-textinput';
import QRCode from 'react-native-qrcode-svg';
//Navegación



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
        <View style={styles.body}>
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
                    <Image style={styles.logo} source={require('./img/recibir.png')}  />
                    {/*Boton Recibir */}
                    <View style={styles.cuadroR}>
                        <TouchableOpacity style={styles.btnR}  activeOpacity={1}>
                            <Text style={styles.textbtnR}>RECIBIR</Text> 
                        </TouchableOpacity>
                    </View>
                    <View style={styles.cuadro}>
                        {/* Imagen QR */}
                        <View style={styles.cuadroQR}>
                            <QRCode size={200}
                                value={pKey}                                
                            />
                        </View>                            
                        {/* Copiar */}
                        <View style={styles.tablaqr} >
                            <View style={styles.cuadroqr}>
                                <TextInput style={styles.inputqr} editable = {false} value={pKey} />
                            </View>
                            <View style={styles.cbtncop}>
                                    <TouchableOpacity style={styles.btncop}  activeOpacity={0.9} onPress={() => CopyToClipboard()}> 
                                        <Icon name ="copy-outline" size={25} color="white"/>
                                        {/* <Text style={styles.txtcop}>COPIAR</Text>                         */}
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
const styles = StyleSheet.create({
    body: {
        width: '100%',
        height: '100%',
        flex: 1,
    },
    containeruno:{
        paddingTop: '8%',
        paddingLeft: '5%',
        paddingRight: '4%',
        alignItems:'center',
    },
    fondo:{
        flex: 1,
        resizeMode:'contain',
    },
    logo:{
        width: 310,
        height: 250,
        top:'4%',
        resizeMode: 'contain',
    },
    cuadroR:{
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        marginTop: '5%',
        width: '100%'
    },
    btnR:{
        backgroundColor:'transparent',
        alignItems:'center',
        paddingTop: '3%',
        paddingBottom: '3%',
        borderRadius: 20,
    },
    textbtnR:{
        color:'#5b298a',
        fontWeight: 'bold',
        fontSize:RFPercentage(3),
    },
    cuadro:{
        backgroundColor:'white',
        width: '100%',
        height: '100%',
        marginTop: '3%',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        padding: '2%',
    },
    cuadroQR:{
        alignItems:'center',
        padding: '2%',
        marginTop: '2%',
    },
    imgqr:{
        width: 200,
        height: 200,
        resizeMode: 'contain',
        marginTop: '2%'
    },
    tablaqr:{
        borderWidth: 0.8,
        borderColor: '#e0e0e0',
        borderRadius:10,
        height: '5.8%',
        flexDirection:'row',
        paddingLeft:'2.5%',
        paddingRight:'3.5%',
        paddingTop:'0%',
        marginTop: '2%'
    },
    cuadroqr:{
        width:'80%',
        justifyContent: 'center',
        
    },
    inputqr:{
        fontWeight: 'bold',
        fontSize:RFPercentage(1.2),
        color: '#5a5959',
        left: '2%'
    },
    cbtncop:{
        width:'20%',
        alignItems:'center',
        justifyContent: 'center',
    },
    btncop:{
        backgroundColor:'#5b298a',
        paddingTop: '10%',
        paddingBottom: '10%',
        paddingLeft: '10%',
        paddingRight:'10%',
        borderRadius: 10,
        left: '13%'
    },
    txtcop:{
        color:'white',
        fontWeight: 'bold',
        fontSize:RFPercentage(1.5),
    },
    btnC:{
        backgroundColor:'#5b298a',
        alignItems:'center',
        marginRight: '10%',
        marginLeft: '10%',
        paddingTop: '4%',
        paddingBottom: '4%',
        borderRadius: 20,
        marginTop: '5%'
    },
    textCI:{
        color:'white',
        fontWeight: 'bold',
        fontSize:RFPercentage(2),
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
export default Recibir