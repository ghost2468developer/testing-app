
import axios from 'axios';
import { WeatherData } from '../types/dashboard';
import { LocationData, getLocationWithPermission } from './locationService';

const WEATHER_API_KEY = 'demo'; // Using demo data for free tier
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const getWeatherData = async (location?: LocationData): Promise<WeatherData> => {
  try {
    let weatherLocation: LocationData | null = location || null;
    
    // If no location provided, try to get user's current location
    if (!weatherLocation) {
      console.log('No location provided, attempting to get user location...');
      weatherLocation = await getLocationWithPermission();
    }
    
    // Determine location string for display and API
    let locationString = 'London'; // Default fallback
    let displayLocation = 'London';
    
    if (weatherLocation) {
      if (weatherLocation.city) {
        locationString = weatherLocation.city;
        displayLocation = weatherLocation.city;
        if (weatherLocation.country) {
          displayLocation = `${weatherLocation.city}, ${weatherLocation.country}`;
        }
      } else {
        // Use coordinates if we have them but no city name
        locationString = `${weatherLocation.latitude},${weatherLocation.longitude}`;
        displayLocation = 'Your Location';
      }
    }
    
    console.log('Fetching weather data for:', displayLocation);
    
    // For demo purposes, we'll return mock data since we don't have API keys
    // In a real app, you would use the location data to make an API call:
    // const response = await axios.get(`${BASE_URL}?q=${locationString}&appid=${WEATHER_API_KEY}&units=metric`);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate location-aware mock data
    const baseTemp = weatherLocation ? 
      Math.floor(Math.random() * 25) + 10 : // 10-35°C for user location
      Math.floor(Math.random() * 20) + 5;   // 5-25°C for default location
    
    const mockWeatherData: WeatherData = {
      location: displayLocation,
      temperature: baseTemp,
      description: ['Sunny', 'Cloudy', 'Partly Cloudy', 'Rainy', 'Clear'][Math.floor(Math.random() * 5)],
      humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
      windSpeed: Math.floor(Math.random() * 20) + 5, // 5-25 km/h
      icon: '01d',
      feelsLike: baseTemp + Math.floor(Math.random() * 6) - 3, // ±3°C from actual temp
    };
    
    console.log('Weather data generated:', mockWeatherData);
    return mockWeatherData;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw new Error('Failed to fetch weather data');
  }
};

export const getWeatherForLocation = async (latitude: number, longitude: number): Promise<WeatherData> => {
  const locationData: LocationData = { latitude, longitude };
  return getWeatherData(locationData);
};
