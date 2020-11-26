import React from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { USER_FRAGMENT } from "../../fragment";
import { ScrollView } from "react-native";
import Loader from "../../components/Loader";
import { useQuery } from "react-apollo-hooks";
import UserProfile from "../../components/UserProfile";

export const ME = gql`
  {
    me {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

export default () => {
  const { loading, data } = useQuery(ME);

  console.log(loading, data);
  return (
    <ScrollView>
      {loading ? <Loader /> : data && data.me && <UserProfile {...data.me} />}
    </ScrollView>
  );
};
