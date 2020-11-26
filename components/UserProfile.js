import React, { useState } from "react";
import { Image, View, TouchableOpacity, ScrollView } from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Ionicons, Feather } from "@expo/vector-icons";
import constants from "../constants";
import styles from "../styles";
import SquarePhoto from "./SquarePhoto";
import Post from "./Post";

const ProfileHeader = styled.View`
  padding: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const HeaderColumn = styled.View``;

const ProfileStats = styled.View`
  flex-direction: row;
`;
const Stat = styled.View`
  margin-left: 40px;
  align-items: center;
`;
const Bold = styled.Text`
  font-weight: 600;
`;
const StatName = styled.Text`
  font-size: 12px;
  font-weight: 500;
`;

const ProfileMeta = styled.View`
  margin-top: 10px;
  padding-horizontal: 10px;
`;

const Bio = styled.Text``;

const ButtonContainer = styled.View`
  margin-top:30px
  flex-direction: row;
  border:1px solid ${styles.lightGreyColor}
`;
const Button = styled.View`
  width: ${constants.width / 2};
  align-items: center;
`;

const UserProfile = ({
  avatar,
  postCount,
  followersCount,
  followingCount,
  fullName,
  bio,
  post,
}) => {
  const [isGrid, setIsGrid] = useState(true);

  const toggleGrid = () => {
    setIsGrid((i) => !i);
  };
  return (
    <View>
      <ProfileHeader>
        <Image
          style={{ height: 80, width: 80, borderRadius: 40 }}
          source={{ uri: avatar }}
        />
        <HeaderColumn>
          <ProfileStats>
            <Stat>
              <Bold>{postCount}</Bold>
              <StatName>Posts</StatName>
            </Stat>
            <Stat>
              <Bold>{followersCount}</Bold>
              <StatName>Followers</StatName>
            </Stat>
            <Stat>
              <Bold>{followingCount}</Bold>
              <StatName>Following</StatName>
            </Stat>
          </ProfileStats>
        </HeaderColumn>
      </ProfileHeader>
      <ProfileMeta>
        <Bold>{fullName}</Bold>
        <Bio>{bio}</Bio>
      </ProfileMeta>
      <ButtonContainer>
        <TouchableOpacity onPress={toggleGrid}>
          <Button>
            <Feather
              color={isGrid ? styles.blackColor : styles.darkGreyColor}
              size={36}
              name={"grid"}
            />
          </Button>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleGrid}>
          <Button>
            <Feather
              color={!isGrid ? styles.blackColor : styles.darkGreyColor}
              size={36}
              name={"list"}
            />
          </Button>
        </TouchableOpacity>
      </ButtonContainer>
      <ScrollView contentContainerStyle={{ flexDirection: "row" }}>
        {post &&
          post.map((p) =>
            isGrid ? (
              <SquarePhoto key={p.id} {...p} />
            ) : (
              <Post key={p.id} {...p} />
            )
          )}
      </ScrollView>
    </View>
  );
};

UserProfile.propTypes = {
  id: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  nickname: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  isSelf: PropTypes.bool.isRequired,
  bio: PropTypes.string.isRequired,
  followingCount: PropTypes.number.isRequired,
  followersCount: PropTypes.number.isRequired,
  postCount: PropTypes.number.isRequired,
  post: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        avatar: PropTypes.string,
        nickname: PropTypes.string.isRequired,
      }).isRequired,
      files: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          url: PropTypes.string.isRequired,
        })
      ).isRequired,
      likeCount: PropTypes.number.isRequired,
      isLiked: PropTypes.bool.isRequired,
      comments: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          text: PropTypes.string.isRequired,
          user: PropTypes.shape({
            id: PropTypes.string.isRequired,
            username: PropTypes.string.isRequired,
          }).isRequired,
        })
      ).isRequired,
      caption: PropTypes.string.isRequired,
      location: PropTypes.string,
      createdAt: PropTypes.string.isRequired,
    })
  ),
};

export default UserProfile;
