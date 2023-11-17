import React from "react";
import { Tag, TagLabel, TagCloseButton } from "@chakra-ui/react";


const RecruitingCardTag = (props: any) => {
  return (
    <Tag size="sm" key={props.key} variant="solid" bg="gray.200" marginEnd={"10px"}>
      <TagLabel color="black">{props.tagname}</TagLabel>
    </Tag>
  );
};

export default RecruitingCardTag;
