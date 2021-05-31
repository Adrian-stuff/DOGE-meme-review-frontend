import React from "react";
import { Flex, Heading, List, Link, ListItem } from "@chakra-ui/react";
const Rooms = ({ rooms }) => {
  return (
    <Flex padding="2" margin="2" borderRadius="lg" borderWidth="1px">
      <Heading fontSize="3xl">Rooms:</Heading>
      <List margin="2" fontSize="lg" fontWeight="bold">
        {rooms[0] != null &&
          rooms.map((e, idx) => (
            <Link key={idx} href={`/rooms/${e}`}>
              <ListItem padding="1" margin="1">
                {e}
              </ListItem>
            </Link>
          ))}
      </List>
    </Flex>
  );
};

export default Rooms;
