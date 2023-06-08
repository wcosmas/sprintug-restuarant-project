import React from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  Heading,
  Text,
  HStack,
  Button,
  Divider,
  Image,
  Stack,
  Icon,
  Box,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { MdLocationOn } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

const RestuarantCard = ({ item, handleDelete }) => {
  return (
    <Card maxWidth={'400px'}>
      <Image
        objectFit="cover"
        maxW="100%"
        maxHeight={250}
        src={`${API_URL}${item.imagePath}`}
        alt="Caffe Latte"
      />
      <Stack>
        <CardBody>
          <Heading size="md">{item.name}</Heading>

          <Text py="2">{item.cuisineType}</Text>
          <Box display={'flex'} flexDir={'row'} alignItems={'center'}>
            <Icon as={MdLocationOn} color={'gray.500'} />
            <Text color={'gray.500'} ml={1}>
              {item.location}
            </Text>
          </Box>
        </CardBody>
        <Divider borderColor="gray.200" />
        <CardFooter>
          <Box
            width={'100%'}
            display={'flex'}
            flexDir={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <NavLink to={`/update/${item._id}`}>
              <Button variant="ghost" leftIcon={<EditIcon />}>
                Update
              </Button>
            </NavLink>

            <Button
              variant="ghost"
              leftIcon={<DeleteIcon />}
              onClick={() => handleDelete(item._id)}
            >
              Delete
            </Button>
          </Box>
        </CardFooter>
      </Stack>
    </Card>
  );
};

export default RestuarantCard;
