import { useEffect, useState } from "react";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useCities() {
  const [cities, setCities] = useState<string[]>([]);
  const apiUrl = Constants.expoConfig?.extra?.API_URL;

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch(`${apiUrl}/city/all`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Map city names
        const cityNames = data.map((city: any) => city.name);
        setCities(cityNames);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCities();
  }, []);

  return { cities };
}
