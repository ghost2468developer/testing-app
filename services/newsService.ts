
import axios from 'axios';
import { NewsArticle } from '../types/dashboard';

const NEWS_API_KEY = 'demo'; // Using demo data for free tier
const BASE_URL = 'https://newsapi.org/v2/top-headlines';

export const getNewsData = async (): Promise<NewsArticle[]> => {
  try {
    console.log('Fetching news data...');
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Mock news data
    const mockNewsData: NewsArticle[] = [
      {
        id: '1',
        title: 'Tech Giants Report Strong Q4 Earnings',
        description: 'Major technology companies exceeded expectations in their quarterly reports, showing resilience in challenging market conditions.',
        url: 'https://example.com/news/1',
        urlToImage: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=200&fit=crop',
        publishedAt: new Date().toISOString(),
        source: { name: 'Tech News' }
      },
      {
        id: '2',
        title: 'Climate Summit Reaches Historic Agreement',
        description: 'World leaders agree on ambitious new targets for carbon reduction and renewable energy adoption.',
        url: 'https://example.com/news/2',
        urlToImage: 'https://images.unsplash.com/photo-1569163139394-de4e4f43e4e5?w=400&h=200&fit=crop',
        publishedAt: new Date(Date.now() - 3600000).toISOString(),
        source: { name: 'Global News' }
      },
      {
        id: '3',
        title: 'Breakthrough in Renewable Energy Storage',
        description: 'Scientists develop new battery technology that could revolutionize how we store and use renewable energy.',
        url: 'https://example.com/news/3',
        urlToImage: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&h=200&fit=crop',
        publishedAt: new Date(Date.now() - 7200000).toISOString(),
        source: { name: 'Science Daily' }
      },
      {
        id: '4',
        title: 'Global Markets Show Positive Trends',
        description: 'Stock markets worldwide continue their upward trajectory as investor confidence grows.',
        url: 'https://example.com/news/4',
        urlToImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=200&fit=crop',
        publishedAt: new Date(Date.now() - 10800000).toISOString(),
        source: { name: 'Financial Times' }
      },
      {
        id: '5',
        title: 'Space Exploration Milestone Achieved',
        description: 'New space mission successfully launches, marking another step forward in human space exploration.',
        url: 'https://example.com/news/5',
        urlToImage: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=200&fit=crop',
        publishedAt: new Date(Date.now() - 14400000).toISOString(),
        source: { name: 'Space News' }
      }
    ];
    
    return mockNewsData;
  } catch (error) {
    console.error('Error fetching news data:', error);
    throw new Error('Failed to fetch news data');
  }
};
