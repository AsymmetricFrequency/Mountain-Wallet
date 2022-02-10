import * as solanaWeb3 from '@solana/web3.js';
import { TOKEN_PROGRAM_ID, Token } from "@solana/spl-token";
import { PublicKey, Keypair } from '@solana/web3.js';

import  AsyncStorage  from "@react-native-async-storage/async-storage";

//variables
const SPL_TOKEN = "7TMzmUe9NknkeS3Nxcx6esocgyj8WdKyEMny9myDGDYJ"
const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new solanaWeb3.PublicKey("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL")
const LAMPORTS_PER_SOL = solanaWeb3.LAMPORTS_PER_SOL                                                                     

//Funcion guardar llave
async function saveKey(data){
  try {
    console.log(await AsyncStorage.setItem('@storage_Key', data))  
  } catch (e) { 
       // saving error  
  }
}

//Funcion leer llave
async function readKey(){
  //obteniendo llave
  try {
    const key = await AsyncStorage.getItem('@storage_Key')
    return key 
  } catch (e) { 
       // saving error  
  }
}

//Funcion guardar llave
async function savePublicKey(data){
  try {
    console.log(await AsyncStorage.setItem('@storage_PublicKey', data))  
  } catch (e) { 
       // saving error  
  }
}

//Leer la public key de la cuenta
async function readPublicKey(){
  //obteniendo llave
  try {
    const key = await AsyncStorage.getItem('@storage_PublicKey')
    return key 
  } catch (e) { 
       // saving error  
  }
}


//Funcion guardar llave
async function saveMmemonic(data){
  try {   
    console.log(await AsyncStorage.setItem('@storage_Mnemonic', data))  
  } catch (e) { 
       // saving error  
  }
}

//Funcion leer llave
async function readMnemonic(){
  //obteniendo llave
  try {
    const key = await AsyncStorage.getItem('@storage_Mnemonic')
    return key 
  } catch (e) { 
       // saving error  
  }
}


//Funcion guardar contra
async function savePassword(data){
  try {
    console.log(await AsyncStorage.setItem('@storage_Pass', data))  
  } catch (e) { 
       // saving error  
  }
}

//Funcion guardar contra
async function readPassword(){
  //obteniendo contra
  try {
    const password = await AsyncStorage.getItem('@storage_Pass')
    return password  
  } catch (e) { 
       // saving error  
  }
}

////////////////////////////////////////////////////////////
//  Funciones de Solana-web3 para la creacion de cuentas  //
////  obtener el balance y transferir SOL y SPL Tokens  ////
////////////////////////////////////////////////////////////


//generar mnemonic
async function generateMnemonic() {
  fetch("https://apiwalletnode.herokuapp.com/mnemonic").then(
      res => res.text()
  ).then(
    data =>{
      //guardando mnemonic en asyncStorage
      saveMmemonic(data) 
      return data
        }   
    )
}

//Crear cuenta (public key)
async function createAccount(mnemonic: string) {
  fetch(`https://apiwalletnode.herokuapp.com/keypair_public_key/${mnemonic}`).then(
      res => res.text()
  ).then(
    data =>{
      savePublicKey(data)
      return data
      }   
    )
}

async function fetchSecret(mnemonic: string) {
  fetch(`https://apiwalletnode.herokuapp.com/keypair_secret_key/${mnemonic}`).then(
      res => res.text()
  ).then(
    data =>{
      saveKey(data)
      return data
      }   
    )
}

//crear conexion
function createConnection(cluster:string) {
  return new solanaWeb3.Connection(solanaWeb3.clusterApiUrl(cluster))
}

//obtener balance de Solanas
async function getBalance(publicKey: string) {
  const connection = createConnection("devnet")
  const lamports = await connection.getBalance(new solanaWeb3.PublicKey(publicKey)).catch((err) => {
    console.log(err);
  })

  const sol = lamports / LAMPORTS_PER_SOL
  return sol
} 

//buscar cuentas asociadas a tokens
async function findAssociatedTokenAddress(
    walletAddress: PublicKey,
    tokenMintAddress: PublicKey
  ): Promise<PublicKey> {
    return (
      await solanaWeb3.PublicKey.findProgramAddress(
        [
          walletAddress.toBuffer(),
          TOKEN_PROGRAM_ID.toBuffer(),
          tokenMintAddress.toBuffer(),
        ],
        SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
      )
    )[0];
  }

//obtener balance del token
async function getToken(publicKey: string, splToken: string){
    const connection = createConnection("devnet")
    const account = await findAssociatedTokenAddress(new PublicKey(publicKey), new PublicKey(splToken))

  try {
    const balance = await connection.getTokenAccountBalance(new PublicKey(account.toString()))
    return balance.value.uiAmount
  } catch (e) {
    return 0
  }

}

async function enviarTrans(fromWallet,toPublic,amount){
  const connection = createConnection("devnet")
  const myMint = new solanaWeb3.PublicKey("7TMzmUe9NknkeS3Nxcx6esocgyj8WdKyEMny9myDGDYJ")

  try {
    var myToken = new Token(
      connection,
      myMint,
      TOKEN_PROGRAM_ID,
      fromWallet
    )
            
    var fromTokenAccount = await myToken.getOrCreateAssociatedAccountInfo(
      fromWallet.publicKey
    )
    var toTokenAccount = await myToken.getOrCreateAssociatedAccountInfo(
      new solanaWeb3.PublicKey(toPublic)
    )
  
    var transaction = new solanaWeb3.Transaction()
    .add(
      Token.createTransferInstruction(
        TOKEN_PROGRAM_ID,
        fromTokenAccount.address,
        toTokenAccount.address,
        fromWallet.publicKey,
        [],
        amount * LAMPORTS_PER_SOL
      )
    )

    var signature = await solanaWeb3.sendAndConfirmTransaction(
      connection,
      transaction,
      [fromWallet]
    ).catch((err) => {
      console.log(err)
    })
    return "signature"
    } catch (error) {
      return error
  }
}

// funcion para obtener el historial de transacciones
async function getHistory(pubKey:string,options = { limit: 20 }){

  const connection = createConnection("mainnet-beta");
  const history = await connection.getConfirmedSignaturesForAddress2(
  new PublicKey(pubKey),
  options
  );

  console.log(history);
  
  return history;

}


export { 
  savePublicKey,
  readPublicKey,
  generateMnemonic,
  createAccount,
  getBalance,
  getToken,
  saveKey,
  readKey,
  getHistory,
  saveMmemonic,
  readMnemonic,
  savePassword, 
  readPassword,
  enviarTrans,
  fetchSecret 
}
