
import React, { useState, useEffect } from 'react'
import { ImageBackground,StyleSheet, Text, View,TouchableOpacity, Image,Button , Alert, TextInput, BackHandler} from 'react-native'
import {BarCodeScanner} from "expo-barcode-scanner"
import { NavigationRouteContext } from '@react-navigation/native'


const QrReader = ({navigation}: {navigation: any}) => {


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

 

    //Handleo del escaneado
    const handleBarCodeScanned = ({type,data}) =>{
       
        setScanned(true)
        
        setText(data)
        
        console.log('Type: '+type+'\nData'+data);

        //aqui va el envio de los props
        navigation.navigate('Enviar', {qrRead:text})
          
        
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
    
    //si el permiso es verdadero
    if(hasPermission === true){

        return(
            <View style={styles.containeruno}>
                <View style={styles.barcodebox}> 
                    <BarCodeScanner onBarCodeScanned={scanned ? undefined: handleBarCodeScanned} style={{height:1000,width:1000}} ></BarCodeScanner>
                </View>
                <Text>{text}</Text>
                {scanned && <Button title='scan' onPress={()=>setScanned(false)} ></Button>}
            </View>
        )

    }
   
    return(
        <Text>Permiso nulo</Text>
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
        height:'100%',
        justifyContent:'center'
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
    cuadroD:{
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        marginTop: '5%',
        width: '100%'
    },
    btnD:{
        backgroundColor:'transparent',
        alignItems:'center',
        paddingTop: '3%',
        paddingBottom: '3%',
        borderRadius: 20,
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
    tablamail:{
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
    cuadromail:{
        width:'80%',
        justifyContent: 'center',
        paddingLeft: '2%'
    },
    cqr:{
        width:'20%',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    btnqr:{
        backgroundColor:'#5b298a',
        alignItems:'center',
        paddingTop: '12%',
        paddingBottom: '12%',
        paddingLeft: '23%',
        paddingRight: '23%',
        borderRadius: 10,
    },
    imgqr:{
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
    tablaimp:{
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
    cuadroimp:{
        width:'70%',
        justifyContent: 'center',
        paddingLeft: '2%'
    },
    cmax:{
        width:'30%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'row',
    },
    ccnd:{
        width:'50%',
    },
    cbtnmax:{
        width:'50%',
    },
    btnmax:{
        backgroundColor:'#5b298a',
        alignItems:'center',
        paddingTop: '20%',
        paddingBottom: '20%',
        paddingLeft: '10%',
        paddingRight:'10%',
        borderRadius: 10,
    },
   
    btnC:{
        backgroundColor:'#5b298a',
        alignItems:'center',
        marginRight: '10%',
        marginLeft: '10%',
        paddingTop: '4%',
        paddingBottom: '4%',
        borderRadius: 20,
        marginTop: '20%'
    },barcodebox:{
        backgroundColor:'#fff',
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
        width: 300,
        overflow: 'hidden',
        borderRadius: 30,
    }
})
export default QrReader