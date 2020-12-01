import { Camera } from "expo-camera";
import React, { useState, useEffect, useRef } from "react";
import * as Permissions from "expo-permissions";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components";
import Loader from "../../components/Loader";
import constants from "../../constants";
import styles from "../../styles";
import * as MediaLibrary from "expo-media-library";

const View = styled.View`
  flex: 1;
  background-color: white;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;

const Button = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 40px;
  border: 10px solid ${styles.lightGreyColor};
`;

export default ({ navigation }) => {
  const cameraRef = useRef();
  const [canTakePhoto, setCanTakePhoto] = useState(true);
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const takePhoto = async () => {
    try {
      setCanTakePhoto(false);
      const { uri } = await cameraRef.current.takePictureAsync({
        quality: 1,
      });
      const { assets } = await MediaLibrary.createAssetAsync(uri);
      console.log(assets);
    } catch (e) {
      console.log(e);
      setCanTakePhoto(true);
    }
  };

  const askPermission = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      if (status === "granted") {
        setHasPermission(true);
      }
    } catch (e) {
      console.log(e);
      setHasPermission(false);
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
        <>
          <Camera
            ref={cameraRef}
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
          <View>
            <TouchableOpacity onPress={takePhoto} disabled={!canTakePhoto}>
              <Button />
            </TouchableOpacity>
          </View>
        </>
      ) : null}
    </View>
  );
};
