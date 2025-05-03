import React from "react";
import { View, Text, StyleSheet } from "react-native";

type CardGroupProps = {
  id: number;
  name: string;
  description: string;
};

export default function CardGroup({ id, name, description }: CardGroupProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderWidth: 0,
    borderColor: "#EEEEEE",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#666666",
  },
});
