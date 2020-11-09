import React, { useState } from "react";
import { useMutation } from "react-apollo-hooks";
import { Alert } from "react-native";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { CREATE_ACCOUNT, LOGIN } from "./AuthQueries";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color: white;
`;

export default ({ navigation }) => {
  const fNameInput = useInput("");
  const lNameInput = useInput("");
  const emailInput = useInput(navigation.getParam("email", ""));
  const nicknameInput = useInput("");
  const [loading, setLoading] = useState(false);

  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      nickname: nicknameInput.value,
      email: emailInput.value,
      fName: fNameInput.value,
      lName: lNameInput.value,
    },
  });
  const handleSignUp = async () => {
    const { value: email } = emailInput;
    const { value: fName } = fNameInput;
    const { value: lName } = lNameInput;
    const { value: nickname } = nicknameInput;

    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
      return Alert.alert("That email is invalid");
    }
    if (fName === "") {
      return Alert.alert("Please fill First name");
    }
    if (lName === "") {
      return Alert.alert("Please fill Last name");
    }
    if (nickname === "") {
      return Alert.alert("Invalid nickname");
    }
    try {
      setLoading(true);
      const {
        data: { createAccount },
      } = await createAccountMutation();

      if (createAccount) {
        Alert.alert("Account Created", "Log in now");
        navigation.navigate("Login", { email });
      } else {
      }
    } catch (error) {
      Alert.alert("Nickname already used", "Log in instead");
      navigation.navigate("Login", { email });
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          {...fNameInput}
          placeholder="First name"
          autoCapitalize="words"
        />
        <AuthInput
          {...lNameInput}
          placeholder="Last name"
          autoCapitalize="words"
        />
        <AuthInput
          {...emailInput}
          placeholder="Email"
          keyboardType="email-address"
          returnKeyType="send"
          autoCorrect={false}
        />
        <AuthInput
          {...nicknameInput}
          placeholder="Nickname"
          returnKeyType="send"
          autoCorrect={false}
        />
        <AuthButton loading={loading} text={"Sign up"} onPress={handleSignUp} />
      </View>
    </TouchableWithoutFeedback>
  );
};
