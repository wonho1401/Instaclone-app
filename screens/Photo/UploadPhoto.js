import React from "react";
import styled from "styled-components";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color: white;
`;

const Text = styled.Text``;

export default ({ navigation }) => (
  <View>
    <Text>Should upload photos {navigation.getParam("photo").uri}</Text>
  </View>
);
