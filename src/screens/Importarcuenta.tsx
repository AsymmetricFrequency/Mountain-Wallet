import * as React from 'react'
import { useState } from 'react'
import { KeyboardAvoidingView,StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Button, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { generateMnemonic, mnemonicToSeed, createAccount, getBalance, getToken,sendTokenTransaction } from '../../api';



const ImportarCuenta = () => {
    return (
        <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.body}
            scrollEnabled={false} >
            <View style={styles.containeruno}>
                <Image source={require('./img/logocolor.png')} style={styles.logo} />
            </View>
            <View style={styles.containerBlanco}>
            </View>
            <View style={styles.containerBlanco2}>
                <Text style={styles.textuno} numberOfLines={2}>IMPORTAR CUENTA</Text>
                <TextInput 
                    style={styles.TextInput}>
                    <Text style={styles.labeluno} ></Text>
                </TextInput>
            </View>
            <View style={styles.label}>
                <Text style={styles.doce}>Ingrese sus 12 (doce) palabras de respaldo.</Text>
            </View>
            <View style={styles.containerdos}>
                <TouchableOpacity
                    style={styles.botonCont}
                    onPress={() => Alert.alert('Acepto')}>
                    <Text style={styles.textoBoton}>ACEPTAR</Text>
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
        width: '100%',
        marginTop: 10,
        alignItems: 'center',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        borderWidth: 5,
        borderColor: '#b5b2b6',
        borderStyle: 'solid',
        paddingTop: '35%',
    },
    containerBlanco2: {
        width: '100%',
        color: 'red',
        marginTop: '-36%',
        borderTopLeftRadius:28,
        borderTopRightRadius: 28,
        alignItems: 'center',
        backgroundColor: 'white',
        paddingLeft: '10%',
        paddingRight: '10%',
        paddingTop: '10%',
    },
    logo: {
        marginTop: '0%',
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },
    textuno: {
        fontSize: 15,
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
        fontSize: 20,
        margin: 10,
        width: 300,
        height: 200,
        borderWidth: 2,
        borderColor: 'purple',
        borderRadius: 20,
        padding: 50,
        paddingLeft: 10,
        paddingRight: 10,
        
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
    label: {
        flexDirection: "row",
        marginBottom: 20,
        justifyContent: 'center',

    },
    checkbox: {
        alignSelf: "center",
    },
    doce: {
        margin: 8,
        padding: 10,
        fontWeight: 'bold',
        fontSize: 12,
        justifyContent: 'center',
        textAlign: 'justify',
        color: '#9c9897',
    },
        
    labeluno: {
        margin: 8,
        fontWeight: 'bold',
        fontSize: 17,
        
    },
})
