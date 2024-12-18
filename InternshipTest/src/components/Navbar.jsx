import React from 'react';
import { Box, Flex, Button, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
function Navbar() {
  return (
    <Box as="nav" bg="teal.500" padding="4">
      <Flex align="center" justify="space-between">
        <Link to='/home'>
        <Text color="white" fontSize="xl" fontWeight="bold">
          Data Logger
        </Text>
        </Link>
        <Flex>
          <Link to='/addpage'>
            <Button color="white" variant="link" marginRight="8">
              Add data
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Navbar;

