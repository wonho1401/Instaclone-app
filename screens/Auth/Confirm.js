import React, { useState } from "react";
import { useMutation } from "react-apollo-hooks";
import { Alert } from "react-native";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import styled from "styled-components";
import { logUserIn, useLogIn } from "../../AuthContext";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { CONFIRM_SECRET, LOGIN } from "./AuthQueries";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color: white;
`;

export default ({ navigation }) => {
  const confirmInput = useInput("");
  const [loading, setLoading] = useState(false);
  const logIn = useLogIn();
  const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
    variables: {
      secret: confirmInput.value,
      email: navigation.getParam("email"),
    },
  });
  const handleConfirm = async () => {
    const { value } = confirmInput;

    if (value === "" || !value.includes(" ")) {
      return Alert.alert("Invalid secret");
    }
    try {
      setLoading(true);
      const {
        data: { confirmSecret },
      } = await confirmSecretMutation();

      if (confirmSecret !== "" || confirmSecret !== false) {
        logIn(confirmSecret);
      } else {
      }
    } catch (error) {
      Alert.alert("Cant confirm secret");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          {...confirmInput}
          placeholder="Secret"
          returnKeyType="send"
          onSubmitEditing={handleConfirm}
          autoCorrect={false}
        />
        <AuthButton
          loading={loading}
          text={"Confirm"}
          onPress={handleConfirm}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};
