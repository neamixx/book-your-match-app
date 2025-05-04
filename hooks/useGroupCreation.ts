import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

type CreateGroupParams = {
  name: string;
  description: string;
  data_ini: string;
  data_fi: string;
  city: string;
  num_mem: number;
};

export function useGroupCreation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createGroup = async ({
    name,
    description,
    data_ini,
    data_fi,
    city,
    num_mem,
  }: CreateGroupParams) => {
    setLoading(true);
    setError(null);

    const apiUrl = Constants.expoConfig?.extra?.API_URL;
    const email = await AsyncStorage.getItem("userEmail");

    if (!email) {
      setError("No hi ha email d'usuari.");
      setLoading(false);
      return null;
    }

    try {
      const response = await fetch(
        `${apiUrl}/groups/create?email=${email}&ori=${city}&`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            num_mem,
            description,
            data_ini,
            data_fi,
            name,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error creant el grup");
      }

      const data = await response.json();

      setLoading(false);
      return data; // Aquest data contindrà l'id o el que retorni l'API
    } catch (err) {
      console.error(err);
      setError("Error de connexió o creació");
      setLoading(false);
      return false;
    }
  };

  return { createGroup, loading, error };
}
