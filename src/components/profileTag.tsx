import React from "react";
import { Tag, TagLabel, TagCloseButton } from "@chakra-ui/react";

const colors = ["teal", "red", "green", "gray", "cyan", "yellow", "pink", "purple", "orange", "blue"];

function getRandomColor() {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

const ProfileTag = (props: any) => {
  return (
    <Tag size="md" key={props.key} variant="solid" colorScheme={getRandomColor()} marginEnd={"10px"}>
      <TagLabel>{props.tagname}</TagLabel>
    </Tag>
  );
};

export default ProfileTag;
