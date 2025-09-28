
import axios from 'axios';
import { CryptoData } from '../types/dashboard';

const BASE_URL = 'https://api.coingecko.com/api/v3/coins/markets';

export const getCryptoData = async (): Promise<CryptoData[]> => {
  try {
    console.log('Fetching crypto data...');
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock crypto data
    const mockCryptoData: CryptoData[] = [
      {
        id: 'bitcoin',
        name: 'Bitcoin',
        symbol: 'BTC',
        current_price: 45000 + Math.floor(Math.random() * 10000),
        price_change_percentage_24h: (Math.random() - 0.5) * 10,
        image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png'
      },
      {
        id: 'ethereum',
        name: 'Ethereum',
        symbol: 'ETH',
        current_price: 2800 + Math.floor(Math.random() * 500),
        price_change_percentage_24h: (Math.random() - 0.5) * 8,
        image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png'
      },
      {
        id: 'cardano',
        name: 'Cardano',
        symbol: 'ADA',
        current_price: 0.5 + Math.random() * 0.3,
        price_change_percentage_24h: (Math.random() - 0.5) * 12,
        image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png'
      }
    ];
    
    return mockCryptoData;
  } catch (error) {
    console.error('Error fetching crypto data:', error);
    throw new Error('Failed to fetch crypto data');
  }
};
