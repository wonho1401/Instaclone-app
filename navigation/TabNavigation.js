import React from "react";
import { View, Image } from "react-native";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Home from "../screens/Tabs/Home";
import Notifications from "../screens/Tabs/Notifications";
import Profile from "../screens/Tabs/Profile";
import Search from "../screens/Tabs/Search/SearchContainer";
import { createStackNavigator } from "react-navigation-stack";
import MessagesLink from "../components/MessagesLink";
import NavIcon from "../components/NavIcon";

const stackFactory = (initialRoute, customConfig) =>
  createStackNavigator({
    InitialRoute: {
      screen: initialRoute,
      navigationOptions: {
        ...customConfig,
      },
    },
  });

export default createBottomTabNavigator(
  {
    Home: {
      screen: stackFactory(Home, {
        headerRight: () => <MessagesLink />,
        headerTitle: (
          <Image
            style={{ height: 40 }}
            resizeMode="contain"
            source={require("../assets/logo.png")}
          />
        ),
      }),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <NavIcon focused={focused} name={"ios-home"} />
        ),
      },
    },
    Search: {
      screen: stackFactory(Search),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <NavIcon focused={focused} name={"ios-search"} />
        ),
      },
    },
    Add: {
      screen: View,
      navigationOptions: {
        tabBarOnPress: ({ navigation }) =>
          navigation.navigate("PhotoNavigation"),
        tabBarIcon: ({ focused }) => (
          <NavIcon focused={focused} name={"ios-add-circle-outline"} />
        ),
      },
    },
    Notifications: {
      screen: stackFactory(Notifications, {
        title: "Notifications",
      }),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <NavIcon
            focused={focused}
            name={focused ? "ios-heart" : "ios-heart-empty"}
          />
        ),
      },
    },
    Profile: {
      screen: stackFactory(Profile, {
        title: "Profile",
      }),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <NavIcon focused={focused} name={"ios-contact"} size={30} />
        ),
      },
    },
  },
  {
    initialRouteName: "Search",
    tabBarOptions: {
      showLabel: false,
      style: {
        backgroundColor: "#FAFAFA",
      },
    },
  }
);
