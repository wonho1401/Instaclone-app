import { createBottomTabNavigator } from "react-navigation-tabs";
import { View } from "react-native";
import Home from "../screens/Home";
import Notifications from "../screens/Notifications";
import Profile from "../screens/Profile";
import Search from "../screens/Search";

export default createBottomTabNavigator({
  Home,
  Search,
  Plus: {
    screen: View,
    navigationOptions: {
      tabBarOnPress: ({ navigation }) => navigation.navigate("PhotoNavigation"),
    },
  },
  Notifications,
  Profile,
});
