import * as React from 'react'
import { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Button, Alert } from 'react-native';

import { generateMnemonic, mnemonicToSeed, createAccount, getBalance, getToken,sendTokenTransaction } from '../../api';

const Crearcuenta = () => {

    const [isSelected, setSelection] = useState(false);

    const [words, setWords] = useState('')

    function generarMnemonic(){
        const memo = generateMnemonic()
        memo.then((value) => {
          console.log(value);
          setWords(value)
        })
      }


    return (
        <View style={styles.body}>
            <View style={styles.containeruno}>
                <Image source={require('./img/logocolor.png')} style={styles.logo} />
            </View>
            <View style={styles.containerBlanco}>
            </View>

            <View style={styles.containerBlanco2}>
                <Text style={styles.textuno} numberOfLines={2}>CREAR CUENTA</Text>
                <TouchableOpacity style={styles.TextInput}><Text style={styles.labeluno}>{words}</Text></TouchableOpacity>
            </View>
            <View style={styles.containerdos}>
                <Text style={styles.labeldos} numberOfLines={4}>Oprima en "Generar 12 palabras" y copie las palabras que se generan en el recuadro, son de gran importancia para la seguridad de su cuenta.</Text>
                <TouchableOpacity
                    style={styles.botonGen}
                    onPress={() => generarMnemonic()}>
                    <Text style={styles.textoBoton}>GENERAR 12 PALABRAS</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.botonCont}
                    onPress={() => Alert.alert('Continua proceso...')}>
                    <Text style={styles.textoBoton}>CONTINUAR</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Crearcuenta

const styles = StyleSheet.create({
    body: {
        width: '100%',
        height: '100%',
        flex: 1,
        paddingTop: '8%'
    },
    containeruno: {
        alignItems: 'center'
    },
    containerBlanco: {
        width: '100%',
        color: 'red',
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
        paddingLeft: '5%',
        paddingRight: '5%',
        paddingTop: '10%',

    },
    // containeruno: {
    //     alignItems: 'center',
    //     borderTopLeftRadius: 20,
    //     borderTopRightRadius: 20,
    //     borderWidth: 0.8,
    //     borderColor: 'green',

    // },
    logo: {
        marginTop: '0%',
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },
    textuno: {
        
        fontSize: 15,
        fontWeight: 'bold',
        color: '#616161'
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
        marginTop: '5%',
        marginLeft: '5%',
        marginRight: '5%',
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
        paddingRight: 10
    },
    botonGen: {
        top: 25,
        marginBottom: 20,
        backgroundColor: '#5B298A',
        width: '83%',
        alignItems: 'center',
        borderRadius: 20
    },
    botonCont: {
        top: 25,
        backgroundColor: '#5B298A',
        width: '83%',
        alignItems: 'center',
        borderRadius: 20
    },
    textoBoton: {
        fontSize: 10,
        color: 'white',
        textAlign: 'center',
        padding: 10,
    },

    labeluno: {
        margin: 8,
        fontWeight: 'bold',
        fontSize: 17,
        
    },
    labeldos: {
        margin: 8,
        padding: 10,
        fontWeight: 'bold',
        fontSize: 12,
        marginRight: '5%',
        marginLeft: '5%',
        justifyContent: 'center',
        textAlign: 'justify'
    },
})
