import { createStackNavigator } from "react-navigation-stack";
import { stackStyle } from "../components/config";
import Message from "../screens/Messages/Message";
import Messages from "../screens/Messages/Messages";

export default createStackNavigator(
  {
    Messages,
    Message,
  },
  {
    defaultNavigationOptions: {
      headerStyle: { ...stackStyle },
    },
  }
);
