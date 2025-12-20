'use client';

export interface WeatherData {
  location: string;
  temperature: number;
  isDay: boolean;
}

export async function getWeatherData(): Promise<WeatherData | null> {
  try {
    // Get user's geolocation
    const position = await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      });
    });

    const { latitude, longitude } = position.coords;

    // Get weather from Open-Meteo API
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,is_day&timezone=auto`
    );

    if (!response.ok) {
      throw new Error('Weather API error');
    }

    const data = await response.json();
    
    // Get location name via reverse geocoding
    const geoResponse = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=vi`
    );
    
    let locationName = 'Việt Nam';
    if (geoResponse.ok) {
      const geoData = await geoResponse.json();
      locationName = geoData.city || geoData.locality || geoData.countryName || 'Việt Nam';
    }

    return {
      location: locationName,
      temperature: Math.round(data.current.temperature_2m),
      isDay: data.current.is_day === 1
    };
  } catch (error) {
    console.error('Error getting weather:', error);
    return null;
  }
}

export function getDayIcon(isDay: boolean): string {
  return isDay ? '/images/icons/icon-day.svg' : '/images/icons/icon-night.png';
}

// Check if it's day based on current time
export function checkIsDay(): boolean {
  const hour = new Date().getHours();
  return hour >= 6 && hour < 18;
}

