import * as React from 'react'
import { useState } from 'react'
import { KeyboardAvoidingView,StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Button, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { readKey, generateMnemonic, mnemonicToSeed, createAccount, getBalance, getToken,sendTokenTransaction } from '../../api';


const ImportarCuenta = () => {

    const [twelfString, setTwelfString] = useState('')

    async function crearCuenta(twelf: string) {
        const docePalabras = mnemonicToSeed(twelf)
        docePalabras.then((value) => {
            const acc = createAccount(value)
            acc.then((value) => {
                console.log(value.secretKey.toString())
            })
        })
    }
    
    return (
        <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.body}
            scrollEnabled={false} >
            <View style={styles.containeruno}>
                <Image source={require('./img/logocolor.png')} style={styles.logo} />
            </View>
            <View style={styles.containerBlanco}>
                <Text style={styles.textuno} numberOfLines={2}>IMPORTAR CUENTA</Text>
                <TextInput 
                    style={styles.TextInput}
                    autoFocus={true} multiline={true}
                    onChangeText={text => setTwelfString(text)}
                >
                    <Text style={styles.labeluno} ></Text>
                </TextInput>
                <Text style={styles.labeldos} numberOfLines={4}>Ingrese sus 12 palabras de respaldo</Text>
                <TouchableOpacity
                    style={styles.btnC}
                    onPress={() => crearCuenta(twelfString)}>
                    <Text style={styles.textC}>ACEPTAR</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.textC}
                    onPress={() => readKey()}>
                    <Text style={styles.textoBoton}>Storage</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
    )
}

export default ImportarCuenta

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
    },
    textuno: {
        fontSize:RFPercentage(2.3),
        fontWeight: 'bold',
        color: '#625d5b'
    },
    titulo: {
        fontSize: 25,
        margin: 40
    },
    containerunorama: {
        marginTop: '2%',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    containerdos: {
        marginTop: '10%',
        marginLeft: '2%',
        marginRight: '2%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    TextInput: {
        margin: 10,
        width: 300,
        height: 200,
        borderWidth: 0.8,
        borderColor: 'purple',
        borderRadius: 20,
        padding: 50,
        paddingLeft: 10,
        paddingRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:'5%',
        fontWeight: 'bold',
        fontSize:RFPercentage(2.3),
    },
    botonCont: {
        marginBottom: 20,
        top: 20,
        backgroundColor: '#5B298A',
        width: '80%',
        alignItems: 'center',
        borderRadius: 8
    },
    textoBoton: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        padding: 10,
    },
    checkbox: {
        alignSelf: "center",
    },
    labeluno: {
        margin: 8,
        fontWeight: 'bold',
        textAlign: 'justify'     
    },
    labeldos: {
        margin: 8,
        padding: 10,
        fontSize:RFPercentage(2.3),
        marginRight: '5%',
        marginLeft: '5%',
        textAlign: 'justify',
        color: '#b1b1b1',
    },
    btnC:{
        backgroundColor:'#5b298a',
        paddingTop: '4%',
        paddingBottom: '4%',
        borderRadius: 20,
        marginTop: '5%',
        alignItems: 'center',
    },
    textC:{
        color:'white',
        fontWeight: 'bold',
        fontSize:RFPercentage(2),
        marginLeft: '26%',
        marginRight: '26%',
    },
})
