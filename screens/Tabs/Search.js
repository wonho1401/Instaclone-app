import React from "react";
import styled from "styled-components";
import SearchBar from "../../components/SearchBar";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color: white;
`;

const Text = styled.Text``;

export default class extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: (
      <SearchBar onChange={() => null} value={""} onSubmit={() => {}} />
    ),
  });

  render() {
    return (
      <View>
        <Text>Search</Text>
      </View>
    );
  }
}
