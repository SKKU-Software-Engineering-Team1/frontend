import React from "react";
import { Card, CardBody, CardFooter, ButtonGroup, Button, Image, Stack, Heading, Text, Divider } from "@chakra-ui/react";

const ArticleCard = (props: any) => {
  const imageUrl = {
    친목: "./assets/union_tumb/buddy.jpg",
    비즈니스: "./assets/union_tumb/business.jpeg",
    학술: "./assets/union_tumb/study.jpg",
    음악: "./assets/union_tumb/band.jpg",
    애니메이션: "./assets/union_tumb/anime.jpg",
    영상: "./assets/union_tumb/video.png",
    독서: "./assets/union_tumb/book.jpg",
    영어회화: "./assets/union_tumb/eng.jpg",
    종교: "./assets/union_tumb/religion.svg",
    사진: "./assets/union_tumb/picture.jpg",
    엔터테인먼트: "./assets/union_tumb/enter.jpg",
    탐정: "./assets/union_tumb/detective.jpeg",
    향수: "./assets/union_tumb/perfume.jpg",
    스포츠: "./assets/union_tumb/sports.jpeg",
    기획: "./assets/union_tumb/manage.jpg",
  };

  const defaultImage = "./assets/union_tumb/buddy.jpg"; // 기본 이미지 경로 설정
  console.log(props.category);
  return (
    <div>
      <Card maxW="sm">
        <CardBody>
          <Image src={imageUrl[props.category as keyof typeof imageUrl] || defaultImage} alt={props.image} borderRadius="lg" />
          <Stack mt="6" spacing="3">
            <Heading size="md">{props.name}</Heading>
          </Stack>
        </CardBody>
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button variant="solid" colorScheme="blue" bg="teal.400">
              Read More
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ArticleCard;
