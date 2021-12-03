import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput, Image, Button, Alert } from 'react-native'

const CodigoVerificacion = () => {
    
        return (
        <View style={styles.body}>
            <View style={styles.containeruno}>
            <Image source={require('./img/mountain.png')} style={styles.logo} />
            <Text style={styles.text1} numberOfLines={2}>CREAR CODIGO DE SEGURIDAD</Text>
            <View style={styles.containerunorama}>
                <TextInput style={styles.TextInput} maxLength={1} keyboardType="numeric"></TextInput>
                <TextInput style={styles.TextInput} maxLength={1} keyboardType="numeric"></TextInput>
                <TextInput style={styles.TextInput} maxLength={1} keyboardType="numeric"></TextInput>
                <TextInput style={styles.TextInput} maxLength={1} keyboardType="numeric"></TextInput>
            </View>
            </View>
            <View style={styles.container2}>
            <Text style={styles.text1} numberOfLines={2}>CONFIRMAR CODIGO DE SEGURIDAD</Text>
            <View style={styles.containerunorama}>
                <TextInput style={styles.TextInput} maxLength={1} keyboardType="numeric"></TextInput>
                <TextInput style={styles.TextInput} maxLength={1} keyboardType="numeric"></TextInput>
                <TextInput style={styles.TextInput} maxLength={1} keyboardType="numeric"></TextInput>
                <TextInput style={styles.TextInput} maxLength={1} keyboardType="numeric"></TextInput>
            </View>
            <View style={styles.containerdos}>
            <Button
                title="CONFIRMAR"
                color="#5B298A"
                //AZUL: #26196B
                onPress={() => Alert.alert('Codigo')}/>
            </View>
            </View>
            
        </View>
        )
    }


export default CodigoVerificacion

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
    container2: {
        alignItems: 'center',
        paddingTop: '20%'
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
    containerunorama: {
        marginTop: '10%',
        flexDirection: 'row',
        //container para los textInput
    },
    containerdos: {
        marginTop: '10%',
    },
    TextInput: {
        
        flexDirection: 'row',
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: 'purple',
        margin: 5,
        paddingLeft: 20,
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
})
