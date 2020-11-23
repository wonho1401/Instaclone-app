import { gql } from "apollo-boost";
import React from "react";
import { useQuery } from "react-apollo-hooks";
import { ScrollView } from "react-native-gesture-handler";
import Loader from "../components/Loader";
import UserProfile from "../components/UserProfile";
import { USER_FRAGMENT } from "../fragment";

const GET_USER = gql`
  query seeUser($nickname: String!) {
    seeUser(nickname: $nickanme) {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

export default ({ navigation }) => {
  const { data, loading } = useQuery(GET_USER, {
    variables: { nickname: navigation.getParam("nickname") },
  });
  return (
    <ScrollView>
      {loading ? (
        <Loader />
      ) : (
        data && data.seeUser && <UserProfile {...data.seeUser} />
      )}
    </ScrollView>
  );
};
