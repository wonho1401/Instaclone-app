import React, { useState } from "react";
import { Image, ActivityIndicator, Alert } from "react-native";
import axios from "axios";
import { gql } from "apollo-boost";
import styled from "styled-components";
import constants from "../../constants";
import styles from "../../styles";
import useInput from "../../hooks/useInput";
import AuthButton from "../../components/AuthButton";
import { useMutation } from "react-apollo-hooks";
import { FEED_QUERY } from "../Tabs/Home";

const Container = styled.View`
  padding: 20px;
  flex-direction: row;
`;

const View = styled.View`
  flex: 1;
`;

const Form = styled.View`
  justify-content: flex-start;
`;

const STextInput = styled.TextInput`
  margin-bottom: 10px;
  border: 0px solid ${styles.lightGreyColor};
  border-bottom-width: 1px;
  padding-bottom: 10px;
  width: ${constants.width - 180};
`;

const Button = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.blueColor};
  padding: 10px;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text`
  color: white;
  font-weight: 600;
`;

const UPLOAD = gql`
  mutation upload($caption: String!, $files: [String!]!, $location: String) {
    upload(caption: $caption, files: $files, location: $location) {
      id
      caption
      location
    }
  }
`;
export default ({ navigation }) => {
  const [loading, setIsLoading] = useState(false);
  const captionInput = useInput("");
  const locationInput = useInput("");
  const [uploadMutation] = useMutation(UPLOAD, {
    refetchQueries: () => [{ query: FEED_QUERY }],
  });
  const photo = navigation.getParam("photo");
  const handleSubmit = async () => {
    if (captionInput.value === "" || locationInput.value === "") {
      Alert.alert("All fields are required");
    }
    const formData = new FormData();
    const name = photo.filename;
    const [, type] = name.split(".");
    formData.append("file", {
      name,
      type: type.toLowerCase(),
      uri: photo.uri,
    });
    try {
      setIsLoading(true);
      const {
        data: { location },
      } = await axios.post("http://localhost:4000/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      console.log(location);
      //백엔드에 올리는 과정(?) axios를 이용하여 요청,응답 데이터를 변환해줌.
      const {
        data: { upload },
      } = await uploadMutation({
        variables: {
          files: [location],
          caption: captionInput.value,
          location: locationInput.value,
        },
      });
      if (upload.id) {
        navigation.navigate("TabNavigation");
      }
      console.log(upload);
    } catch (e) {
      Alert.alert("Can't upload", "Try later");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View>
      <Container>
        <Image
          source={{ uri: photo.uri }}
          style={{ height: 80, width: 80, marginRight: 30 }}
        />
        <Form>
          <STextInput
            onChangeText={captionInput.onChange}
            value={captionInput.value}
            placeholder="Caption"
            multiline={true}
            placeholderTextColor={styles.darkGreyColor}
          />
          <STextInput
            onChangeText={locationInput.onChange}
            value={locationInput.value}
            placeholder="Location"
            multiline={true}
            placeholderTextColor={styles.darkGreyColor}
          />
          <Button onPress={handleSubmit}>
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text>Upload </Text>
            )}
          </Button>
        </Form>
      </Container>
    </View>
  );
};
