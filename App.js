import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { AppLoading } from "expo";
import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import ApolloClient from "apollo-boost";
import apolloClientOptions from "./apollo";
import { ApolloProvider } from "react-apollo-hooks";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState(null);

  const preload = async () => {
    try {
      await Font.loadAsync({
        ...Ionicons.font,
      }); //아이콘 가져오는 것.

      await Asset.loadAsync([require("./assets/logo.png")]);
      //이미지 가져오는 것.

      const cache = new InMemoryCache(); //캐시 생성

      await persistCache({
        cache,
        storage: AsyncStorage, //AsyncStorage는 웹에서 localStorage와 유사.
      });
      // persistCache는 memory cache에 있는 cache를 가져옴.

      const client = new ApolloClient({
        cache,
        ...apolloClientOptions,
      });
      //클라이언트 생성

      setLoaded(true);
      setClient(client);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    preload();
  }, []);

  return loaded && client ? (
    <ApolloProvider client={client}>
      <View>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    </ApolloProvider>
  ) : (
    <AppLoading />
  );
}
