import { ScrollView, Container, Image, VStack, Text, Heading, Badge, Icon, Row, Divider, Fab } from "native-base";
import React from "react";
import { FontAwesome, AntDesign } from '@expo/vector-icons';


const SingleBook = () => {
  return (
    <ScrollView>
      <VStack space={4} alignItems="center">
        <Container>
          <Badge
            colorScheme="success" rounded="full" mb={-4} mr={-4} zIndex={1} variant="solid" alignSelf="flex-end" _text={{
            fontSize: 12
          }}>
            Read
          </Badge>
          <Image source={{
          uri: "https://media.npr.org/assets/img/2020/08/05/81nnjiouhll-1-_wide-fd16ee400446584c16f15aad084c8fcf0d489245.jpg?s=1400"
          }} alt="Harrow the Ninth book cover" size="2xl" />
        </Container>
        <Container>
          <Heading size="xl">Harrow the Ninth</Heading>
          <Heading size="md">by Tamsyn Muir</Heading>
          <Divider my="2" _light={{
              bg: "muted.800"
            }} _dark={{
              bg: "muted.50"
            }} />
          <Text fontSize="sm">
            Harrow the Ninth, the sequel to Gideon the Ninth, turns a galaxy inside out as one necromancer struggles to survive the wreckage of herself aboard the Emperor's haunted space station.
          </Text>
        </Container>
        <Container>
          <Heading size="sm">Your Rating:</Heading>
          <Row>
            <Icon as={FontAwesome} name="star" />
            <Icon as={FontAwesome} name="star" />
            <Icon as={FontAwesome} name="star" />
            <Icon as={FontAwesome} name="star" />
            <Icon as={FontAwesome} name="star-o" />
          </Row>
        </Container>
        <Fab renderInPortal={false} shadow={2} size="sm" icon={<Icon color="white" as={AntDesign} name="plus" size="sm" />} />
      </VStack>
    </ScrollView>
  )
}

export default SingleBook;
