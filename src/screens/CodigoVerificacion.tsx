import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput, Image, Button, Alert, TouchableOpacity } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { generateMnemonic, mnemonicToSeed, createAccount, getBalance, getToken,sendTokenTransaction } from '../../api';

const CodigoVerificacion = () => {
    
        return (
        <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.body}
        scrollEnabled={false}>
            <View style={styles.containeruno}>
                <Image source={require('./img/logocolor.png')} style={styles.logo} />
            
            <View style={styles.containerBlanco}>
            </View>
            <View style={styles.containerBlanco2}>
                <Image source={require('./img/logomanito.png')} style={styles.logomano} />
                <Text style={styles.textuno} numberOfLines={2}>Crear código de seguridad</Text>
                <View style={styles.containerunorama}>  
                    <TextInput style={styles.TextInput} maxLength={1} keyboardType="numeric"></TextInput>
                    <TextInput style={styles.TextInput} maxLength={1} keyboardType="numeric"></TextInput>
                    <TextInput style={styles.TextInput} maxLength={1} keyboardType="numeric"></TextInput>
                    <TextInput style={styles.TextInput} maxLength={1} keyboardType="numeric"></TextInput>
                </View>
                    <Text style={styles.textdos} numberOfLines={2}>Confirmar código de seguridad</Text>
                <View style={styles.containerunorama}>
                    <TextInput style={styles.TextInput2} maxLength={1} keyboardType="numeric"></TextInput>
                    <TextInput style={styles.TextInput2} maxLength={1} keyboardType="numeric"></TextInput>
                    <TextInput style={styles.TextInput2} maxLength={1} keyboardType="numeric"></TextInput>
                    <TextInput style={styles.TextInput2} maxLength={1} keyboardType="numeric"></TextInput>
                </View>
            </View>
            <View style={styles.containerdos}>
            <TouchableOpacity
                style={styles.botonCont}
                onPress={() => Alert.alert('Codigo...')}>
                <Text style={styles.textoBoton}>CONFIRMAR</Text>
            </TouchableOpacity>
            
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
    container2: {
        alignItems: 'center',
        paddingTop: '30%',
        backgroundColor: 'white'
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
        paddingTop: '40%',
    },
    containerBlanco2: {
        width: '100%',
        marginTop: '-40%',
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
    logomano: {
        top: '0%',
        alignItems: 'center',
        width: 100,
        height: 100,
        
    },
    textuno: {
        top: '10%',
        fontSize: 15,
        fontWeight: 'bold',
        color: '#625d5b'
    },
    textdos: {
        top: '30%',
        fontSize: 15,
        fontWeight: 'bold',
        color: '#625d5b'
    },
    containerunorama: {
        marginTop: '0%',
        flexDirection: 'row',
        //container para los textInput
    },
    containerdos: {
        marginTop: '25%',
    },
    TextInput: {
        top: '70%',
        flexDirection: 'row',
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: 'purple',
        margin: 5,
        paddingLeft: 20,
        borderRadius: 10
        
    },
    TextInput2: {
        top: '155%',
        flexDirection: 'row',
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: 'purple',
        margin: 5,
        paddingLeft: 20,
        borderRadius: 10
    },
    ButtonContainer: {
        elevation: 8,
        backgroundColor: '#5B298A',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 60,
    },
    ButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
      },
    botonCont: {
        top: '100%',
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
})
