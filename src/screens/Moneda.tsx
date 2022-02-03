import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Image,
  StatusBar,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";
import { styles } from "../theme/appTheme";
import Icon from "react-native-vector-icons/FontAwesome5";
import { WebView } from 'react-native-webview';

const altura = Platform.OS === "ios" ? 22 : 25;

const Moneda = ({ navigation, route }: { navigation: any, route: any }) => {

  const { msg,mon } = route.params;
  

  const ima = () =>{
    if (msg == "Condorcoin") {
        return(
          <Image
            style={styles.imgmoneda}
            source={require("./img/billeteras/logocondor.png")}
          />
        )
    }else if (msg == "Solana"){
      return(
        <Image
          style={styles.imgmoneda}
          source={require("./img/billeteras/solana.png")}
        />
      )
    }else if(msg == "Tether"){
      return(
        <Image
          style={styles.imgmoneda}
          source={require("./img/billeteras/tether.png")}
        />
      )
    }
  };

    // // refresco
    const [refresh, setRefresh] = useState(false);

    const onRefre = () => {
      setRefresh(true);
  
      setTimeout(() => {
        setRefresh(false);
      }, 1000);
    };
  

  return (
    <SafeAreaView style={styles.body}>
      <StatusBar backgroundColor="#FBF7FF" barStyle={"dark-content"} />
      <View style={styles.completo}>
        <View style={styles.cajaatras}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.btndo}
            onPress={() => navigation.navigate("Barra")}
          >
            <Icon name="arrow-left" size={altura} color="#440577" />
          </TouchableOpacity>
        </View>
        <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refresh}
                onRefresh={onRefre}
                tintColor="#5b298a"
                colors={["#5b298a", "#7e54a7"]}
              />
            }
            horizontal={false}
            showsVerticalScrollIndicator={false}
        >
        <View style={styles.logomoneda}>
          {ima()}
        </View>
        <View style={styles.cajamon}>
          <View>
            <Text style={[styles.montxt,{textTransform: 'uppercase'}]}>{(msg)}</Text>
          </View>
          <View>
            <Text style={styles.montxt}>{(mon)}</Text>
          </View>
        </View>
        
        <View style={styles.cajasf}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <Text numberOfLines={1} style={styles.saldofull}>0</Text>
          </ScrollView>
        </View>
        <View style={styles.dcER}>
            <View style={styles.dcE}>
            <TouchableOpacity
              style={[styles.btnR,styles.sombras]}
              activeOpacity={0.5}
              // onPress={() => navigation.navigate("Enviar")}
            >
              <Text style={styles.textbtnR}>Enviar</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.dcR}>
            <TouchableOpacity
              style={[styles.btnR,styles.sombras]}
              activeOpacity={0.5}
              onPress={() => navigation.navigate("Recibir",{pmsg:msg})}
            >
              <Text style={styles.textbtnR}>Recibir</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.graf}>
          <WebView
            source={{ uri: `https://condorcoinco.github.io/charts/${msg}.html` }}
            style={{flex:1, backgroundColor: '#FBF7FF'}}
          />
        </View>
        </ScrollView>
        
      </View>
    </SafeAreaView>
  );
};

export default Moneda;
