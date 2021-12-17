import React, { useState, useEffect } from 'react'
import { ImageBackground,StyleSheet, Text, View,TouchableOpacity, Image,Button , Alert, BackHandler, Linking } from 'react-native'
import { generateMnemonic, mnemonicToSeed, createAccount, getBalance, getToken,sendTokenTransaction,readPublicKey } from '../../api';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, Hoverable, ScrollView } from "react-native-web-hover";
import { TextInput } from 'react-native-element-textinput';
import * as Animatable from 'react-native-animatable';



const Balance = ({navigation}: {navigation: any}) => {

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
        return () => backHandler.remove()
      }, [])

    //Funcion obtener balance
    const [balance, setBalance] = useState(0)

    async function obtenerBalance(publicKey: string) {
        getBalance(publicKey).then((value) => {
        console.log(value)
        setBalance(value)
        }).catch((error) => {
        console.log(error);
        return "error"
        })
    }

    //value textinput

    //Funcion de obtener splToken
  const [tokenBalance, setTokenBalance] = useState(0)

  async function obtenerTokenB(publicKey:string, mint:string) {
    const bala = getToken(publicKey, mint).then((value) => {
      setTokenBalance(value)
      console.log(value);
    })
  }

//funcion obtener llave publica
const [pKey,setPKey] = useState("")
readPublicKey().then((val)=>{
    console.log("PUBLIC KEY:");
    console.log(val);
    
    setPKey(val)
})

  obtenerTokenB(pKey,"7TMzmUe9NknkeS3Nxcx6esocgyj8WdKyEMny9myDGDYJ")
  //obtener balance de una llave publica
  obtenerBalance(pKey)


    return (
        <View style={styles.body}>
            <ImageBackground source={require('./img/fondo.png')} style={styles.fondo} >
                <View style={styles.containeruno}>
                    <Image style={styles.logo} source={require('./img/logoblanco.png')}  />
                    {/* Balance */}
                    <Text style={styles.txtbalance}>{balance}...</Text>
                    {/* Balance inferior */}
                    <View style={styles.doscolumnasB} >
                        <View style={styles.columnaunoB}>
                            <Text style={styles.txtinferiorL}></Text>
                        </View>
                        <View style={styles.columnadosB}>
                            <Text style={styles.txtinferiorR}></Text>
                        </View>
                    </View>
                    {/* Enviar y recibir */}
                    <View style={styles.dcER}>
                        <View style={styles.dcR}>
                            <TouchableOpacity style=
                            {styles.btnR} 
                            activeOpacity={0.9} 
                            onPress={() => navigation.navigate('Recibir')}
                            >
                                <Text style={styles.textbtnR}>RECIBIR</Text> 
                            </TouchableOpacity>
                        </View>
                        <View style={styles.dcE}>
                            <TouchableOpacity style=
                            {styles.btnR} 
                            activeOpacity={0.9} 
                            onPress={() => navigation.navigate('Enviar')}
                            >
                                <Text style={styles.textbtnR}>ENVIAR</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* Balance cryptos */}
                    <View style={styles.balancecry}>
                        <View style={styles.tablacry} >
                            <View style={styles.logocry}>
                                <Image style={styles.imgcry} source={require('./img/billeteras/logocondor.png')}  />
                            </View>
                            <View style={styles.nombrecry}>
                                <Text style={styles.ntxtcry}>CONDORCOIN</Text>
                            </View>
                            <View style={styles.smcry}>
                                <View style={styles.saldocry}>
                                    <Text style={styles.stxtcry}>{tokenBalance}</Text>
                                </View>
                                <View style={styles.monedacry}>
                                    <Text style={styles.mtxtcry}>CNDR</Text>
                                </View>
                            </View>                           
                        </View>                        
                        <View style={styles.tablacry} >
                            <View style={styles.logocry}>
                                <Image style={styles.imgcry} source={require('./img/billeteras/solana.png')}  />
                            </View>
                            <View style={styles.nombrecry}>
                                <Text style={styles.ntxtcry}>SOLANA</Text>
                            </View>
                            <View style={styles.smcry}>
                                <View style={styles.saldocry}>
                                    <Text style={styles.stxtcry}>{balance}</Text>
                                </View>
                                <View style={styles.monedacry}>
                                    <Text style={styles.mtxtcry}>SOL</Text>
                                </View>
                            </View>                           
                        </View>
                    </View>
                    <View style={styles.Developed}>
                        <TouchableOpacity style={styles.btnlogo}  onPress={() => Linking.openURL('https://famonterrey.org/')} >
                                {/* onPress={() => Alert.alert('https://famonterrey.org/')} */}
                                <Animatable.View style={styles.fab}
                                    duration={2000}
                                    iterationCount={"infinite"}>
                                    <Image source={require('./img/LogoMin.png')} style={styles.miniLogo}/>
                                </Animatable.View>
                        </TouchableOpacity>
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
        width: 180,
        height: 180,
        resizeMode: 'contain',
    },
    txtbalance:{
        fontFamily:'Roboto',
        fontSize:RFPercentage(5),
        color:'white',
        fontWeight:'bold',
    },
    doscolumnasB:{
        flexDirection: 'row',
        width:'100%',
    },
    columnaunoB: {
        width:'50%',
        alignItems:'flex-end',
    },
    columnadosB: {
        alignItems:'center',
        width:'12%',
        borderRadius: 8,
        // paddingLeft: '2%',
        // paddingRight: '2%',
    },
    txtinferiorL:{
        fontFamily:'Roboto',
        color:'white',
        fontSize:RFPercentage(2.5),
        fontWeight:'bold',
        paddingLeft: '3%',
        paddingRight: '3%',
    },
    txtinferiorR:{
        fontFamily:'Roboto',
        color:'white',
        fontSize:RFPercentage(2.5),
        fontWeight:'bold',

    },
    dcER:{
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        marginTop: '5%',
    },
    dcR:{
        fontFamily:'Roboto',
        width:'50%',
    },
    dcE:{
        fontFamily:'Roboto',
        width:'50%',
    },
    btnR:{
        backgroundColor:'#5b298a',
        alignItems:'center',
        marginRight: '10%',
        marginLeft: '10%',
        paddingTop: '8%',
        paddingBottom: '8%',
        borderRadius: 20,
    },
    textbtnR:{
        color:'white',
        fontWeight: 'bold',
        fontSize:RFPercentage(2),
    },
    balancecry:{
        backgroundColor:'white',
        width: '100%',
        height: '100%',
        marginTop: '3%',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        padding: '2%',
    },
    tablacry:{
        marginTop:'4%',
        borderWidth: 0.8,
        borderColor: '#e0e0e0',
        borderRadius:10,
        height: '5.8%',
        flexDirection:'row',
        paddingLeft:'2.5%',
        paddingRight:'3.5%',
        paddingTop:'0%'
    },
    logocry:{
        width:'15%',
        justifyContent: 'center',
    },
    imgcry:{
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    nombrecry:{
        width:'45%',
        justifyContent: 'center',
        paddingLeft: '2%'
    },
    ntxtcry:{
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        fontSize:RFPercentage(2.3),
        color: '#8d8c8c',
    },
    smcry:{
        width:'40%',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    saldocry:{
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    stxtcry:{
        fontFamily: 'Roboto',
        fontSize:RFPercentage(2.5),
        color: '#8d8c8c',
    },
    monedacry:{
        justifyContent: 'center',
    },
    mtxtcry:{
        fontFamily: 'Roboto',
        fontSize:RFPercentage(1.8),
        color: '#8d8c8c',
    },
    fab: {
        backgroundColor: '#5b298a',  
        width: 60,
        height: 60,
        borderRadius: 100,
        justifyContent: 'center'
    },
    miniLogo: {
        width: 50,
        height: 50,
        alignSelf: 'center'
    },

    Developed:{
        width: "100%",
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute', 
        top:'60%',
        resizeMode: 'contain',
        marginLeft:'90%',
        left:'-4%'

    },
    btnlogo:{
        
        // width: "100%",
        // height: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute', 
        left: 0, 
        right: 0, 
        paddingTop: 0,
        top:0
    },
})
export default Balance