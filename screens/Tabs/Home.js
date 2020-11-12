import React from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import Loader from "../../components/Loader";
import { useQuery } from "react-apollo-hooks";

const FEED_QUERY = gql`
  {
    seeFeed {
      id
      location
      caption
      user {
        id
        avatar
        nickname
      }
      files {
        id
        url
      }
      likeCount
      isLiked
      comments {
        id
        text
        user {
          id
          nickname
        }
      }
      createdAt
    }
  }
`;

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color: white;
`;

export default () => {
  const { loading, data } = useQuery(FEED_QUERY);
  console.log(loading, data);

  return <View>{loading ? <Loader /> : null}</View>;
};
