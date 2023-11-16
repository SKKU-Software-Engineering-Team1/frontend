import React from "react";
import {
  Stack,
  Heading,
  Image,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";

const PreferenceCard = (props: any) => {
  return (
  <div>
    <Card maxW='sm'>
        <CardBody padding={0}>
          <Image
            src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
            alt={props.image}
            borderRadius='lg'
          />
          <Stack mt='6' spacing='3'>
            <Heading size='md' margin={'20px'}>{props.name}</Heading>
          </Stack>
        </CardBody>
        {/* <CardFooter>
          <ButtonGroup spacing='2'>
            <Button variant='solid' colorScheme='blue' bg='teal.400'>
              Read More
            </Button>
          </ButtonGroup>
        </CardFooter> */}
      </Card>
    </div>
  );
}

export default PreferenceCard;