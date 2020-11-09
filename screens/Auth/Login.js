import React, { useState } from "react";
import { useMutation } from "react-apollo-hooks";
import { Alert } from "react-native";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { LOGIN } from "./AuthQueries";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color: white;
`;

export default ({ navigation }) => {
  const emailInput = useInput(navigation.getParam("email"), "");
  const [loading, setLoading] = useState(false);
  const [requestSecretMutation] = useMutation(LOGIN, {
    variables: { email: emailInput.value },
  });
  const handleLogin = async () => {
    const { value } = emailInput;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (value === "") {
      return Alert.alert("Email is empty");
    } else if (!value.includes("@") || !value.includes(".")) {
      return Alert.alert("Email should include @ or .");
    } else if (!emailRegex.test(value)) {
      return Alert.alert("Email is invalid");
    }
    try {
      setLoading(true);
      const {
        data: { requestSecret },
      } = await requestSecretMutation();

      if (requestSecret) {
        Alert.alert("Check your email");
        navigation.navigate("Confirm", { email: value });
      } else {
        Alert.alert("Account not found");
        navigation.navigate("SignUp", { email: value });
      }
    } catch (error) {
      Alert.alert("Cant login now");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          {...emailInput}
          placeholder="Email"
          keyboardType="email-address"
          returnKeyType="send"
          onSubmitEditing={handleLogin}
          autoCorrect={false}
        />
        <AuthButton loading={loading} text={"Log In"} onPress={handleLogin} />
      </View>
    </TouchableWithoutFeedback>
  );
};
