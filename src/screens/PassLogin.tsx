import React, { Component,useRef, useState } from 'react'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Text, StyleSheet, View, Image, Button, Alert, TextInput, TouchableOpacity } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { readPassword } from '../../api';
//navegación


const CodigoVerificacion = ({navigation}: {navigation: any}) => {
  
        // Referencias para salto input
        const pin1Ref = useRef(null)
        const pin2Ref = useRef(null)
        const pin3Ref = useRef(null)
        const pin4Ref = useRef(null)

        const [pin1, setPin1] = useState("");
        const [pin2, setPin2] = useState("");
        const [pin3, setPin3] = useState("");
        const [pin4, setPin4] = useState("");

        const [storedPass, setStoredPass] = useState("")

        readPassword().then((val)=>{
            console.log("PASSWORD:");
            console.log(val);
            
            setStoredPass(val)
        })

        function validarPassword() {
            const password = pin1+pin2+pin3+pin4
            if (password == storedPass) {
                navigation.navigate('Balance')
            } else {
                // Falta hacer la alerta de que no es 
                console.log("No es la misma")
            }
        }

        return (
        <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.body}
        scrollEnabled={false}>
            <View style={styles.containeruno}>
                {/* logo */}
                <Image source={require('./img/logocolor.png')} style={styles.logo} />
                {/* BordeGris */}
                <View style={styles.containerBlanco}>
                    <Image source={require('./img/logmanito.png')} style={styles.logomano} />
                    {/* Codigo seguridad */}
                    <Text style={styles.textuno} numberOfLines={2}>INGRESA TU CÓDIGO DE SEGURIDAD</Text>
                    <View style={styles.containerunorama}>  
                        <TextInput style={styles.TextInput1} maxLength={1} keyboardType="numeric" autoFocus={true}  secureTextEntry={true} 
                           ref={pin1Ref}
                           onChangeText={text=>{
                               if(!text) pin1Ref.current.focus();
                               else text && pin2Ref.current.focus();
                               setPin1(text);
                               
                           }}
                        />
                        <TextInput style={styles.TextInput1} maxLength={1} keyboardType="numeric" secureTextEntry={true} 
                            ref={pin2Ref}
                            onChangeText={text=>{
                                if(!text) pin2Ref.current.focus();
                                else text && pin3Ref.current.focus();
                                setPin2(text);
                                
                            }}
                        />
                        <TextInput style={styles.TextInput1} maxLength={1} keyboardType="numeric" secureTextEntry={true} 
                            ref={pin3Ref}
                            onChangeText={text=>{
                                if(!text) pin3Ref.current.focus();
                                else text && pin4Ref.current.focus();
                                setPin3(text);
                                
                            }}
                        />
                        <TextInput style={styles.TextInput1} maxLength={1} keyboardType="numeric" secureTextEntry={true} 
                            ref={pin4Ref}
                            onChangeText={text => setPin4(text)}
                        />
                    </View>
                    <View>
                        <TouchableOpacity
                            style={styles.btnC}
                            activeOpacity={0.9}
                            onPress={() => validarPassword()}
                        >
                            <Text style={styles.textCI}>CONFIRMAR</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>            

        </KeyboardAwareScrollView>
        )
    }


export default CodigoVerificacion

const styles = StyleSheet.create({
    body: {
        width: '100%',
        height: '100%',
        flex: 1,
        paddingTop: '8%'
    },
    containeruno: {
        alignItems: 'center',
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
    logo: {
        marginTop: '0%',
        width: 150,
        height: 150,
        resizeMode: 'contain',
        alignItems: 'center',
    },
    logomano: {
        top: '5%',
        alignItems: 'center',
        width: 100,
        height: 100,
        
    },
    textuno: {
        
        marginTop: '20%',
        fontSize:RFPercentage(1.5),
        fontWeight: 'bold',
        color: '#625d5b',
    }, 
    
    containerunorama: {
        flexDirection: 'row',
        //container para los textInput


    },
    TextInput1: {
        marginTop: '10%',
        flexDirection: 'row',
        width: 50,
        height: 50, 
        borderWidth: 1,
        borderColor: 'purple',
        margin: 5,
        paddingLeft: 22,
        borderRadius: 10,
        fontSize:RFPercentage(3),


    },
    btnC:{
        backgroundColor:'#5b298a',
        paddingTop: '4%',
        paddingBottom: '4%',
        borderRadius: 20,
        marginTop: '20%',
        alignItems: 'center',
    },
    textCI:{
        color:'white',
        fontWeight: 'bold',
        fontSize:RFPercentage(2),
        marginLeft: '22%',
        marginRight: '22%',
    },
})
