import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

export function useJoiningGroup() {
  const apiUrl = Constants.expoConfig?.extra?.API_URL;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const joinGroup = async (groupId: number): Promise<boolean> => {
    const email = await AsyncStorage.getItem("userEmail");

    if (!email) {
      alert("No hi ha email guardat");
      return false;
    }

    setLoading(true);
    setError(null);
    //console.log(groupId, email);

    try {
      const response = await fetch(
        `${apiUrl}/groups/join?group_id=${groupId}&email=${email}&ori=Barna`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error("Error unint-se al grup");
      }

      setLoading(false);
      return true; // ✅ SUCCESS
    } catch (err) {
      console.error(err);
      setError("Error unint-se al grup");
      alert("Error unint-se al grup");
      setLoading(false);
      return false; // ❌ ERROR
    }
  };

  return { joinGroup, loading, error };
}
