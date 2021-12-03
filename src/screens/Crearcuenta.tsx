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
            <Image source={require('./img/mountain.png')} style={styles.logo} />
            <Text style={styles.text1} numberOfLines={2}>CREAR CUENTA</Text>
            </View>
            <View style={styles.containerunorama}>
                {/*<TextInput  multiline={true} style={styles.TextInput} >{words}</TextInput>*/}
                <TouchableOpacity style={styles.TextInput}><Text>{words}</Text></TouchableOpacity>
                
            </View>
            <View style={styles.checkboxContainer}>
            {/*<CheckBox
                style={{flex: 1, padding: 10}}
                onClick={()=>{
                    
                    setState({
                        isChecked:!this.state.isChecked
                    })
                }}
                isChecked={this.state.isChecked}
                leftText={"CheckBox"}
            />*/}
                <Text style={styles.label}>Marque esta casilla para confirmar que a copiado sus doce palabras en un lugar seguro.</Text>

            </View>
            <View style={styles.containerdos}>
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
        paddingRight: 10
    },
    botonGen: {
        elevation: 8,
        top: 20,
        marginBottom: 20,
        backgroundColor: '#5B298A',
        width: '80%',
        alignItems: 'center',
        borderRadius: 20
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
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
        justifyContent: 'center',
    },
    checkbox: {
        alignSelf: "center",
    },
    label: {
        margin: 8,
    },
})
