import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

const apiUrl = Constants.expoConfig?.extra?.API_URL;

type Group = {
  id: number;
  name: string;
  description: string;
  admin_id: number;
};
export function useGroups() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGroups = async () => {
    const email = await AsyncStorage.getItem("userEmail");
    if (!email) return;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${apiUrl}/groups/by-user/${email}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: Group[] = await response.json();
      setGroups(data);
    } catch (err) {
      console.error(err);
      setError("Error carregant els grups");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  return { groups, loading, error, refetch: fetchGroups };
}
