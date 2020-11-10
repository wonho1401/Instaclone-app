import React, { useState } from "react";
import { useMutation } from "react-apollo-hooks";
import { Alert } from "react-native";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { CREATE_ACCOUNT, LOGIN } from "./AuthQueries";
import * as Facebook from "expo-facebook";
import * as Google from "expo-google-app-auth";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color: white;
`;

const FBContainer = styled.View`
  margin-top: 25px;
  padding-top: 25px;
  border-top-width: 1px;
  border-top-color: ${(props) => props.theme.lightGreyColor};
  border-style: solid;
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

  const fbLogin = async () => {
    try {
      setLoading(true);
      await Facebook.initializeAsync({
        appId: "1005033050015680",
      });
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile"],
      });
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=id,last_name,first_name,email`
        );
        const { email, first_name, last_name } = await response.json();

        emailInput.setValue(email);
        fNameInput.setValue(first_name);
        lNameInput.setValue(last_name);

        // const [nickname] = email.split("@");
        // nicknameInput.setValue(nickname);
        setLoading(false);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  const gLogin = async () => {
    const googleID =
      "1066394022758-3uq5mcapm295vdr6k04vh2d3g54qu3v4.apps.googleusercontent.com";
    try {
      setLoading(true);
      const result = await Google.logInAsync({
        iosClientId: googleID,
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        const user = await fetch("https://www.googleapis.com/userinfo/v2/me", {
          headers: { Authorization: `Bearer ${result.accessToken}` },
        });

        const { email, family_name, given_name } = await user.json();
        emailInput.setValue(email);
        fNameInput.setValue(family_name);
        lNameInput.setValue(given_name);
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
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
        <FBContainer>
          <AuthButton
            bgColor={"#2D4DA7"}
            loading={false}
            onPress={fbLogin}
            text="Connect Facebook"
          />
        </FBContainer>
        <FBContainer>
          <AuthButton
            bgColor={"#EA4335"}
            loading={false}
            onPress={gLogin}
            text="Connect Google"
          />
        </FBContainer>
      </View>
    </TouchableWithoutFeedback>
  );
};
