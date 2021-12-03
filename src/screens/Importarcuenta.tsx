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
            <Image source={require('./img/mountain.png')} style={styles.logo} />
            <Text style={styles.text1} numberOfLines={2}>IMPORTAR CUENTA</Text>
            </View>
            <View style={styles.containerunorama}>
                {/*<TextInput  multiline={true} style={styles.TextInput} >{words}</TextInput>*/}
                <TextInput style={styles.TextInput} keyboardType="default"></TextInput>
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
        paddingLeft: '5%',
        paddingRight: '5%',
        paddingTop: '8%'
    },
    containeruno: {
        alignItems: 'center',

    },
    logo: {
        marginTop: '25%',
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },
    text1: {
        fontFamily: 'Roboto',
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
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    TextInput: {
        fontSize: 20,
        margin: 10,
        width: 300,
        height: 200,
        borderWidth: 1,
        borderColor: 'purple',
        borderRadius: 20,
        padding: 50,
        paddingLeft: 10,
        paddingRight: 10,
    },
    botonCont: {
        elevation: 8,
        top: 20,
        backgroundColor: '#5B298A',
        width: '80%',
        alignItems: 'center',
        borderRadius: 20
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
        color: '#9c9897'
    },
})
