import React, { useState, useEffect } from 'react'
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { readMnemonic, createAccount, savePublicKey, mnemonicToSeed } from '../../api';

const PantallaCarga = ({navigation}: {navigation: any}) => {

    const [palabras, setPalabras] = useState("")
    const [twelf, settwelf] = useState("")

    async function leerMnemonic() {
        const mnemonic = readMnemonic()
        mnemonic.then((value) => {
            setPalabras(value)
        })
    }
    //Crear cuenta
    async function crearCuenta(palabras: string) {
        const docePalabras = mnemonicToSeed(palabras)
        docePalabras.then((value) => {
            const acc = createAccount(value)
            acc.then((value) => {
                navigation.navigate('CrearPass')
                savePublicKey(value.publicKey.toString())
                console.log(value.publicKey);
            })
        })
    }

    //Importar
    async function importarCuenta(twelf: string) {
        const docePalabras = mnemonicToSeed(twelf)
        docePalabras.then((value) => {
            const acc = createAccount(value)
            acc.then((value) => {
                navigation.navigate('CrearPass')
                savePublicKey(value.publicKey.toString())
            })
        })
    }

    setTimeout(() => {
        crearCuenta(palabras)
        importarCuenta(twelf)
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
