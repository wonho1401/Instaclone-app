import React from "react";
import styled from "styled-components";
import SearchBar from "../../../components/SearchBar";
import SearchPresenter from "./SearchPresenter";

export default class extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: (
      <SearchBar
        value={navigation.getParam("term", "")}
        onChange={navigation.getParam("onChange", () => null)}
        onSubmit={navigation.getParam("onSubmit", () => null)}
      />
    ),
  });
  constructor(props) {
    super(props);
    const { navigation } = props;
    this.state = {
      term: "",
      shouldFetch: false,
    };
    navigation.setParams({
      term: this.state.term,
      onChange: this.onChange,
      onSubmit: this.onSubmit,
    });
  }

  onSubmit = () => {
    this.setState({ shouldFetch: true });
  };

  onChange = (text) => {
    const { navigation } = this.props;
    this.setState({ term: text, shouldFetch: false });
    navigation.setParams({
      term: text,
    });
  };

  render() {
    const { term, shouldFetch } = this.state;
    return <SearchPresenter term={term} shouldFetch={shouldFetch} />;
  }
}
