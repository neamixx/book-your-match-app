import React, { useState } from "react";
import {
  View,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import CardGroup from "@/components/GroupCard";
import { useGroups } from "@/hooks/useGroups";
import CreateGroupModal from "@/components/CreateGroupModal";
import { useJoiningGroup } from "@/hooks/useJoiningGroup";
import InvitationModal from "@/components/InivationModal";
import { router } from "expo-router";
import CreateJoinModal from "@/components/CreateJoinGroup";
import { useCities } from "@/hooks/useCities";
import { useRef } from "react";
import { Feather, MaterialIcons } from "@expo/vector-icons";

const GroupsScreen: React.FC = () => {
  const { cities } = useCities();
  const [city, setCity] = useState("");
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const cityInputRef = useRef<View>(null);
  const { groups, loading, error, refetch } = useGroups();
  const { joinGroup } = useJoiningGroup();
  const [joinCode, setJoinCode] = useState<string>("");
  const [modalVisible, setModalVisible] = useState(false);
  const [invitationModalVisible, setInvitationModalVisible] = useState(false);
  const [shareCode, setShareCode] = useState(0);
  const [createJoinVisibility, setCreateJoinVisibility] = useState(false);

  const [selectedCity, setSelectedCity] = useState("");
  const handleCityChange = (text: string) => {
    setCity(text);
    if (text.length > 0) {
      const filtered = cities.filter((item) =>
        item.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredCities(filtered);
      setShowCityDropdown(true);
    } else {
      setFilteredCities([]);
      setShowCityDropdown(false);
    }
  };

  const handleCitySelect = (selectedCity: string) => {
    setCity(selectedCity);
    setShowCityDropdown(false);
  };

  const handleCityFocus = () => {
    if (city.length > 0) {
      setShowCityDropdown(true);
    }
  };

  const handleCityUnFocus = () => {
    setShowCityDropdown(false);
  };

  const handleCitySelected = (city: string) => {
    setSelectedCity(city);
    console.log(`Selected city: ${city}`);
  };

  const handleClosingModal = async () => {
    console.log("xd");
    setModalVisible(false);
    refetch();
    setInvitationModalVisible(true);
  };

  const handleJoinExistingGroup = async () => {
    if (joinCode !== null && joinCode !== "" && city !== null && city !== "") {
      const success = await joinGroup(parseInt(joinCode, 10), city);

      if (success) {
        refetch(); // 👈 Tornar a carregar els grups perquè surtin
        setJoinCode(""); // opcional, netejar el camp
      }
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleCreateGroup = () => {
    setModalVisible(true);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <InvitationModal
        visible={invitationModalVisible}
        code={shareCode}
        onClose={() => setInvitationModalVisible(false)}
      />

      <CreateGroupModal
        updateCode={setShareCode}
        visible={modalVisible}
        onCreated={handleClosingModal}
        refi={refetch}
        onClose={() => setModalVisible(false)}
      />

      <CreateJoinModal
        visible={createJoinVisibility}
        onClose={() => {
          refetch();
          setCreateJoinVisibility(false);
        }}
        onCreatePressed={() => {
          console.log("hola");
          refetch();
          setCreateJoinVisibility(false);
          setModalVisible(true);
        }}
      ></CreateJoinModal>

      {groups.length > 0 ? (
        <>
          <ScrollView style={{ flex: 1 }}>
            {groups.map((group) => (
              <CardGroup
                key={group.id}
                id={group.id}
                name={group.name}
                description={group.description}
                onPress={() => {
                  console.log(`Navegant al grup: ${group.name}`);
                  //router.push(`/group/${group.id}`);
                  router.push({
                    pathname: `/group/[id]`,
                    params: { id: group.id },
                  });
                }}
              />
            ))}
          </ScrollView>

          <TouchableOpacity
            style={styles.fabContainer}
            onPress={() => setCreateJoinVisibility(true)}
          >
            <LinearGradient
              colors={["#2196F3", "#0D47A1"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.fab}
            >
              <Text style={styles.fabText}>+</Text>
            </LinearGradient>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.center}>
          <Text style={styles.emptyText}>
            You're not in any group yet. Create one.
          </Text>

          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <LinearGradient
              colors={["#2196F3", "#0D47A1"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Create group</Text>
            </LinearGradient>
          </TouchableOpacity>

          <Text style={styles.emptyText}>or join with a code!</Text>

          <TextInput
            style={styles.input}
            placeholder="Insert the code"
            keyboardType="numeric"
            maxLength={6}
            value={joinCode}
            onChangeText={setJoinCode}
          />

          {/* Destination section - now centered */}
          <View style={styles.destinationContainer}>
            <View style={styles.labelContainer}></View>

            <View style={styles.cityInputContainer} ref={cityInputRef}>
              <Feather
                name="map"
                size={20}
                color="#2196F3"
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Enter departure city"
                style={styles.cityInput}
                value={city}
                onChangeText={handleCityChange}
                onFocus={handleCityFocus}
                onBlur={handleCityUnFocus}
                placeholderTextColor="#A0A0A0"
              />
            </View>

            {showCityDropdown && filteredCities.length > 0 && (
              <View style={styles.dropdownContainer}>
                {filteredCities.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleCitySelect(item)}
                    style={{
                      padding: 12,
                      borderBottomWidth:
                        index === filteredCities.length - 1 ? 0 : 1,
                      borderBottomColor: "#eee",
                    }}
                  >
                    <Text>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          <TouchableOpacity onPress={handleJoinExistingGroup}>
            <LinearGradient
              colors={["#2196F3", "#0D47A1"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Join group</Text>
            </LinearGradient>
          </TouchableOpacity>

          {error && <Text style={{ color: "red" }}>{error}</Text>}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#ffffff",
  },
  emptyText: {
    fontSize: 18,
    color: "#666666",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#F5F5F5",
    borderWidth: 1,
    borderColor: "#EEEEEE",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: 220,
    fontSize: 16,
    color: "#333333",
    textAlign: "center",
    marginBottom: 12,
  },
  // New styles for destination and city input
  destinationContainer: {
    width: 220,
    alignItems: "center",
    marginBottom: 12,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 8,
  },
  cityInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderWidth: 1,
    borderColor: "#EEEEEE",
    borderRadius: 12,
    paddingHorizontal: 16,
    width: "100%",
  },
  cityInput: {
    paddingVertical: 12,
    fontSize: 16,
    color: "#333333",
    flex: 1,
  },
  inputIcon: {
    marginRight: 8,
  },
  dropdownContainer: {
    position: "absolute",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 8,
    top: 80,
    width: "100%",
    zIndex: 1000,
  },
  button: {
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    width: 220,
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#2196F3",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  fabContainer: {
    position: "absolute",
    right: 20,
    bottom: 20,
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#2196F3",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  fabText: {
    color: "#ffffff",
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default GroupsScreen;
