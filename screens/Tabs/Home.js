import React, { useState } from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import Loader from "../../components/Loader";
import { useQuery } from "react-apollo-hooks";
import { RefreshControl, ScrollView } from "react-native";
import Post from "../../components/Post";
import { POST_FRAGMENT } from "../../fragment";
export const FEED_QUERY = gql`
  {
    seeFeed {
      #   id
      #   location
      #   caption
      #   user {
      #     id
      #     avatar
      #     nickname
      #   }
      #   files {
      #     id
      #     url
      #   }
      #   likeCount
      #   isLiked
      #   comments {
      #     id
      #     text
      #     user {
      #       id
      #       nickname
      #     }
      #   }
      #   createdAt
      # }
      ...PostParts
    }
  }
  ${POST_FRAGMENT}
`;

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color: white;
`;

export default () => {
  const [refreshing, setRefreshing] = useState(false);
  const { loading, data, refetch } = useQuery(FEED_QUERY);

  const refresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refresh} />
      }
    >
      {loading ? (
        <Loader />
      ) : (
        data &&
        data.seeFeed &&
        data.seeFeed.map((post) => <Post key={post.id} {...post} />)
      )}
    </ScrollView>
  );
};
