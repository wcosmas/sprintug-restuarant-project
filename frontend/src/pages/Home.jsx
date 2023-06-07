import React, { useEffect, useState } from 'react';
import {
  Container,
  SimpleGrid,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import RestuarantCard from '../components/RestuarantCard';
import { useLocation } from 'react-router-dom';

export default function Dashboard() {
  const [restuarants, setRestuarants] = useState([]);

  // const location = useLocation();
  useEffect(() => {
    async function fetchRestuarnts() {
      try {
        await fetch('http://127.0.0.1:3000/api/restaurants', {
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
      </SimpleGrid>
    </Container>
  );
}
