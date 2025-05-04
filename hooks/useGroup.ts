import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

const apiUrl = Constants.expoConfig?.extra?.API_URL;

type Group = {
  id: number;
  name: string;
  description: string;
  admin_id: number;
  state: string;
};
export function useGroup() {
  const [group, setGroup] = useState<Group>({
    id: 1,
    name: "Grup 1",
    description: "Descripció del grup 1",
    admin_id: 1,
    state: "active",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const state = false;
  const getFlights = async () => {
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
      //setGroups(data);
    } catch (err) {
      console.error(err);
      setError("Error carregant els grups");
    } finally {
      setLoading(false);
    }
  };

  return { group, loading, error, getFlights, state };
}
