import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Clipboard, Platform, Dimensions, Modal} from 'react-native';
import { Camera } from 'expo-camera';
import {BarCodeScanner} from "expo-barcode-scanner"
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import * as Animatable from 'react-native-animatable';
import { Lotierror,Lotiexito,Lotieqr } from './component/lottie';


const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const QrReader = ({navigation}: {navigation: any}) =>  {

    if(Platform.OS === 'ios' ){
        const [hasPermission,setHasPermission] = useState(null)
    const [scanned,setScanned] = useState(false)
    const [text,setText] = useState('')

    //preguntando el permiso para camara
    const askForCameraPermission = () =>{

        (async () =>{

            const {status} = await BarCodeScanner.requestPermissionsAsync()
            setHasPermission(status == 'granted')

        })()

    }


    useEffect(()=>{

        askForCameraPermission()

    },[])
    //Constantes modales
    const [anmt,setanmt]= useState("");
    const [aprobado,setaprobado] = useState(false);
    const [MostrarError, setError] = useState("");
    const [lottie, setLottie] = useState(<Lotierror/>);
    const [mostrartitulo, setmostrartitulo] = useState("");
 

    //Handleo del escaneado
    const handleBarCodeScanned = ({type,data}) =>{
       
        setScanned(true)
        
        setText(data)
        
        Clipboard.setString(data)

        //aqui va el envio de los props
        // navigation.navigate('Enviar')
          
        // alert("Este mensaje fue correcto")
        setmostrartitulo("QR Scaneado");
        setError("Llave pública copiada en el portapapeles:");
        setaprobado(true);
        setLottie(<Lotieqr/>)
        setanmt("fadeInDownBig");
        // setTimeout( () => {
        //     setanmt("fadeOutUp");
        //     setTimeout( () => {
        //         setaprobado(false);
        //     }, 100 )                                        
        // },3000) 
    }
    
    //si el permiso es nulo
    if(hasPermission === null){

        return(
            <Text>Permiso nulo</Text>
        )

    }

    //si el permiso es falso
    if(hasPermission === false){

        return(
            <View style={styles.containeruno}>
                <View style={styles.barcodebox}>
                    
                </View>
            </View>
        )

    }

    //boton volver
    function regresar () {
        setScanned(false);
        navigation.navigate('Enviar')
    }
    
    //si el permiso es verdadero
    if(hasPermission === true){

        

        return(
            <View style={styles.containeruno}>
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
                            <View style={styles.bodyfull}>
                                <View style={styles.ventanafull}>
                                    <View style={styles.contenedortextfull}>
                                        <Text style={styles.texticonfull}>{mostrartitulo}</Text>
                                    </View>
                                    <View style={styles.icontextfull}>
                                        <View style={styles.contenedorlottiefull}>
                                            {/* {lottie} */}
                                        </View>
                                    </View>   
                                    
                                    <View>
                                        <Text style={styles.notificacionfull}>
                                            {MostrarError}
                                        </Text>
                                    </View>

                                    <Text style={styles.copiadotxt}>{text}</Text>

                                    <View style={styles.dcVC}>
                                        <View style={styles.dcV}>
                                            <TouchableOpacity style={styles.btnVC} activeOpacity={0.9} onPress={() =>[setScanned(false),setaprobado(false)]}>
                                                <Text style={styles.textbtnVC}>REESCANEAR</Text> 
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.dcC}>
                                            <TouchableOpacity style={styles.btnVC}  activeOpacity={0.9} onPress={() => regresar()}>
                                                <Text style={styles.textbtnVC}>CONFIRMAR</Text> 
                                            </TouchableOpacity>  
                                        </View>         
                                    </View> 
                                </View>
                            </View>
                        </Animatable.View>
                    </View>         
                </Modal>
       

                <BarCodeScanner onBarCodeScanned={scanned ? undefined: handleBarCodeScanned} style={[StyleSheet.absoluteFillObject, styles.colorqr]} >
                    <View style={styles.tituloqr}>
                        <Text style={styles.textqr}>ESCANEAR CÓDIGO QR</Text> 
                    </View>   
                    <View style={styles.barcodebox}>

                    </View>
                    <View style={styles.cajavolver}>
                        <TouchableOpacity style={styles.btnvolver}  activeOpacity={0.9} onPress={() => regresar()}>
                                <Text style={styles.txtvolver}>VOLVER</Text> 
                        </TouchableOpacity>       
                    </View> 
                    
                </BarCodeScanner>
                
              
               
            </View>
        )

    }
   
    return(
        <Text>Permiso nulo</Text>
    )

    }else if(Platform.OS === 'android'){
        const [hasPermission, setHasPermission] = useState(null);
        const [type, setType] = useState(Camera.Constants.Type.back);

        useEffect(() => {
            (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
            })();
        }, []);

        if (hasPermission === null) {
            return <View />;
        }
        if (hasPermission === false) {
            return <Text>No access to camera</Text>;
        }
        return(
        <View style={styles.container}>
            <Camera
                onBarCodeScanned={(...args) => {
                const data = args[0].data;
                const result = JSON.stringify(data);
                Clipboard.setString(data)
                navigation.navigate('Enviar',data);
                }}
                barCodeScannerSettings={{
                barCodeTypes: ['qr'],
                }}
                style={{ flex: 1 }}
            />
            </View>
        );   
    }

}
  
const styles = StyleSheet.create({
    body: {
       
    },
    containeruno:{
        paddingTop: '8%',
        paddingLeft: '5%',
        paddingRight: '4%',
        height:'100%',
        justifyContent: 'center',
        alignItems: 'center',

    },
    tituloqr:{
        position: 'absolute',
        alignItems: 'center',
        top:80,
        backgroundColor: 'rgba(29, 29, 27, 0.45)',
        padding: RFValue(20),
        borderRadius:15
    },
    textqr: {
        color:"white",
    },
    colorqr:{
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: '5%',
        paddingRight: '4%',

    },
    barcodebox:{
        alignItems: 'center',
        height: 280,
        width: 280,
        borderRadius:15,
        borderWidth: 5,
        borderColor: 'rgba(255, 255, 255, 0.45)',
        
    },
    cajavolver:{
        position: 'absolute',
        bottom:60,
        alignItems: 'center',
    },
    btnvolver:{
        backgroundColor:'white',
        alignItems:'center',
        paddingHorizontal: RFValue(50),
        paddingVertical: RFValue(15),
        borderRadius: 20,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.1,
        shadowRadius: 5,

    },
    txtvolver:{
        color:'#5b298a',
        fontWeight: 'bold',
        fontSize:RFValue(12),
    },

    

    // aprobadomodal
    cajafull:{
        flex: 1,
        backgroundColor:"rgba(91, 41, 137, 1)",
        justifyContent: 'center',
        alignItems: 'center',
    },
    bodyfull: {

    },
    ventanafull: {
        width: windowWidth*0.95,
        height: windowHeight*0.15,
        paddingLeft:RFValue(12),
        paddingRight:RFValue(12),
        flexDirection: "column",
        alignItems: 'center',
    },
    icontextfull: {
        alignItems: 'center',
        top:RFValue(-150)
    },
    contenedorlottiefull:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    contenedortextfull: {
        justifyContent: 'center',
    },
    texticonfull: {
        fontSize:RFValue(25),
        fontWeight: "bold",
        color:'white',
        top:RFValue(-180)
    },
    notificacionfull:{
        fontSize:RFValue(16),
        color:'white',
        top:RFValue(-80)
    },
    copiadotxt: {
        color:'#b9b8b8',
        top:RFValue(-70),
        fontSize:RFValue(16)
    },


    dcVC:{
        flexDirection: 'row',
        padding: RFValue(15),
        borderRadius: 10,
        top:RFValue(-50)
        
    },
    dcV:{
        width: RFValue(143),
    },
    dcC:{
        width: RFValue(143),
    },
    btnVC:{
        backgroundColor:'white',
        alignItems:'center',
        marginRight: RFValue(15),
        marginLeft: RFValue(15),
        paddingTop: RFValue(12),
        paddingBottom: RFValue(12),
        borderRadius: 20,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.1,
        shadowRadius: 5,

    },
    textbtnVC:{
        color:'#5b298a',
        fontWeight: 'bold',
        fontSize:RFValue(11.5),
    },

    container: {
        flex: 1,
      },
      camera: {
        flex: 1,
      },
      buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
      },
      button: {
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center',
      },
      text: {
        fontSize: 18,
        color: 'white',
      },

})

export default QrReader;
