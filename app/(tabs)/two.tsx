import { StyleSheet } from "react-native";
import React, { useState, useEffect, useRef } from "react";

import { Text, View } from "@/components/Themed";
import Card from "@/components/Card";
import Constants from "expo-constants";

export default function TabTwoScreen() {
  const apiUrl = Constants.expoConfig?.extra?.API_URL;

  const [cards, setCards] = useState<
    { id: number; tittle: string; image: string }[]
  >([]);

  const countRef = useRef(0);

  const requestNewCard = async () => {
    try {
      const response = await fetch(`${apiUrl}/card`);
      const data = await response.json();
      return data;
    } catch {
      console.log("Failed to fetch card");
    }
  };

  useEffect(() => {
    const loadCards = async () => {
      // Fetch multiple cards before updating state
      const card1 = await requestNewCard();
      const card2 = await requestNewCard();
      const card3 = await requestNewCard();
      const card4 = await requestNewCard();

      // Now set all three cards in the state
      setCards([card1, card2, card3, card4]);
    };
    loadCards();
  }, []);

  const onExit = () => {
    const nc = async () => {
      const newCard = await requestNewCard();
      setCards((prev) => {
        const copy = [...prev];
        copy.pop();
        return [newCard, ...copy];
      });
    };
    setTimeout(nc, 100);
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          position: "absolute",
          top: 42,
          fontWeight: "700",
          fontSize: 32,
        }}
      >
        {" "}
        🔥Book your match🔥
      </Text>
      {cards.map((element, index) => (
        <Card
          key={(countRef.current += 1)}
          tittle={element.tittle}
          img={element.image}
          offset={0}
          onExit={onExit}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  button: {},
});
