import React, {useEffect, useState} from 'react';
import { Text, View } from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import * as Font from "expo-font";
import {Asset} from "expo-asset";
import {AppLoading} from "expo";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const preload = async() => {
    try {
      await Font.loadAsync({
        ...Ionicons.font
      });
      await Asset.loadAsync([require("./assets/logo.png")]);
      setLoaded(true);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    preload();
  },[]);

  return loaded ? (
      <View>
        <Text>Open up App.js to start working on your app!</Text>
      </View> 
      ): (
      <AppLoading />
      );
}

