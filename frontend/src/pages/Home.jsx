import React, { useEffect, useState } from 'react';
import { Container, SimpleGrid, Box, Text } from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import RestuarantCard from '../components/RestuarantCard';
// import { useLocation } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

export default function Dashboard() {
  const [restuarants, setRestuarants] = useState([]);

  // const location = useLocation();
  useEffect(() => {
    async function fetchRestuarnts() {
      try {
        await fetch(`${API_URL}api/restaurants`, {
          method: 'GET',
        })
          .then((response) => response.json())
          .then((response) => {
            setRestuarants(response);
            console.log('RES', response);
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

  return (
    <Container maxWidth="7xl" py="10px">
      <Navbar title="Kampala Restuarants" showButton={true} />

      <SimpleGrid spacing={10} p="10px" minChildWidth="250px">
        {restuarants &&
          restuarants.length > 0 &&
          restuarants.map((item) => (
            <RestuarantCard key={item._id} item={item} />
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
