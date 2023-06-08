import { render, screen } from '@testing-library/react';
import App from '../src/App';
import { expect } from 'vitest';
import { json } from 'react-router-dom';
import axios from 'axios';

global.fetch = vi.fn();
const API_URL = import.meta.env.VITE_API_URL;

function createFetchResponse(data) {
  return { json: () => new Promise((resolve) => resolve(data)) };
}

async function fetchResturants() {
  return (await fetch(`${API_URL}api/restaurants`)).json();
}

async function createReatuarant(payload) {
  return (
    await fetch(`${API_URL}api/restaurants`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json();
}

describe('App', () => {
  test('makes a GET request to fetch restaurant list and returns the result', async () => {
    const restaurantListResponse = [
      {
        name: 'Cafe Javas',
        cuisineType: 'Chinese Cuisine',
        location: 'Wandegeya Street',
        imagePath: 'uploads/1686168284568-893838132.png',
      },
    ];

    fetch.mockResolvedValue(
      createFetchResponse(restaurantListResponse)
    );
    const restaurantList = await fetchResturants();

    expect(restaurantList).toStrictEqual(restaurantListResponse);
  });

  test('makes a POST request to create a restaturant', async () => {
    const payload = {
      name: 'Rahim Foods',
      cuisineType: 'French Cuisine',
      location: 'Ntinda Street',
      imagePath: 'uploads/1686168284568-893838132.png',
    };
    const response = {
      ...payload,
    };

    fetch.mockResolvedValue(createFetchResponse(response));

    const newRestaurant = await createReatuarant(payload);

    expect(newRestaurant).toStrictEqual(response);
  });
});
