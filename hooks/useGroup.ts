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

type Flight = {
  id: string;
  price: number;
  link: string;
  departureDatetime: string;
  arrivalDatetime: string;
  company: string;
  origin: string;
  destination: string;
  stops: number;
  city: string;
  image_path: string;
};

export function useGroup(id: number) {
  const [group, setGroup] = useState<Group | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [state, setState] = useState("");
  const [flights, setFlights] = useState<Flight[]>([]);

  const [data, setData] = useState({
    data_ini: "",
    data_fi: "",
    city: "",
    num_mem: 0,
    description: "",
    name: "",
    state: "",
  });
  const fetchGroup = async () => {
    const email = await AsyncStorage.getItem("userEmail");
    if (!email) return;

    setLoading(true);
    setError(null);

    try {
      console.log(id);
      const response = await fetch(`${apiUrl}/groups/group/${id}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setData(data);
      setGroup(data);
    } catch (err) {
      console.error(err);
      setError("Error carregant el grup");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroup();
    if (data.state == "READY") {
      console.log("state", data.state);
      getFlights();
    }
  }, [id, data.state]);

  const getFlights = async () => {
    const email = await AsyncStorage.getItem("userEmail");
    console.log("email", email);
    console.log("id", id);
    setLoading(true);
    setError(null);

    try {
      const json = JSON.stringify({
        group_id: id,
        email: email,
      });
      console.log("json", json);
      const response = await fetch(`${apiUrl}/skyscanner/cheapest-flights`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: json,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      const flight1 = data;
      setFlights((d) => data.cheapest_flights);
    } catch (err) {
      console.error(err);
      setError("Error carregant els vols");
    } finally {
      setLoading(false);
    }
  };
  const flight2 = flights[1] || null;
  const flight1 = flights[0];
  console.log(flight1);
  return {
    group,
    loading,
    error,
    getFlights,
    flights,
    state: data.state === "READY" ? true : false,
    flight1,
    flight2,
  };
}
