import React, { useEffect, useState } from 'react';
import { Container, SimpleGrid, Box, Text } from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import RestuarantCard from '../components/RestuarantCard';
import {
  showErrorToastMessage,
  showSuccessToastMessage,
} from '../utils/notifications';

const API_URL = import.meta.env.VITE_API_URL;

export default function Dashboard() {
  const [restuarants, setRestuarants] = useState([]);

  useEffect(() => {
    async function fetchRestuarnts() {
      try {
        await fetch(`${API_URL}api/restaurants`, {
          method: 'GET',
        })
          .then((response) => response.json())
          .then((response) => {
            setRestuarants(response);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    }

    fetchRestuarnts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}api/restaurants/${id}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.status === 204) {
            const newRestaurants = restuarants.filter(
              (restuarant) => restuarant._id != id
            );
            setRestuarants(newRestaurants);
            showSuccessToastMessage(
              'Restaurant deleted successfully'
            );
          }
        })
        .catch((error) => {
          showErrorToastMessage('Error while deleting restaurant!!');
        });
    } catch (error) {
      showErrorToastMessage('Error while deleting restaurant!!');
    }
  };

  return (
    <Container maxWidth="7xl" py="10px">
      <Navbar title="Kampala Restuarants" showButton={true} />

      <SimpleGrid spacing={10} p="10px" minChildWidth="250px">
        {restuarants &&
          restuarants.length > 0 &&
          restuarants.map((item) => (
            <RestuarantCard
              key={item._id}
              item={item}
              handleDelete={handleDelete}
            />
          ))}
        {restuarants.length === 0 && (
          <Text as="h4" color={'red'} p={10} textAlign={'center'}>
            No Restuarants Found!!! Click Add New to create new
            Resturants
          </Text>
        )}
      </SimpleGrid>
    </Container>
  );
}
