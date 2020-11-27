import { Camera } from "expo-camera";
import React, { useState, useEffect } from "react";
import * as Permissions from "expo-permissions";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components";
import Loader from "../../components/Loader";
import constants from "../../constants";
import styles from "../../styles";

const View = styled.View`
  flex: 1;
  background-color: white;
`;

const Text = styled.Text``;

export default ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);

  const askPermission = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      if (status === "granted") {
        sethasPermission(true);
      }
    } catch (e) {
      console.log(e);
      sethasPermission(false);
    }
  };

  const toggleType = () => {
    if (cameraType === Camera.Constants.Type.front) {
      setCameraType(Camera.Constants.Type.back);
    } else {
      setCameraType(Camera.Constants.Type.front);
    }
  };

  useEffect(() => {
    askPermission();
  }, []);

  return (
    <View>
      {loading ? (
        <Loader />
      ) : hasPermission ? (
        <Camera
          type={cameraType}
          style={{
            width: constants.width,
            height: constants.height / 2,
            justifyContent: "flex-end",
            padding: 15,
          }}
        >
          <TouchableOpacity onPress={toggleType}>
            <Ionicons
              name={"ios-reverse-camera"}
              color={styles.blackColor}
              size={28}
            />
          </TouchableOpacity>
        </Camera>
      ) : null}
    </View>
  );
};
