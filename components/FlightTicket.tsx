import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as Linking from "expo-linking";

type FlightCardProps = {
  airlineLogo: string;
  departureTime: string;
  arrivalTime: string;
  departureAirport: string;
  arrivalAirport: string;
  direct: boolean;
  price: string;
  link: string; // Link extern (pàgina web)
};

export default function FlightTicket({
  airlineLogo,
  departureTime,
  arrivalTime,
  departureAirport,
  arrivalAirport,
  direct,
  price,
  link,
}: FlightCardProps) {
  const handlePress = async () => {
    const supported = await Linking.canOpenURL(link);
    if (supported) {
      Linking.openURL(link);
    } else {
      alert("Aquest enllaç no és vàlid");
    }
  };

  return (
    <Pressable style={styles.card} onPress={handlePress}>
      <View style={styles.airlineRow}>
        <Image source={{ uri: airlineLogo }} style={styles.logo} />
      </View>

      <View style={styles.flightInfoRow}>
        <View style={styles.timeBlock}>
          <Text style={styles.time}>{departureTime}</Text>
          <Text style={styles.airport}>{departureAirport}</Text>
        </View>

        <View style={styles.flightPathContainer}>
          <View style={styles.flightPath}>
            <View style={styles.line} />
            <View style={styles.planeContainer}>
              <MaterialIcons name="flight" size={16} color="#666" />
            </View>
          </View>

          <View style={styles.directContainer}>
            <Text style={styles.direct}>
              {direct ? "Directe" : "Amb escales"}
            </Text>
          </View>
        </View>

        <View style={styles.timeBlock}>
          <Text style={styles.time}>{arrivalTime}</Text>
          <Text style={styles.airport}>{arrivalAirport}</Text>
        </View>
      </View>

      <View style={styles.priceContainer}>
        <Text style={styles.price}>{price}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 10,
    margin: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 3,
  },
  airlineRow: {
    alignItems: "center",
    marginBottom: 16,
  },
  logo: {
    width: 32,
    height: 32,
    borderRadius: 6,
  },
  flightInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  timeBlock: {
    alignItems: "center",
    width: 80,
  },
  time: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginBottom: 4,
  },
  airport: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  flightPathContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  durationContainer: {
    marginBottom: 6,
  },
  duration: {
    fontSize: 12,
    color: "#999",
    fontWeight: "500",
  },
  flightPath: {
    width: "100%",
    height: 24,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  line: {
    height: 1,
    backgroundColor: "#ddd",
    width: "100%",
    position: "absolute",
  },
  planeContainer: {
    backgroundColor: "#fff",
    padding: 4,
    borderRadius: 12,
    transform: [{ rotate: "90deg" }],
  },
  directContainer: {
    marginTop: 6,
  },
  direct: {
    fontSize: 12,
    color: "#2E7D32",
    fontWeight: "500",
  },
  priceContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
});
