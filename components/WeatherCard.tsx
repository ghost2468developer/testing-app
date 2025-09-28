
import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { WeatherData } from '../types/dashboard';
import { colors, commonStyles } from '../styles/commonStyles';
import { IconSymbol } from './IconSymbol';
import { getLocationWithPermission } from '../services/locationService';
import { getWeatherData } from '../services/weatherService';

interface WeatherCardProps {
  weather: WeatherData | null;
  loading: boolean;
  onWeatherUpdate?: (weather: WeatherData) => void;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ 
  weather, 
  loading, 
  onWeatherUpdate 
}) => {
  const [isRequestingLocation, setIsRequestingLocation] = useState(false);

  const handleLocationRequest = async () => {
    try {
      setIsRequestingLocation(true);
      console.log('User requested location-based weather...');
      
      const location = await getLocationWithPermission();
      
      if (!location) {
        Alert.alert(
          'Location Access',
          'Location permission is required to show weather for your current location. Please enable location services in your device settings.',
          [{ text: 'OK' }]
        );
        return;
      }

      // Fetch weather for the user's location
      const weatherData = await getWeatherData(location);
      
      if (onWeatherUpdate) {
        onWeatherUpdate(weatherData);
      }
      
      console.log('Weather updated with user location');
    } catch (error) {
      console.error('Error getting location-based weather:', error);
      Alert.alert(
        'Error',
        'Unable to get your location. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsRequestingLocation(false);
    }
  };

  if (loading) {
    return (
      <View style={[commonStyles.dashboardCard, styles.container]}>
        <View style={styles.header}>
          <IconSymbol name="cloud.sun" size={24} color={colors.primary} />
          <Text style={styles.title}>Weather</Text>
        </View>
        <Text style={commonStyles.textSecondary}>Loading weather data...</Text>
      </View>
    );
  }

  if (!weather) {
    return (
      <View style={[commonStyles.dashboardCard, styles.container]}>
        <View style={styles.header}>
          <IconSymbol name="cloud.sun" size={24} color={colors.primary} />
          <Text style={styles.title}>Weather</Text>
        </View>
        <Text style={commonStyles.textSecondary}>Unable to load weather data</Text>
        <Pressable 
          style={styles.locationButton} 
          onPress={handleLocationRequest}
          disabled={isRequestingLocation}
        >
          <IconSymbol 
            name="location" 
            size={16} 
            color={colors.primary} 
          />
          <Text style={styles.locationButtonText}>
            {isRequestingLocation ? 'Getting location...' : 'Use my location'}
          </Text>
        </Pressable>
      </View>
    );
  }

  const isUsingUserLocation = weather.location !== 'London' && weather.location !== 'Unknown';

  return (
    <View style={[commonStyles.dashboardCard, styles.container]}>
      <View style={styles.header}>
        <IconSymbol name="cloud.sun" size={24} color={colors.primary} />
        <Text style={styles.title}>Weather</Text>
        {!isUsingUserLocation && (
          <Pressable 
            style={styles.locationIconButton} 
            onPress={handleLocationRequest}
            disabled={isRequestingLocation}
          >
            <IconSymbol 
              name="location" 
              size={18} 
              color={isRequestingLocation ? colors.textSecondary : colors.primary} 
            />
          </Pressable>
        )}
      </View>
      
      <View style={styles.locationInfo}>
        <Text style={styles.locationText}>{weather.location}</Text>
        {isUsingUserLocation && (
          <View style={styles.locationIndicator}>
            <IconSymbol name="location.fill" size={12} color={colors.success} />
            <Text style={styles.locationIndicatorText}>Current location</Text>
          </View>
        )}
      </View>
      
      <View style={styles.mainInfo}>
        <Text style={styles.temperature}>{weather.temperature}°C</Text>
        <Text style={styles.description}>{weather.description}</Text>
      </View>
      
      <View style={styles.details}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Feels like</Text>
          <Text style={styles.detailValue}>{weather.feelsLike}°C</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Humidity</Text>
          <Text style={styles.detailValue}>{weather.humidity}%</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Wind</Text>
          <Text style={styles.detailValue}>{weather.windSpeed} km/h</Text>
        </View>
      </View>

      {!isUsingUserLocation && (
        <Pressable 
          style={styles.locationButton} 
          onPress={handleLocationRequest}
          disabled={isRequestingLocation}
        >
          <IconSymbol 
            name="location" 
            size={16} 
            color={colors.primary} 
          />
          <Text style={styles.locationButtonText}>
            {isRequestingLocation ? 'Getting location...' : 'Use my location'}
          </Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 200,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
    marginLeft: 8,
  },
  locationIconButton: {
    padding: 4,
  },
  locationInfo: {
    marginBottom: 16,
  },
  locationText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  locationIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIndicatorText: {
    fontSize: 12,
    color: colors.success,
    marginLeft: 4,
    fontWeight: '500',
  },
  mainInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  temperature: {
    fontSize: 48,
    fontWeight: '300',
    color: colors.primary,
    marginBottom: 4,
  },
  description: {
    fontSize: 16,
    color: colors.textSecondary,
    textTransform: 'capitalize',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  detailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.backgroundSecondary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  locationButtonText: {
    fontSize: 14,
    color: colors.primary,
    marginLeft: 6,
    fontWeight: '500',
  },
});
