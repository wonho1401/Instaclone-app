import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color: white;
`;

const Text = styled.Text``;

//how? 이번주내로 해보자.

export default () => (
  <View>
    <ActivityIndicator />
  </View>
);
