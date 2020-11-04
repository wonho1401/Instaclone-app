import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import UploadPhoto from "../screens/Photo/UploadPhoto";
import SelectPhoto from "../screens/Photo/SelectPhoto";
import TakePhoto from "../screens/Photo/TakePhoto";
import { createStackNavigator } from "react-navigation-stack";

//굳이 MaterialTopTab을 사용하는 이유? 슬라이드가 가능하기때문. BottomTab은 슬라이드가 안됨!
const PhotoTabs = createMaterialTopTabNavigator(
  {
    SelectPhoto,
    TakePhoto,
  },
  {
    tabBarPosition: "bottom",
  }
);

export default createStackNavigator({
  PhotoTabs,
  UploadPhoto,
});
