import React, { useState} from 'react'
import { ImageBackground,StyleSheet, Text, View,TouchableOpacity, Image, TextInput, Modal,Platform,Dimensions,} from 'react-native'
import { mnemonicToSeed, createAccount, enviarTrans, readMnemonic, getToken, readPublicKey, getBalance } from '../../api';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as Animatable from 'react-native-animatable';
import { Lotierror,Lotiexito } from './component/lottie';

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const Importar = ({navigation}: {navigation: any}) => {
    
    //traer account
    const [pubKey,setPubKey] = useState("")
    const [amounToken,setAmounToken] = useState("")

    //Funcion de obtener splToken
    const [tokenBalance, setTokenBalance] = useState("")

    async function obtenerTokenB(publicKey:string, mint:string) {
        const bala = getToken(publicKey, mint).then((value) => {
            setTokenBalance(value)
        })
    }

    const [pKey,setPKey] = useState("")

    readPublicKey().then((val)=>{
        setPKey(val)
    })

    const [balance, setBalance] = useState(0)

    async function obtenerBalance(publicKey: string) {
        getBalance(publicKey).then((value) => {
            setBalance(value)
        }).catch((error) => {
            return "error"
        })
    }

    setTimeout(() => {
        obtenerTokenB(pKey,"7TMzmUe9NknkeS3Nxcx6esocgyj8WdKyEMny9myDGDYJ")
        obtenerBalance(pKey)
    }, 1000)
    
    //Constantes modales
    const [anmt,setanmt]= useState("");
    const [MostrarModal, setModal] = useState(false);
    const [MostrarError, setError] = useState("");
    const [lottie, setLottie] = useState(<Lotierror/>);
    const [aprobado,setaprobado] = useState(false);
    const [mostrartitulo, setmostrartitulo] = useState("");
    //Constante animacion evnio
    const [enviarT, setenviarT] = useState(false);
    // Nueva funcion de enviar token 
    async function enviarToken(pubKey:string, amount:number) {

        setenviarT(true)

        // Verificar si los dos inputs contienen valores
        if (amounToken != '' && pubKey != '') {
            const tengo = Number(tokenBalance)
            const necesito = Number(amounToken)
            // Si lo que deseo enviar es mayor a lo que tengo
            if(tengo < necesito){
                setenviarT(false)
                setmostrartitulo("Error");
                setError("No tienes CNDR suficiente");
                setModal(true);
                setLottie(<Lotierror/>)
                setanmt("fadeInDownBig");
                setTimeout( () => {
                    setanmt("fadeOutUp");
                    setTimeout( () => {
                        setModal(false);
                    }, 100 )
                },2500)  
            } else if(balance == 0){
                setenviarT(false)
                setmostrartitulo("Error");
                setError("No tienes SOL suficiente");
                setModal(true);
                setLottie(<Lotierror/>)
                setanmt("fadeInDownBig");
                setTimeout( () => {
                    setanmt("fadeOutUp");
                    setTimeout( () => {
                        setModal(false);
                    }, 100 )
                },2500)  
            }  else {
                const mnemonic = readMnemonic()
                mnemonic.then((value) => {
                    const docePalabras = mnemonicToSeed(value)
                    docePalabras.then((value) => {
                        const acc = createAccount(value)
                            acc.then((value) => {
                                enviarTrans(value,pubKey,amount).then((value) => {
                                    // La cuenta no ha sido fondeada
                                    if (value == 'Error: Failed to find account') {
                                        setenviarT(false)
                                        setmostrartitulo("Error");
                                        setError("La cuenta no ha sido fondeada");
                                        setModal(true);
                                        setLottie(<Lotierror/>)
                                        setanmt("fadeInDownBig");
                                        setTimeout( () => {
                                            setanmt("fadeOutUp");
                                            setTimeout( () => {
                                                setModal(false);
                                            }, 100 )
                                        },1000)  
                                    // La public key ingresada esta paila
                                    } else if (value == 'Error: Invalid public key input') {
                                        setenviarT(false)
                                        setmostrartitulo("Error");
                                        setError("La billetera destino no existe");
                                        setModal(true);
                                        setLottie(<Lotierror/>)
                                        setanmt("fadeInDownBig");
                                        setTimeout( () => {
                                            setanmt("fadeOutUp");
                                            setTimeout( () => {
                                                setModal(false);
                                            }, 100 )
                                        },2500) 
                                    } else if(value == 'Error: Non-base58 character') {
                                        setenviarT(false)
                                        setmostrartitulo("Error");
                                        setError("La direccion no puede contener espacios");
                                        setModal(true);
                                        setLottie(<Lotierror/>)
                                        setanmt("fadeInDownBig");
                                        setTimeout( () => {
                                            setanmt("fadeOutUp");
                                            setTimeout( () => {
                                                setModal(false);
                                            }, 100 )
                                        },2000) 
                                    } else if(value == 'signature') {
                                        //animacion transacccion exitosa
                                        setenviarT(false)
                                        setaprobado(true);
                                        setmostrartitulo("Transaccion Exitosa");
                                        setError("Todo salio correcto");
                                        setLottie(<Lotiexito/>)
                                        setanmt("fadeInDownBig");
                                        setAmounToken("");
                                        setTimeout( () => {
                                            setanmt("fadeOutUp");
                                            setTimeout( () => {
                                                setaprobado(false);
                                            }, 100 )                                        
                                        },3000) 
                                        // navigation.navigate('Balance')
                                    } else {
                                        setenviarT(false)
                                        setmostrartitulo("Error");
                                        setError("Ha ocurrido un error inesperado");
                                        setModal(true);
                                        setLottie(<Lotierror/>)
                                        setanmt("fadeInDownBig");
                                        setTimeout( () => {
                                            setanmt("fadeOutUp");
                                            setTimeout( () => {
                                                setModal(false);
                                            }, 100 )
                                        },1000) 
                                    }
                                })
                            })
                    })
                }) 
        }
        // Si alguno de los inputs esta vacio
        } else {
            setenviarT(false)
            setmostrartitulo("Error");
            setError('Revisa los datos ingresados');
            setModal(true);
            setLottie(<Lotierror/>)
            setanmt("fadeInDownBig");
            setTimeout( () => {
                setanmt("fadeOutUp");
                setTimeout( () => {
                    setModal(false);
                }, 100 )
            },1000)  
        }
    }

    function setMax() {
        setAmounToken(tokenBalance.toString())
    }

    //Animacion de enviado
    if(enviarT){
        return (
            <View style={styles.body}>
                <ImageBackground source={require('./img/FondoCargar.png')} style={styles.fondo}>
                    <Image style={styles.enviar} source={require('./img/enviar.gif')}/>
                </ImageBackground>
            </View>
        )
    }

    return (
        <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.body}
            scrollEnabled={false}>
                <Modal
                    visible={MostrarModal}
                    transparent
                    onRequestClose={() =>
                        setModal(false)
                    }
                    hardwareAccelerated
                >
                    <View style={styles.cajamodal}>
                        <Animatable.View animation={anmt} duration= {600}>
                            <View style={styles.bodymodal}>
                                <View style={styles.ventanamodal}>
                                    <View style={styles.icontext}>
                                        <View style={styles.contenedorlottie}>
                                            {lottie}
                                        </View>
                                    </View>   
                                    <View style={styles.textnoti}>
                                        <View style={styles.contenedortext}>
                                            <Text style={styles.texticon}>{mostrartitulo}</Text>
                                        </View>
                                        <View>
                                            <Text style={styles.notificacion}>
                                                {MostrarError}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </Animatable.View>
                    </View>         
                </Modal>
                {/* Modal transaccion exitosa */}
                <Modal
                    visible={aprobado}
                    transparent
                    onRequestClose={() =>
                        setaprobado(false)
                    }
                    hardwareAccelerated
                >
                    <View style={styles.cajafull}>
                        <Animatable.View animation={anmt} duration= {600}>
                                <View style={styles.ventanafull}>
                                    <View style={styles.icontextfull}>
                                        <View style={styles.contenedorlottiefull}>
                                            {lottie}
                                        </View>
                                    </View>   
                                    <View style={styles.contenedortextfull}>
                                        <Text style={styles.texticonfull}>{mostrartitulo}</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.notificacionfull}>
                                            {MostrarError}
                                        </Text>
                                    </View>
                                </View>
                        </Animatable.View>
                    </View>         
                </Modal>

                <ImageBackground source={require('./img/fondo.png')} style={styles.fondo} >
                    <View style={styles.containeruno}>
                        <View style={styles.contenedorlogo}>
                            <Image style={styles.logo} source={require('./img/enviar.png')}  />
                        </View>
                        {/*Boton Depositar */}
                        <View style={styles.cuadroE}>
                            <Text style={styles.textbtnE}>ENVIAR</Text> 
                        </View>                    
                        <View style={styles.cuadro}>
                            {/* Email */}
                            <View style={styles.tablamail} >
                                <View style={styles.cuadromail}>
                                    <TextInput style={styles.inputmail} value={pubKey} placeholder="DIRECCIÓN: Ezq3cnFnLi3xXxxxXXXxx..." onChangeText={text => setPubKey(text)}/>
                                </View>
                                <View style={styles.cqr}>
                                    <TouchableOpacity style={styles.btnqr}  activeOpacity={0.5} onPress={() => navigation.navigate('QrReader')} >
                                        <Image style={styles.imgqr} source={require('./img/qr.png')}  />
                                    </TouchableOpacity>
                                </View>                      
                            </View>

                            {/*Importe*/}
                            <View style={styles.tablaimp} >
                                <View style={styles.cuadroimp}>
                                    <TextInput style={styles.inputimp} keyboardType="numeric" placeholder="IMPORTE" value={amounToken} onChangeText={text => setAmounToken(text)} />
                                </View>
                                <View style={styles.cmax}>
                                    <View style={styles.ccnd}>
                                        <Text style={styles.textcnd}>CNDR</Text>
                                    </View>
                                    <View style={styles.cbtnmax}>
                                        <TouchableOpacity style={styles.btnmax} onPress={() => setMax()} activeOpacity={0.5}> 
                                            <Text style={styles.txtmax}>MAX</Text>                        
                                        </TouchableOpacity>
                                    </View>                                
                                </View>                      
                            </View>
                            {/* BotonVolverConfirmar */}
                            <View style={styles.dcVC}>
                                <View style={styles.dcV}>
                                    <TouchableOpacity style={styles.btnVC} activeOpacity={0.5} onPress={() => navigation.navigate('Balance')}>
                                        <Text style={styles.textbtnVC}>VOLVER</Text> 
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.dcC}>
                                    <TouchableOpacity style={styles.btnVC}  activeOpacity={0.5} onPress={() => enviarToken(pubKey,Number(amounToken))}>
                                        <Text style={styles.textbtnVC}>CONFIRMAR</Text> 
                                    </TouchableOpacity>  
                                </View>         
                            </View> 
                        </View>
                    </View>             
                </ImageBackground>  
        </KeyboardAwareScrollView>
    )
}
 

const alturaios = Platform.OS === 'ios' ? '11%' : '2%';
const alturabotones = Platform.OS === 'ios' ? 45 : 50;
const paddinrightios = Platform.OS === 'ios' ? 15 : 12;
const heightlogo = Platform.OS === 'ios' ? 0.287 : 0.272;

const styles = StyleSheet.create({
    body: {
        height: windowHeight,
        width: windowWidth,
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
    cuadroE:{
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'center',
        padding: RFValue(25),
        width: '100%',
    },
    textbtnE:{
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
        paddingHorizontal:RFValue(10),
        paddingVertical:RFValue(50),
        width: "100%",
    },
    tablamail:{
        borderColor: '#e0e0e0',
        borderWidth: 0.8,
        borderRadius:10,
        flexDirection:'row',
        height: windowHeight*0.09,
        paddingLeft:RFValue(10),
        paddingRight:RFValue(10),
    },
    cuadromail:{
        justifyContent: 'center',
        width:"80%",
    },
    inputmail:{
        color: '#5a5959',
        fontWeight: 'bold',
        fontSize:RFPercentage(1.8),
    },
    cqr:{
        width:"20%",
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    btnqr:{
        alignItems:'center',
        backgroundColor:'#5b298a',
        borderRadius: 10,
        paddingBottom: RFValue(10),
        paddingLeft: RFValue(13),
        paddingRight: RFValue(13),
        paddingTop: RFValue(10),   
    },
    imgqr:{
        height: 20,
        resizeMode: 'contain',
        width: 20,
    },
    tablaimp:{
        borderWidth: 0.8,
        borderColor: '#e0e0e0',
        borderRadius:10,
        flexDirection:'row',
        height: windowHeight*0.09,
        marginTop: RFValue(25),
        paddingLeft:RFValue(10),
        paddingRight:RFValue(10),
    },
    cuadroimp:{
        justifyContent: 'center',
        width:"68%",
    },
    inputimp:{
        color: '#5a5959',
        fontSize:RFPercentage(1.8),
        fontWeight: 'bold',  
    },
    cmax:{
        flexDirection:'row',
        width:"32%",  
    },
    ccnd:{ 
        alignItems:'flex-end',
        justifyContent:"center",
        paddingRight:3,
        width:"50%",
    },
    textcnd:{
        fontSize:RFValue(13)
    },
    cbtnmax:{
        width:"50%",
        justifyContent:'center',
    },
    btnmax:{
        alignItems:'center',
        backgroundColor:'#5b298a',
        borderRadius: 10,
        paddingBottom: RFValue(12),
        paddingTop: RFValue(12),
    },
    txtmax:{
        color:'white',
        fontSize:RFPercentage(1.5),
        fontWeight: 'bold',
    },
    dcVC:{
        backgroundColor: 'white',
        borderRadius: 10,
        flexDirection: 'row',
        marginTop:RFValue(alturabotones),
        padding: RFValue(15),  
    },
    dcV:{
        width: "50%",
    },
    dcC:{
        width: "50%",
    },
    btnVC:{
        alignItems:'center',
        backgroundColor:'#5b298a',
        borderRadius: 20,
        elevation: 10,
        paddingBottom: RFValue(12),
        marginLeft: RFValue(15),
        marginRight: RFValue(15),
        paddingTop: RFValue(12),
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    textbtnVC:{
        color:'white',
        fontSize:RFValue(11.5),
        fontWeight: 'bold',
    },
    enviar: {
        alignItems: 'center',
        height: '100%',
        resizeMode: 'contain',
        width: '100%',
    },

    //---Modal---//
    cajamodal:{
        flex: 1,
    },
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
        height: windowHeight*0.1,
        flexDirection: 'row',
        paddingLeft:RFValue(12),
        paddingRight:RFValue(12),
        top:alturaios,
        width: windowWidth*0.95,
    },
    icontext: {
        alignItems: 'center',
    },
    textnoti: {

    },
    contenedorlottie:{
        alignItems: 'center',
        justifyContent: 'center', 
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

    //---aprobadomodal---//
    cajafull:{
        flex: 1,
        alignItems: 'center',
        backgroundColor:"rgba(91, 41, 137, 0.83)",
        justifyContent: 'center',
    },
    
    ventanafull: {
        width: windowWidth*0.95,
        height: windowHeight*0.15,
        // backgroundColor: '#5B298A',
        // borderWidth: 0.5,
        // borderColor: 'white',
        // borderRadius: 20,
        paddingLeft:RFValue(12),
        paddingRight:RFValue(12),
        flexDirection: "column",
        alignItems: 'center',
    },
    icontextfull: {
        alignItems: 'center',
        top:RFValue(-40)
    },
    contenedorlottiefull:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    contenedortextfull: {
        justifyContent: 'center',
    },
    texticonfull: {
        fontSize:RFValue(18),
        fontWeight: "bold",
        color:'white',
        top:RFValue(-60)
    },
    notificacionfull:{
        fontSize:RFValue(12),
        color:'white',
        top:RFValue(-60)
    },

})
export default Importar