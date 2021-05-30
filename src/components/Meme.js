import React, { useGlobal } from "reactn";
import {
  Box,
  Container,
  Text,
  Button,
  Heading,
  Flex,
  Grid,
  Image,
  Link,
  useColorMode,
} from "@chakra-ui/react";
const Meme = ({ data, media, onOpen }) => {
  const [roomID] = useGlobal("roomID");
  const [username] = useGlobal("username");
  const { colorMode, toggleColorMode } = useColorMode();

  if (data === undefined || null) return <Heading> Loading...</Heading>;
  return data.subreddit ? (
    <Container maxW="lg" borderWidth="1px" borderRadius="lg" padding="0">
      <Grid templateColumns="40px auto">
        <Flex
          alignItems="center"
          flexDirection="column"
          padding="8px 4px 8px 0"
          left="0"
          top="0"
          backgroundColor={colorMode === "dark" ? "blackAlpha.400" : "gray.100"}
          style={{ width: "40px", borderLeft: "4px solid transparent" }}
        >
          <Text fontSize="sm" margin="4px 0">
            {data.ups}
          </Text>
        </Flex>

        <Box margin="2">
          <Flex alignItems="start" margin="0 8px 8px">
            <Box display="inline">
              <Text fontSize="small">
                <Link>r/{data.subreddit}</Link> • Posted by{" "}
                <Link>u/{data.author}</Link>
              </Text>
            </Box>
          </Flex>

          <Heading marginBottom="2" size="md">
            {data.title}
          </Heading>

          <Flex
            marginTop="8px"
            justifyContent="center"
            width="100%"
            style={{ top: 0, left: 0, bottom: 0, right: 0 }}
          >
            <a href={data.postLink} target="_blank" rel="noreferrer">
              <Flex style={{ maxHeight: "512px", margin: "0 auto" }}>
                <Image
                  maxH="512px"
                  margin="0 auto"
                  src={data.img}
                  alt={data.title}
                />
              </Flex>
            </a>
          </Flex>
          {media && (
            <Flex justifyContent="flex-end">
              <Button margin="1" onClick={onOpen}>
                Chat
              </Button>
            </Flex>
          )}
        </Box>
      </Grid>
    </Container>
  ) : (
    <h1> Start by requesting a meme</h1>
  );
};

export default Meme;
