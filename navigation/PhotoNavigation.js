import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import UploadPhoto from "../screens/Photo/UploadPhoto";
import SelectPhoto from "../screens/Photo/SelectPhoto";
import TakePhoto from "../screens/Photo/TakePhoto";
import { createStackNavigator } from "react-navigation-stack";
import { stackStyle } from "../components/config";
import styles from "../styles";

//굳이 MaterialTopTab을 사용하는 이유? 슬라이드가 가능하기때문. BottomTab은 슬라이드가 안됨!
const PhotoTabs = createMaterialTopTabNavigator(
  {
    Select: {
      screen: SelectPhoto,
      navigationOptions: {
        tabBarLabel: "Select",
      },
    },
    Take: {
      screen: TakePhoto,
      navigationOptions: {
        tabBarLabel: "Take",
      },
    },
  },
  {
    tabBarPosition: "bottom",
    tabBarOptions: {
      labelStyle: {
        color: styles.blackColor,
        fontWeight: "600",
      },
      indicatorStyle: {
        backgroundColor: styles.blackColor,
        marginBottom: 20,
      },
      style: {
        paddingBottom: 20,
        ...stackStyle,
      },
    },
  }
);

export default createStackNavigator(
  {
    Tabs: {
      screen: PhotoTabs,
      navigationOptions: {
        title: "Choose Photos",
        headerBackTitleVisible: false,
        headerBackImage: null,
      },
    },
    UploadPhoto,
  },
  { defaultNavigationOptions: { headerStyle: { ...stackStyle } } }
);
