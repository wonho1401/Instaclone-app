import { gql } from "apollo-boost";

export const POST_FRAGMENT = gql`
  fragment PostParts on Post {
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
`;

export const USER_FRAGMENT = gql`
  fragment UserParts on User {
    id
    avatar
    nickname
    fullName
    isFollowing
    isSelf
    bio
    followingCount
    followersCount
    postCount
    post {
      ...PostParts
    }
  }
  ${POST_FRAGMENT}
`;
