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
  FlatList,
  Appearance,
} from "react-native";
import React, { useState, useEffect } from "react";
import { styles } from "../theme/appTheme";
import Icon from "react-native-vector-icons/FontAwesome5";
import { WebView } from "react-native-webview";
import { useTheme } from "react-native-paper";

const altura = Platform.OS === "ios" ? 22 : 25;

const Moneda = ({ navigation, route }: { navigation: any; route: any }) => {
  //Detecta el modo del sistema
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  Appearance.addChangeListener((scheme) => {
    setTheme(scheme.colorScheme);
  });
  const { colors } = useTheme();

  const { msg, mon } = route.params;

  const ima = () => {
    if (msg == "Condorcoin") {
      return (
        <Image
          style={styles.imgmoneda}
          source={require("./img/billeteras/logocondor.png")}
        />
      );
    } else if (msg == "Solana") {
      return (
        <Image
          style={styles.imgmoneda}
          source={require("./img/billeteras/solana.png")}
        />
      );
    } else if (msg == "Tether") {
      return (
        <Image
          style={styles.imgmoneda}
          source={require("./img/billeteras/tether.png")}
        />
      );
    }
  };

  const moneda = () => {
    if (msg == "Condorcoin") {
      return <Text style={styles.cndr}>CNDR</Text>;
    } else if (msg == "Solana") {
      return <Text style={styles.cndr}>SOL</Text>;
    } else if (msg == "Tether") {
      return <Text style={styles.cndr}>TETHER</Text>;
    }
  };

  const [coins, setCoins] = useState();

  const loadData = async () => {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=solana&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h"
    );
    const data = await res.json();
    setCoins(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  // // refresco
  const [refresh, setRefresh] = useState(false);

  const onRefre = () => {
    setRefresh(true);

    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  };

  return (
    <SafeAreaView style={[styles.body, { backgroundColor: colors.background }]}>
      <StatusBar
        backgroundColor={colors.background}
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />
      <View style={[styles.completo, { backgroundColor: colors.background }]}>
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
          <View style={styles.logomoneda}>{ima()}</View>
          <View style={styles.cajamon}>
            <View>
              <Text
                style={[
                  styles.montxt,
                  { textTransform: "uppercase", color: colors.disabled },
                ]}
              >
                {msg}
              </Text>
            </View>
            <View>
              <Text style={[styles.montxt, { color: colors.disabled }]}>
                {mon}
              </Text>
            </View>
          </View>
          <View style={styles.price}>
            <FlatList
              data={coins}
              refreshing={refresh}
              renderItem={({ item }) => {
                return (
                  <Text style={{ color: colors.text }}>
                    {item.current_price}
                  </Text>
                );
              }}
            ></FlatList>
          </View>
          {/* <Text>{coins}</Text> */}
          <View style={styles.cajasf}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <Text
                numberOfLines={1}
                style={[styles.saldofull, { color: colors.text }]}
              >
                0
              </Text>
            </ScrollView>
          </View>
          <View style={styles.dcER}>
            <View style={styles.dcE}>
              <TouchableOpacity
                style={[
                  styles.btnR,
                  styles.sombras,
                  { backgroundColor: colors.text },
                ]}
                activeOpacity={0.5}
                onPress={() =>
                  navigation.navigate("EnviarCantidad", {
                    pmsg: msg,
                    mon: moneda(),
                  })
                }
              >
                <Text style={[styles.textbtnR, { color: colors.background }]}>
                  Enviar
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.dcR}>
              <TouchableOpacity
                style={[
                  styles.btnR,
                  styles.sombras,
                  { backgroundColor: colors.text },
                ]}
                activeOpacity={0.5}
                onPress={() => navigation.navigate("Recibir", { pmsg: msg })}
              >
                <Text style={[styles.textbtnR, { color: colors.background }]}>
                  Recibir
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.graf}>
            <WebView
              source={{
                uri:
                  theme === "light"
                    ? `https://condorcoinco.github.io/charts/${msg}.html`
                    : `https://condorcoinco.github.io/charts/${msg}Dark.html`,
              }}
              style={{ flex: 1 }}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Moneda;
