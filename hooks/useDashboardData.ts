
import { useState, useEffect, useCallback } from 'react';
import { WeatherData, NewsArticle, CryptoData, QuoteData } from '../types/dashboard';
import { getWeatherData } from '../services/weatherService';
import { getNewsData } from '../services/newsService';
import { getCryptoData } from '../services/cryptoService';
import { getQuoteData } from '../services/quoteService';

export const useDashboardData = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [crypto, setCrypto] = useState<CryptoData[]>([]);
  const [quote, setQuote] = useState<QuoteData | null>(null);
  
  const [loading, setLoading] = useState({
    weather: true,
    news: true,
    crypto: true,
    quote: true,
  });

  const [errors, setErrors] = useState({
    weather: null as string | null,
    news: null as string | null,
    crypto: null as string | null,
    quote: null as string | null,
  });

  const fetchWeather = useCallback(async () => {
    try {
      setLoading(prev => ({ ...prev, weather: true }));
      setErrors(prev => ({ ...prev, weather: null }));
      console.log('Fetching weather data...');
      const weatherData = await getWeatherData();
      setWeather(weatherData);
      console.log('Weather data loaded successfully');
    } catch (error) {
      console.error('Error fetching weather:', error);
      setErrors(prev => ({ ...prev, weather: 'Failed to load weather data' }));
    } finally {
      setLoading(prev => ({ ...prev, weather: false }));
    }
  }, []);

  const updateWeather = useCallback((weatherData: WeatherData) => {
    console.log('Updating weather data:', weatherData);
    setWeather(weatherData);
    setErrors(prev => ({ ...prev, weather: null }));
  }, []);

  const fetchNews = useCallback(async () => {
    try {
      setLoading(prev => ({ ...prev, news: true }));
      setErrors(prev => ({ ...prev, news: null }));
      console.log('Fetching news data...');
      const newsData = await getNewsData();
      setNews(newsData);
      console.log('News data loaded successfully');
    } catch (error) {
      console.error('Error fetching news:', error);
      setErrors(prev => ({ ...prev, news: 'Failed to load news data' }));
    } finally {
      setLoading(prev => ({ ...prev, news: false }));
    }
  }, []);

  const fetchCrypto = useCallback(async () => {
    try {
      setLoading(prev => ({ ...prev, crypto: true }));
      setErrors(prev => ({ ...prev, crypto: null }));
      console.log('Fetching crypto data...');
      const cryptoData = await getCryptoData();
      setCrypto(cryptoData);
      console.log('Crypto data loaded successfully');
    } catch (error) {
      console.error('Error fetching crypto:', error);
      setErrors(prev => ({ ...prev, crypto: 'Failed to load crypto data' }));
    } finally {
      setLoading(prev => ({ ...prev, crypto: false }));
    }
  }, []);

  const fetchQuote = useCallback(async () => {
    try {
      setLoading(prev => ({ ...prev, quote: true }));
      setErrors(prev => ({ ...prev, quote: null }));
      console.log('Fetching quote data...');
      const quoteData = await getQuoteData();
      setQuote(quoteData);
      console.log('Quote data loaded successfully');
    } catch (error) {
      console.error('Error fetching quote:', error);
      setErrors(prev => ({ ...prev, quote: 'Failed to load quote data' }));
    } finally {
      setLoading(prev => ({ ...prev, quote: false }));
    }
  }, []);

  const refreshAll = useCallback(() => {
    console.log('Refreshing all dashboard data...');
    fetchWeather();
    fetchNews();
    fetchCrypto();
    fetchQuote();
  }, [fetchWeather, fetchNews, fetchCrypto, fetchQuote]);

  useEffect(() => {
    console.log('Dashboard data hook initialized, fetching initial data...');
    refreshAll();
  }, []);

  return {
    data: {
      weather,
      news,
      crypto,
      quote,
    },
    loading,
    errors,
    refresh: {
      all: refreshAll,
      weather: fetchWeather,
      news: fetchNews,
      crypto: fetchCrypto,
      quote: fetchQuote,
    },
    updateWeather,
  };
};
