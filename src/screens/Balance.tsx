import React, { useState, useEffect } from 'react'
import {  Dimensions, ImageBackground, StyleSheet, Text, View, TouchableOpacity, Image, Platform } from 'react-native'
import { getBalance, getToken, readPublicKey } from '../../api';
import { RFValue } from "react-native-responsive-fontsize";
import { ScrollView } from "react-native-web-hover";
// Fuente
import * as Font from 'expo-font'

const windowWidth = Dimensions.get('screen').width
const windowHeight = Dimensions.get('screen').height

const Balance = ({navigation}: {navigation: any}) => {

    //Funcion obtener balance
    const [balance, setBalance] = useState(0)

    async function obtenerBalance(publicKey: string) {
        getBalance(publicKey).then((value) => {
            setBalance(value)
        }).catch((error) => {
            return "error"
        })
    }

    //Funcion de obtener splToken
    const [tokenBalance, setTokenBalance] = useState(0)

    async function obtenerTokenB(publicKey:string, mint:string) {
        const bala = getToken(publicKey, mint).then((value) => {
            setTokenBalance(value)
        })
    }

   //Funcion de obtener splToken USDT
   const [tokenBalanceUSDT, setTokenBalanceUSDT] = useState(0)

    async function obtenerTokenBUSDT(publicKey:string, mint:string) {
        const bala = getToken(publicKey, mint).then((value) => {
            setTokenBalanceUSDT(value)
        })
    }

    //funcion obtener llave publica
    const [pKey,setPKey] = useState("")
    readPublicKey().then((val)=>{
        setPKey(val)
    })

    useEffect(()=>{

        //obtener token de USDT(ESTO SOLO SE USA EN LA MAINNET)
        obtenerTokenBUSDT(pKey,"Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB")
        //obtener balance del token
        obtenerTokenB(pKey,"7TMzmUe9NknkeS3Nxcx6esocgyj8WdKyEMny9myDGDYJ")
        //obtener balance solanas
        obtenerBalance(pKey)

    })

    //Función fuentes tipograficas
    const[fontsLoaded, setFontsLoaded] = useState(false);
        
    useEffect(() => {
        if (!fontsLoaded) {
            loadFonts()
        } 
    })
    
        const loadFonts = async () => {
    
            await Font.loadAsync({
                //Fuente
                'opensans-regular': require('../../assets/fonts/OpenSans-Regular.ttf'),           
            })
            setFontsLoaded(true)
        }

    if (!fontsLoaded) {
        return(<View/>)
    }

    return (
        <View style={styles.body}>
            <ImageBackground source={require('./img/fondo.png')} style={styles.fondo} >
                <View style={styles.containeruno}>
                    <Image style={styles.logo} source={require('./img/logoblanco.png')}  />
                    <View style={styles.divisor}>
                        <View style={styles.balanceaux}></View>
                        <View style={styles.balance}>
                            <View style={styles.cajabalance}>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                    <Text style={styles.txtbalance} numberOfLines={1} ellipsizeMode='middle'>{balance}</Text>
                                </ScrollView>
                            </View>
                        </View>
                        <View style={styles.moneda}>
                            <Text style={styles.txtmoneda}>CNDR</Text>
                        </View>
                    </View>
                    {/* <Text style={styles.txtbalance}>{balance}</Text> */}

                    {/* <View style={styles.doscolumnasB} >

                    <View style={styles.doscolumnasB} >

                        <View style={styles.columnaunoB}>
                            <Text style={styles.txtinferiorL}></Text>
                        </View>
                        <View style={styles.columnadosB}>
                            <Text style={styles.txtinferiorR}></Text>
                        </View>
                    </View> */}
                    {/* Cuadro recibir y enviar */}
                    <View style={styles.dcER}>
                        <View style={styles.dcR}>
                            <TouchableOpacity 
                                style= {styles.btnR} 
                                activeOpacity={0.5} 
                                onPress={() => navigation.navigate('Recibir')}
                            >
                                <Text style={styles.textbtnR}>RECIBIR</Text> 
                            </TouchableOpacity>
                        </View>
                        <View style={styles.dcE}>
                            <TouchableOpacity 
                                style={styles.btnR} 
                                activeOpacity={0.5} 
                                onPress={() => navigation.navigate('Enviar')}
                            >
                                <Text style={styles.textbtnR}>ENVIAR</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* tabla de criptos */}
                    <View style={styles.balancecry}>
                    
                        {/* CONDOR */}
                        <View style={styles.tablacry} >
                            <View style={styles.logocry}>
                                <Image style={styles.imgcry} source={require('./img/billeteras/logocondor.png')}  />
                            </View>
                            <View style={styles.nombrecry}>
                                <Text style={styles.ntxtcry}>CONDORCOIN</Text>
                            </View>
                            <View style={styles.smcry}>
                                <View style={styles.saldocry}> 
                                    <Text numberOfLines={1} style={styles.stxtcry} >{tokenBalance}</Text>
                                </View>
                                <View style={styles.monedacry}>
                                    <Text style={styles.mtxtcry}>CNDR</Text>
                                </View>
                            </View>                           
                        </View>  

                        {/* SOLANA */}
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

                        {/* USDT */}
                        <View style={styles.tablacry} >
                            <View style={styles.logocry}>
                                <Image style={styles.imgcry} source={require('./img/billeteras/usdtDos.png')}  />
                            </View>
                            <View style={styles.nombrecry}>
                                <Text style={styles.ntxtcry}>TETHER</Text>
                            </View>
                            <View style={styles.smcry}>
                                <View style={styles.saldocry}>
                                    <Text style={styles.stxtcry}>{tokenBalanceUSDT}</Text>
                                </View>
                                <View style={styles.monedacry}>
                                    <Text style={styles.mtxtcry}>USDT</Text>
                                </View>
                            </View>                           
                        </View>
                    </View>
                </View>             
            </ImageBackground>   
        </View>
    )
}


const alturaios = Platform.OS === 'ios' ? '11%' : '2%';
const anchocaja = Platform.OS === 'ios' ? 115 : 124;
const paddinrightios = Platform.OS === 'ios' ? 15 : 12;

const styles = StyleSheet.create({

    body:{
        height: windowHeight,
        width: windowWidth,
    },
    containeruno:{
        alignItems:'center',
        paddingTop: RFValue(35),
        paddingLeft: RFValue(15),
        paddingRight: RFValue(paddinrightios),
    },
    fondo:{
        height: windowHeight,
        margin:0,
        resizeMode: 'contain',
        width: windowWidth,
    },
    logo:{
        height: windowHeight*0.2,
        resizeMode: 'contain',
        width: windowWidth*0.5,
        
    },
    divisor: {
        flexDirection: 'row',
        width: windowWidth,
    },
    balanceaux:{
        width:"30%",
    },
    balance: {
        alignItems: 'center',
        width:"40%",
    },
    cajabalance:{
        alignItems: 'center',
        justifyContent: 'center',
        width:RFValue(anchocaja),
    },
    txtbalance:{
        color:'white',
        fontSize:RFValue(45),
        fontWeight:'bold',
    },
    moneda:{
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius:5,
        justifyContent: 'center',
        marginVertical:"6%",
        width:"10%",
    },
    txtmoneda:{
        color:'#5b298a',
        fontSize:RFValue(10),
        fontWeight:'bold',
    },
    // doscolumnasB:{
    //     flexDirection: 'row',
    //     width: windowWidth,
    // },
    // columnaunoB: {
    //     width:'50%',
    //     alignItems:'flex-end',
    // },
    // columnadosB: {
    //     alignItems:'center',
    //     width:'12%',
    //     borderRadius: 8,
    //     // paddingLeft: '2%',
    //     // paddingRight: '2%',
    // },
    // txtinferiorL:{
    //     fontFamily:'Roboto',
    //     color:'white',
    //     fontSize:RFPercentage(2.5),
    //     fontWeight:'bold',
    //     paddingLeft: '3%',
    //     paddingRight: '3%',
    // },
    // txtinferiorR:{
    //     fontFamily:'Roboto',
    //     color:'white',
    //     fontSize:RFPercentage(2.5),
    //     fontWeight:'bold',
    // },
    dcER:{
        backgroundColor: 'white',
        borderRadius: 10,
        flexDirection: 'row',
        marginTop: RFValue(5),
        padding: RFValue(15),
    },
    dcR:{
        width: '50%',
    },
    dcE:{
        width:'50%',
    },
    btnR:{
        alignItems:'center',
        backgroundColor:'#5b298a',
        borderRadius: 20,
        elevation:24,
        marginLeft: RFValue(15),
        marginRight: RFValue(15),
        paddingBottom: RFValue(12),
        paddingTop: RFValue(12),
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.5,
        shadowRadius: 8,
    },
    textbtnR:{
        color:'white',
        fontSize:RFValue(11.5),
        fontWeight: 'bold',
    },
    balancecry:{
        backgroundColor:'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: windowHeight*0.7,
        marginTop: RFValue(15),
        padding: RFValue(10),
        
    },
    tablacry:{
        borderColor: '#e0e0e0',
        borderRadius:10,
        borderWidth: 0.8,
        height: windowHeight*0.08,
        flexDirection:'row',
        marginTop:RFValue(10),
        paddingLeft: RFValue(10),
        paddingRight: RFValue(12),
    },
    logocry:{
        justifyContent: 'center',
        width:'15%',
    },
    imgcry:{
        height: windowHeight*0.12,
        resizeMode: 'contain',
        width: windowWidth*0.12,
    },
    nombrecry:{
        justifyContent: 'center',
        paddingLeft: RFValue(8),
        width:'40%', 
    },
    ntxtcry:{
        color: '#8d8c8c',
        fontFamily: 'opensans-regular',
        fontSize:RFValue(14),
        fontWeight: 'bold',
    },
    smcry:{
        alignItems: 'flex-end',
        justifyContent: 'center',
        width:'45%', 
    },
    saldocry:{
        alignItems: 'flex-end',
        justifyContent: 'center', 
    },
    stxtcry:{
        color: '#8d8c8c',
        fontSize:RFValue(18),
    },
    monedacry:{
        justifyContent: 'center',
    },
    mtxtcry:{
        color: '#8d8c8c',
        fontFamily: 'Roboto',
        fontSize:RFValue(13),
    },
})
export default Balance