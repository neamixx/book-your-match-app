import React from "react";
import {
  StyleSheet,
  ImageBackground,
  ScrollView,
  Dimensions,
  View as RNView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import { BlurView } from "expo-blur";
import { Feather } from "@expo/vector-icons";

import FlightTicket from "@/components/FlightTicket";
import { View } from "@/components/Themed";
import { Text } from "@/components/Themed";
import { useGroup } from "@/hooks/useGroup";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

const GroupScreen: React.FC = () => {
  const { id } = useLocalSearchParams();
  const { state, group } = useGroup();
  const router = useRouter();
  if (!state) {
    return (
      <RNView style={styles.noDataContainer}>
        {/* Header */}
        <LinearGradient
          colors={["#2196F3", "#0D47A1"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.noDataHeader}
        >
          <Text style={styles.noDataHeaderTitle}>{group.name}</Text>
          <Text style={styles.noDataHeaderSubtitle}>{group.description}</Text>
        </LinearGradient>

        {/* Content */}
        <RNView style={styles.noDataContent}>
          <RNView style={styles.iconContainer}>
            <Feather name="info" size={48} color="#2196F3" />
          </RNView>

          <Text style={styles.noDataTitle}>More Information Needed</Text>

          <Text style={styles.noDataDescription}>
            We need more data from your group members to determine the best
            travel options for everyone.
          </Text>

          <RNView style={styles.suggestionsContainer}>
            <Text style={styles.suggestionsTitle}>What's missing?</Text>

            <Text style={styles.suggestionText}>
              We need you or your team members to swipe on more preferences to
              determin the best destination for your group{" "}
            </Text>
          </RNView>

          <TouchableOpacity
            onPress={() => {
              router.push("/(tabs)/swap");
            }}
          >
            <LinearGradient
              colors={["#2196F3", "#0D47A1"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.actionButton}
            >
              <Text style={styles.actionButtonText}>Go swaping</Text>
              <Feather
                name="arrow-right"
                size={18}
                color="#fff"
                style={styles.buttonIcon}
              />
            </LinearGradient>
          </TouchableOpacity>
        </RNView>
      </RNView>
    );
  }

  return (
    <RNView style={styles.container}>
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
        }}
        style={styles.backgroundImage}
      >
        <LinearGradient
          colors={[
            "rgba(255,255,255,0)",
            "rgba(255,255,255,0.3)",
            "rgba(255,255,255,0.7)",
            "rgba(255,255,255,1)",
          ]}
          locations={[0, 0.4, 0.7, 1]}
          style={styles.overlay}
        />

        <LinearGradient
          colors={["rgba(0,0,0,0.5)", "rgba(0,0,0,0.3)", "rgba(0,0,0,0)"]}
          locations={[0, 0.3, 0.5]}
          style={styles.textOverlay}
        />

        <RNView style={styles.contentContainer}>
          <RNView style={styles.titleContainer}>
            <RNView style={styles.titleTextContainer}>
              <Text style={styles.subtitle}>Travel Group</Text>
              <Text style={styles.title}>Barcelona Trip {id}</Text>
              <Text style={styles.description}>
                Your upcoming flights for this journey
              </Text>
            </RNView>
          </RNView>

          <RNView style={styles.ticketsContainer}>
            <RNView style={styles.ticketsHeader}>
              <Text style={styles.ticketsTitle}>Your Flights</Text>
            </RNView>

            <ScrollView
              style={styles.ticketsScroll}
              showsVerticalScrollIndicator={false}
            >
              <FlightTicket
                airlineLogo="https://logo.clearbit.com/iberia.com"
                departureTime="10:00"
                arrivalTime="12:00"
                departureAirport="BCN"
                arrivalAirport="MAD"
                duration="2h 0m"
                direct={true}
                price="€100"
                link="https://www.iberia.com/"
              />

              <FlightTicket
                airlineLogo="https://logo.clearbit.com/vueling.com"
                departureTime="18:30"
                arrivalTime="20:15"
                departureAirport="MAD"
                arrivalAirport="BCN"
                duration="1h 45m"
                direct={true}
                price="€85"
                link="https://www.vueling.com/"
              />
            </ScrollView>
          </RNView>
        </RNView>
      </ImageBackground>
    </RNView>
  );
};

const styles = StyleSheet.create({
  // Styles for state=true (with background image)
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  textOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "40%",
  },
  contentContainer: {
    flex: 1,
    paddingTop: 60,
  },
  titleContainer: {
    alignItems: "flex-end",
    paddingRight: 24,
    paddingTop: 20,
  },
  titleTextContainer: {},
  subtitle: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "500",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    marginTop: 4,
    marginBottom: 8,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  description: {
    fontSize: 14,
    color: "#ffffff",
    opacity: 0.9,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  ticketsContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginTop: 40,
  },
  ticketsHeader: {
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  ticketsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  ticketsScroll: {
    maxHeight: height * 0.6,
  },

  // Styles for state=false (no background image)
  noDataContainer: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  noDataHeader: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 24,
  },
  noDataHeaderTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 4,
  },
  noDataHeaderSubtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    fontWeight: "500",
  },
  noDataContent: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#2196F3",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  noDataTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
    textAlign: "center",
  },
  noDataDescription: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 22,
    paddingHorizontal: 16,
  },
  suggestionsContainer: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  suggestionsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
  },
  suggestionItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  suggestionIcon: {
    marginRight: 12,
    color: "#2196F3",
  },
  suggestionText: {
    fontSize: 15,
    color: "#444",
    lineHeight: 22,
  },
  actionButton: {
    flexDirection: "row",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#2196F3",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginRight: 8,
  },
  buttonIcon: {
    marginLeft: 4,
  },
});

export default GroupScreen;
