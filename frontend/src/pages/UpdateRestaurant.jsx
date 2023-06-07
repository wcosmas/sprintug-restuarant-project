import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  FormControl,
  Input,
  FormLabel,
  Select,
  Button,
  Flex,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import {
  showErrorToastMessage,
  showSuccessToastMessage,
} from '../utils/notifications';

const API_URL = import.meta.env.VITE_API_URL;

const UpdateRestuarant = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [cuisineType, setCuisineType] = useState('');
  const [imagePath, setImagePath] = useState('');

  let { id } = useParams();

  useEffect(() => {
    async function fetchRestuarant() {
      try {
        await fetch(`${API_URL}api/restaurants/${id}`, {
          method: 'GET',
        })
          .then((response) => response.json())
          .then((response) => {
            setName(response.name);
            setLocation(response.location);
            setCuisineType(response.cuisineType);
            setImagePath(response.imagePath);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    }

    fetchRestuarant();
  }, [id]);

  const navigateTo = useNavigate();

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(`${API_URL}api/uploads`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const { imagePath } = await response.json();
        setImagePath(imagePath);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    let payload = {
      name,
      location,
      cuisineType,
      imagePath,
    };
    try {
      await fetch(`${API_URL}api/restaurants/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (response.status === 200) {
            showSuccessToastMessage(
              'Restaurant updated successfully!'
            );
            navigateTo('/', { state: { message: 'success' } });
          } else {
            showErrorToastMessage('Error while updating restaurant!');
          }
        })
        .catch((error) => {
          showErrorToastMessage('Error while updating restaurant!');
          console.log(error);
        });
    } catch (error) {
      showErrorToastMessage('Error while updating restaurant!');
      console.log(error);
    }
  };

  return (
    <Container maxWidth="7xl" py="10px">
      <Navbar title="Update Restuarant" />
      <Box mt={10} px={100}>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl mt={5}>
          <FormLabel>Description</FormLabel>
          <Select
            placeholder="Select option"
            value={cuisineType}
            onChange={(e) => setCuisineType(e.target.value)}
          >
            <option value="Chinese cuisine">Chinese cuisine</option>
            <option value="French Cusine">French Cusine</option>
            <option value="Japanese cuisine">Japanese cuisine</option>
            <option value="Mexican cuisine">Mexican cuisine</option>
          </Select>
        </FormControl>
        <FormControl mt={5}>
          <FormLabel>Location</FormLabel>
          <Input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </FormControl>
        <FormControl mt={5}>
          <FormLabel>Image</FormLabel>
          <Input type="file" onChange={handleFileUpload} />
        </FormControl>
        <Flex justify="flex-end" mt="10px">
          <Button colorScheme="green" onClick={handleUpdate}>
            Update
          </Button>
        </Flex>
      </Box>
    </Container>
  );
};

export default UpdateRestuarant;
