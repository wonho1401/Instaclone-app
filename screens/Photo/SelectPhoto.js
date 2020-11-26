import React, { useEffect, useState } from "react";
import { Image, ScrollView } from "react-native";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import styled from "styled-components";
import Loader from "../../components/Loader";
import constants from "../../constants";

const View = styled.View`
  flex: 1;
  background-color: white;
`;

const Text = styled.Text``;

export default () => {
  const [loading, setLoading] = useState(true);
  const [hasPermission, sethasPermission] = useState(false);
  const [selected, setSelected] = useState();
  const [allPhotos, setAllPhotos] = useState();

  const getPhotos = async () => {
    try {
      const { assets } = await MediaLibrary.getAssetsAsync();
      const [firstPhoto] = assets;
      setSelected(firstPhoto);
      setAllPhotos(assets);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  const askPermission = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status === "granted") {
        sethasPermission(true);
        getPhotos();
      }
    } catch (e) {
      console.log(e);
      sethasPermission(false);
    }
  };

  useEffect(() => {
    askPermission();
  }, []);

  return (
    <View>
      {loading ? (
        <Loader />
      ) : (
        <View>
          <>
            {hasPermission ? (
              <Image
                style={{ width: constants.width, height: constants.height / 2 }}
                source={{ uri: selected.uri }}
              />
            ) : (
              "fuck"
            )}
            <ScrollView contentContainerStyle={{ flexDirection: "row" }}>
              {allPhotos.map((photo) => (
                <Image
                  style={{
                    width: constants.width / 3,
                    height: constants.height / 6,
                  }}
                  source={{ uri: photo.uri }}
                  key={photo.id}
                />
              ))}
            </ScrollView>
          </>
        </View>
      )}
    </View>
  );
};
