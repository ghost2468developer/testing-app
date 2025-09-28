
import * as Location from 'expo-location';

export interface LocationData {
  latitude: number;
  longitude: number;
  city?: string;
  country?: string;
}

export const requestLocationPermission = async (): Promise<boolean> => {
  try {
    console.log('Requesting location permission...');
    const { status } = await Location.requestForegroundPermissionsAsync();
    
    if (status !== 'granted') {
      console.log('Location permission denied');
      return false;
    }
    
    console.log('Location permission granted');
    return true;
  } catch (error) {
    console.error('Error requesting location permission:', error);
    return false;
  }
};

export const getCurrentLocation = async (): Promise<LocationData | null> => {
  try {
    console.log('Getting current location...');
    
    // Check if location services are enabled
    const enabled = await Location.hasServicesEnabledAsync();
    if (!enabled) {
      console.log('Location services are disabled');
      return null;
    }

    // Get current position
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
      timeInterval: 10000,
      distanceInterval: 1000,
    });

    console.log('Location obtained:', location.coords);

    // Try to get address information
    try {
      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      const locationData: LocationData = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        city: address[0]?.city || address[0]?.subregion || 'Unknown',
        country: address[0]?.country || 'Unknown',
      };

      console.log('Location data with address:', locationData);
      return locationData;
    } catch (addressError) {
      console.log('Could not get address, returning coordinates only:', addressError);
      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
    }
  } catch (error) {
    console.error('Error getting current location:', error);
    return null;
  }
};

export const getLocationWithPermission = async (): Promise<LocationData | null> => {
  const hasPermission = await requestLocationPermission();
  if (!hasPermission) {
    return null;
  }
  
  return await getCurrentLocation();
};
