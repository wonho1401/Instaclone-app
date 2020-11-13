import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-swiper";
import constants from "../constants";

const Container = styled.View``;
const Header = styled.View`
  padding: 15px
  flex-direction: row;
  align-items: center;


`;
const Touchable = styled.TouchableOpacity``;
const HeaderUserContainer = styled.View`
  margin-left: 12px;
`;
const Bold = styled.Text`
  font-weight: 600;
`;
const Location = styled.Text`
  font-size: 12px;
`;

const IconsContainer = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
`;

const IconContainer = styled.View`
  margin-right: 10px;
`;

const InfoContainer = styled.View`
  padding: 10px;
`;

const CaptionContainer = styled.View`
  flex-direction: row;
`;

const Caption = styled.Text`
  margin-left: 10px;
`;

const CommentCount = styled.Text`
  margin-top: 3px;
  font-size: 12px;
  opacity: 0.5;
`;

const Post = ({ user, location, files = [], likeCount, caption, comments }) => {
  return (
    <Container>
      <Header>
        <Touchable>
          <Image
            style={{ width: 40, height: 40, borderRadius: 20 }}
            source={{ uri: user.avatar }}
          />
        </Touchable>
        <Touchable>
          <HeaderUserContainer>
            <Bold>{user.nickname}</Bold>
            <Location>{location}</Location>
          </HeaderUserContainer>
        </Touchable>
      </Header>
      {/* Photos */}
      <Swiper style={{ height: constants.height / 2.5 }}>
        {files.map((file) => (
          <Image
            style={{ width: constants.width, height: constants.height / 2.5 }}
            key={file.id}
            source={{ uri: file.url }}
          />
        ))}
      </Swiper>

      <InfoContainer>
        {/* Icons */}
        <IconsContainer>
          <Touchable>
            <IconContainer>
              <Ionicons size={28} name={"ios-heart-empty"} />
            </IconContainer>
          </Touchable>
          <Touchable>
            <IconContainer>
              <Ionicons size={28} name={"ios-heart-empty"} />
            </IconContainer>
          </Touchable>
          <Touchable>
            <IconContainer>
              <Ionicons size={28} name={"ios-paper-plane"} />
            </IconContainer>
          </Touchable>
        </IconsContainer>

        <Bold>{likeCount === 1 ? "1 Like" : `${likeCount} likes`}</Bold>

        <CaptionContainer>
          <Touchable>
            <Bold>{user.nickname}</Bold>
          </Touchable>
          <Caption>{caption}</Caption>
        </CaptionContainer>

        <Touchable>
          <CommentCount>See {comments.length} comments</CommentCount>
        </Touchable>
      </InfoContainer>
    </Container>
  );
};

Post.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    nickname: PropTypes.string.isRequired,
    avatar: PropTypes.string,
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
        nickname: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  createdAt: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  location: PropTypes.string,
};

export default Post;
