import React from 'react';
import { Flex, Heading, Spacer, Button } from '@chakra-ui/react';
import { PlusSquareIcon } from '@chakra-ui/icons';
import { NavLink } from 'react-router-dom';
const Navbar = ({ title, showButton }) => {
  return (
    <Flex as="nav" p={5} bg="gray.400">
      <Heading as="h1" color="white">
        {title}
      </Heading>
      <Spacer />
      {showButton && (
        <NavLink to="/create">
          <Button leftIcon={<PlusSquareIcon />} colorScheme="green">
            {' '}
            Add New
          </Button>
        </NavLink>
      )}
    </Flex>
  );
};

export default Navbar;
