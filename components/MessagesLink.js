import React from "react";
import styled from "styled-components";
import { withNavigation } from "react-navigation";
import { Ionicons } from "@expo/vector-icons";
import NavIcon from "./NavIcon";

const Container = styled.TouchableOpacity`
  padding-right: 20px;
`;

export default withNavigation(({ navigation }) => (
  <Container onPress={() => navigation.navigate("MessageNavigation")}>
    <NavIcon name={"ios-paper-plane"} />
  </Container>
));
