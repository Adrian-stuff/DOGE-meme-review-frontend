import React from "react";
import { Box, Heading, List, Link, ListItem } from "@chakra-ui/react";
const Rooms = ({ rooms }) => {
  return (
    <Box padding="2" marginY="2" borderRadius="lg" borderWidth="1px">
      <Heading paddingLeft="2" paddingTop="2" fontSize="3xl">
        Rooms:
      </Heading>
      <List margin="2" fontSize="lg" fontWeight="bold">
        {rooms[0] != null &&
          rooms.map((e, idx) => (
            <Link key={idx} href={`/rooms/${e}`}>
              <ListItem fontFamily="mono" margin="1">
                {e}
              </ListItem>
            </Link>
          ))}
      </List>
    </Box>
  );
};

export default Rooms;
