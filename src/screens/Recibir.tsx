import React, { useState } from 'react'
import {ImageBackground,StyleSheet, Text, View,TouchableOpacity, Image,Button , Alert, TextInput, SafeAreaView,Clipboard, ToastAndroid} from 'react-native'
import { generateMnemonic, mnemonicToSeed, createAccount, getBalance, getToken,sendTokenTransaction,readPublicKey } from '../../api';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, Hoverable, ScrollView } from "react-native-web-hover";

// import { TextInput } from 'react-native-element-textinput';
import QRCode from 'react-native-qrcode-svg';
//Navegación



const Recibir = () => {
   

    const [copiedText, setCopiedText] = useState('')
 
    const CopyToClipboard = () => {
      Clipboard.setString(pKey) 
      Alert.alert('Texto Copiado')     
    };
   
    const fetchCopiedText = async () => {
        const text = await Clipboard.getString()
        setCopiedText(text)
    };
   
    
//funcion obtener llave publica
const [pKey,setPKey] = useState("")
readPublicKey().then((val)=>{
    console.log("PUBLIC KEY:");
    console.log(val);
    
    setPKey(val)
})


    return (
        <View style={styles.body}>
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
                                        <Text style={styles.txtcop}>COPIAR</Text>                        
                                    </TouchableOpacity>
                            </View>                    
                        </View> 
                        {/*Boton volver*/}       
                        <View>
                                <TouchableOpacity style={styles.btnC}  activeOpacity={0.9}>
                                    <Text style={styles.textCI} >VOLVER</Text> 
                                </TouchableOpacity> 
                        </View>           

                        <TouchableOpacity   style={{marginTop:20}}activeOpacity={0.9} onPress={() => fetchCopiedText()}>
                                    <Text >---Click Probar Copiado---</Text> 
                        </TouchableOpacity>  
                        <Text>{copiedText}</Text>
                    </View>
                </View>             
            </ImageBackground>   
        </View>
    )
}


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
        paddingLeft: '1%',
    },
    inputqr:{
        fontWeight: 'bold',
        fontSize:RFPercentage(1.8),
        color: '#5a5959',
    },
    cbtncop:{
        width:'20%',
        alignItems:'center',
        justifyContent: 'center',
    },
    btncop:{
        backgroundColor:'#5b298a',
        paddingTop: '20%',
        paddingBottom: '20%',
        paddingLeft: '10%',
        paddingRight:'10%',
        borderRadius: 10,
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
})
export default Recibir