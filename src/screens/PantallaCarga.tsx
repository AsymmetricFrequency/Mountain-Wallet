import React, { useState, useEffect } from 'react'
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { readMnemonic, createAccount, savePublicKey, mnemonicToSeed } from '../../api';

const PantallaCarga = ({navigation}: {navigation: any}) => {

    const [palabras, setPalabras] = useState("")

    async function leerMnemonic() {
        const mnemonic = readMnemonic()
        mnemonic.then((value) => {
            setPalabras(value)
        })
    }

    leerMnemonic()

    //Crear cuenta
    async function crearCuenta(palabras: string) {
        const docePalabras = mnemonicToSeed(palabras)
        docePalabras.then((value) => {
            const acc = createAccount(value)
            acc.then((value) => {
                savePublicKey(value.publicKey.toString())
                navigation.navigate('CrearPass')
            })
        })
    }

    setTimeout(() => {
        crearCuenta(palabras)
    }, 2000);

    return (
        <View style={styles.body}>
            
            <Text style={styles.textocarga} >Cargando cuenta...</Text>
            <ActivityIndicator size="large" color="#5b298a" />
        </View>
    )
}

export default PantallaCarga

const styles = StyleSheet.create({
    body: {
        width: '100%',
        height: '100%',
        flex: 1,
        paddingTop: '8%',
        alignItems:'center',
        justifyContent:'center'
    },
    textocarga: {
        fontWeight:'bold'
    }
})
