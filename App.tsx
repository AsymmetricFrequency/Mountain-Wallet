import { Keypair } from '@solana/web3.js';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import "react-native-url-polyfill/auto";


import { generateMnemonic, mnemonicToSeed, createAccount, getBalance, getToken,sendTokenTransaction,saveKey, readKey,getHistory } from './api';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//screens
import Balance from './src/screens/Balance';
import Crearcuenta from './src/screens/Crearcuenta';
import Home from './src/screens/Home';
import ImportarCuenta from './src/screens/Importarcuenta';
import Importar from './src/screens/Importar';
import CodigoVerificacion from './src/screens/CodigoVerificacion'
import Recibir from './src/screens/Recibir';
import Splashc from './src/screens/Splashc';

  

export default function App() { 

  const Stack = createNativeStackNavigator();

  //Funcion de generar 12 palabras
  const [mnemonic, setMnemonic] = useState("")

  function generarMnemonic(){
    const memo = generateMnemonic()
    memo.then((value) => {
      console.log(value)
      setMnemonic(value)
    })
  }

  //Funcion semilla desde 12 palabras
  const [seed, setSeed] = useState("")


  function generarSeed(mnemonic: string) {
    mnemonicToSeed(mnemonic).then((value) => {
      //guardar llave
      setSeed(value)
    })
  }

  //Funcion para crear cuenta
  const [publicKey, setPublicKey] = useState("")
  const [account, setAccount] = useState()

  function generarCuenta(seed) {
    createAccount(seed).then((hexValue) => {
      console.log(hexValue.publicKey.toString())
      setPublicKey(hexValue.publicKey.toString())
      setAccount(hexValue)
      console.log(hexValue)
    })
  }
  
  
  //Funcion obtener balance
  const [balance, setBalance] = useState(0)

  async function obtenerBalance(publicKey: string) {
    getBalance(publicKey).then((value) => {
      console.log(value)
      setBalance(value)
    }).catch((error) => {
      console.log(error);
      return "error"
    })
  }

  //Funcion de obtener splToken
  const [tokenBalance, setTokenBalance] = useState(0)

  async function obtenerTokenB(publicKey:string, mint:string) {
    const bala = getToken(publicKey, mint).then((value) => {
      setTokenBalance(value)
      console.log(value);
    })
  }

  //Funcion enviar token
  async function sendToken(){
    const send = sendTokenTransaction("uja3w9XG1g6DQSVT6YASK99FVmdVwXoHVoQEgtEJdLv","7TMzmUe9NknkeS3Nxcx6esocgyj8WdKyEMny9myDGDYJ",1)
    send.then((value) => {
      console.log(value);
    })
  } 

  //Funcion obtener historial
  const [his,setHis] = useState("")

  async function historial(pubKey:string){
    const send = getHistory(pubKey)
    send.then((value) => {      
      setHis(value[0].signature.toString())
      console.log(value);
    })
  } 


  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
        <Stack.Screen name="ImportarCuenta" component={ImportarCuenta} options={{headerShown: false}}/>
        <Stack.Screen name="Crear" component={Crearcuenta} options={{headerShown: false}}/>
        <Stack.Screen name="Balance" component={Balance} options={{headerShown: false}}/>
        <Stack.Screen name="Codigo" component={CodigoVerificacion} options={{headerShown: false}}/>
        <Stack.Screen name="Recibir" component={Recibir} options={{headerShown: false}}/>
        <Stack.Screen name="Enviar" component={Importar} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
    // <View style={styles.container}>
    //   <Text>{mnemonic}</Text>
    //   <TouchableOpacity
    //     style={styles.boton}
    //     onPress={() => generarMnemonic()}
    //   >
    //     <Text>Generar Mnemonic</Text>
    //   </TouchableOpacity>
    //   <Text>{seed}</Text>
    //   <TouchableOpacity
    //     style={styles.boton}
    //     onPress={() => generarSeed(mnemonic)}
    //   >
    //     <Text>Generar Semilla</Text>
    //   </TouchableOpacity>
    //   <Text>{publicKey}</Text>
    //   <TouchableOpacity
    //     style={styles.boton}
    //     onPress={() => generarCuenta(seed)}
    //   >
    //     <Text>Crear Cuenta</Text>
    //   </TouchableOpacity>
    //   <Text>{balance}</Text>
    //   <TouchableOpacity
    //     style={styles.boton}
    //     onPress={() => obtenerBalance(publicKey)}
    //   >
    //     <Text>Obtener Balance</Text>
    //   </TouchableOpacity>
    //   <Text>{tokenBalance}</Text>
    //   <TouchableOpacity
    //     style={styles.boton}
    //     onPress={() => obtenerTokenB(publicKey, "7TMzmUe9NknkeS3Nxcx6esocgyj8WdKyEMny9myDGDYJ")}
    //   >
    //     <Text>Obtener Balance Token</Text>
    //   </TouchableOpacity>
    //   <Text>{his}</Text>
    //   <TouchableOpacity
    //     style={styles.boton}
    //     onPress={() => historial("uja3w9XG1g6DQSVT6YASK99FVmdVwXoHVoQEgtEJdLv")}
    //   >
    //     <Text>Enviar</Text>
    //   </TouchableOpacity>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 30
  },
  boton: {
    marginTop: 50
  }
});
