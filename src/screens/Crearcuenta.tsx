import * as React from 'react'
import { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Button, Alert, Clipboard } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
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

    const CopyToClipboard = () => {
        Clipboard.setString(words) 
        Alert.alert('Texto Copiado')     
    };

    return (
        <View style={styles.body}>
            <View style={styles.containeruno}>
                <Image source={require('./img/logocolor.png')} style={styles.logo} />
            </View>
            <View style={styles.containerBlanco}>
                <Text style={styles.textuno} numberOfLines={2}>CREAR CUENTA</Text>
                
                <TouchableOpacity style={styles.TextInput} onPress={() => CopyToClipboard()}>
                    <View>
                        <Text style={styles.labeluno}>{words}</Text>
                    </View>
                </TouchableOpacity>

                <Text style={styles.labeldos} numberOfLines={4}>Oprima en "Generar 12 palabras" y copie las palabras que se generan en el recuadro, son de gran importancia para la seguridad de su cuenta.</Text>
                <TouchableOpacity
                    style={styles.btnG}
                    onPress={() => generarMnemonic()} activeOpacity={0.9}>
                    <Text style={styles.textG}>GENERAR 12 PALABRAS</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                    style={styles.btnC}
                    activeOpacity={0.9}>
                    <Text style={styles.textC}>CONTINUAR</Text>
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
    logo: {
        marginTop: '0%',
        width: 150,
        height: 150,
        resizeMode: 'contain',
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
    textuno: {
        fontSize:RFPercentage(2.3),
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
        marginTop:'5%'
    },
    botonGen: {
        top: 25,
        marginBottom: 20,
        backgroundColor: '#5B298A',
        width: '83%',
        alignItems: 'center',
        borderRadius: 20
    },
    labeluno: {
        margin: 8,
        fontWeight: 'bold',
        fontSize:RFPercentage(2.3),
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
    btnG:{
        backgroundColor:'#5b298a',
        paddingTop: '4%',
        paddingBottom: '4%',
        borderRadius: 20,
        marginTop: '5%',
        alignItems: 'center',
    },
    btnC:{
        backgroundColor:'#5b298a',
        paddingTop: '4%',
        paddingBottom: '4%',
        borderRadius: 20,
        marginTop: '5%',
        alignItems: 'center',
    },
    textG:{
        color:'white',
        fontWeight: 'bold',
        fontSize:RFPercentage(2),
        marginLeft: '15%',
        marginRight: '15%',
    },
    textC:{
        color:'white',
        fontWeight: 'bold',
        fontSize:RFPercentage(2),
        marginLeft: '24%',
        marginRight: '24%',
    },
})
