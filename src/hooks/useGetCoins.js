import { collection, onSnapshot, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { adaptFetchedCoins } from '../utilities/adapt-fetched-coins';
import { db } from '../firebase-config';

const axios = require("axios");

const options = {
  method: 'GET',
  url: 'https://coinranking1.p.rapidapi.com/coins',
  params: {
    referenceCurrencyUuid: 'yhjMzLPhuIDl',
    timePeriod: '24h',
    'tiers[0]': '1',
    orderBy: 'marketCap',
    orderDirection: 'desc',
    limit: '50',
    offset: '0'
  },
  headers: {
    'X-RapidAPI-Key': '4267c7a7ccmsh5409e317ce71bf6p1f7f2ajsn399779b7a989',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
  console.log(response.data.data.coins);
}).catch(function (error) {
  console.error(error);
});

const useGetCoins = () => {
  const [coins, setCoins] = useState([]);
  const [yourCoins, setYourCoins] = useState([]);

  const fetchCoins = async () => {
    try {
      console.log('fetching coins...')
      const response = await axios.request(options);
      //console.log(response.data.data.coins)
      return response.data.data.coins;
    } catch (error) {
      console.error(error);
    }
  };

  const fetchYourCoins = (db) => {
    const yourCoinsQuery = query(collection(db, 'yourCoins'));

    return onSnapshot(yourCoinsQuery, (querySnapshot) => {
      setYourCoins(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
  };

  const handleGetAllCoins = async (requestOptions, yourCoins) => {
    const fetchedCoins = await fetchCoins(requestOptions);
    const adaptedCoins = adaptFetchedCoins(fetchedCoins, yourCoins);
    setCoins(adaptedCoins);
  };

  useEffect(() => {
    fetchYourCoins(db);
  }, []);

  useEffect(() => {
    handleGetAllCoins('GET', yourCoins);
  }, [yourCoins]);

  return { coins };
};

export default useGetCoins;
