import React, { useState, useRef, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { useJoiningGroup } from "@/hooks/useJoiningGroup";
import { useCities } from "@/hooks/useCities";

type CreateJoinGroupProps = {
  visible: boolean;
  onClose: () => void;
  onCreatePressed: () => void;
};

export default function CreateJoinGroup({
  visible,
  onClose,
  onCreatePressed,
}: CreateJoinGroupProps) {
  const { cities } = useCities();
  const [joinCode, setJoinCode] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const cityInputRef = useRef<View>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  const { joinGroup } = useJoiningGroup();
  const [cityPickerVisible, setCityPickerVisible] = useState(false);

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
  const handleNumberFocus = () => {
    if (cityInputRef.current) {
      cityInputRef.current.measure((x, y, width, height, pageX, pageY) => {
        const screenHeight = Dimensions.get("window").height;
        const keyboardHeight = Platform.OS === "ios" ? 300 : 250; // Estimated keyboard height
        const availableSpace = screenHeight - pageY - height - keyboardHeight;

        // Scroll to make sure the input is visible
        setTimeout(() => {
          if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({
              y: pageY - 10, // Scroll to position the input in view with some margin
              animated: true,
            });
          }
        }, 100);
      });
    }
  };
  const handleCityFocus = () => {
    // Measure the position of the input to determine if we have enough space below
    if (cityInputRef.current) {
      cityInputRef.current.measure((x, y, width, height, pageX, pageY) => {
        const screenHeight = Dimensions.get("window").height;
        const keyboardHeight = Platform.OS === "ios" ? 300 : 250; // Estimated keyboard height
        const availableSpace = screenHeight - pageY - height - keyboardHeight;

        // Scroll to make sure the input is visible
      });
    }

    setShowCityDropdown(true);
  };
  const handleCityUnFocus = () => {
    // Hide the dropdown and reset the scroll position
    setShowCityDropdown(false);
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        y: 0, // Reset to the top of the scroll view
        animated: true,
      });
    }
  };
  const handleJoinExistingGroup = async () => {
    try {
      if (!city.trim()) {
        Alert.alert("Error", "Please select a city");
        return;
      }

      setCityPickerVisible(true);
      const success = await joinGroup(parseInt(joinCode, 10), city);

      if (success) {
        console.log("Joining group with code:", joinCode, "City:", city);
        onClose();
      }
    } catch (error) {
      Alert.alert("Error", "No s'ha pogut unir al grup. Intenta-ho de nou.");
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.headerContainer}>
                <LinearGradient
                  colors={["#2196F3", "#0D47A1"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.headerGradient}
                >
                  <Text style={styles.headerTitle}>Travel group</Text>
                </LinearGradient>
              </View>

              <ScrollView
                ref={scrollViewRef}
                contentContainerStyle={styles.scrollViewContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={true}
              >
                <View style={styles.contentContainer}>
                  <View style={styles.illustrationContainer}>
                    <Feather name="users" size={60} color="#2196F3" />
                  </View>

                  <Text style={styles.emptyText}>
                    Create a new group and invite your friends
                  </Text>

                  <TouchableOpacity
                    onPress={() => {
                      onClose();
                      onCreatePressed();
                    }}
                    style={styles.buttonWrapper}
                  >
                    <LinearGradient
                      colors={["#2196F3", "#0D47A1"]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.button}
                    >
                      <Text style={styles.buttonText}>Create group</Text>
                    </LinearGradient>
                  </TouchableOpacity>

                  <View style={styles.divider}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerText}>Or</Text>
                    <View style={styles.dividerLine} />
                  </View>

                  <Text style={styles.emptyText}>Join with a code</Text>

                  <View style={styles.inputContainer}>
                    <Feather
                      name="hash"
                      size={20}
                      color="#2196F3"
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Insert the code"
                      keyboardType="numeric"
                      maxLength={6}
                      value={joinCode}
                      onChangeText={setJoinCode}
                      placeholderTextColor="#A0A0A0"
                      onFocus={handleNumberFocus}
                    />
                  </View>

                  {/* City selector input */}

                  <View style={styles.inputContainer} ref={cityInputRef}>
                    <Feather
                      name="map"
                      size={20}
                      color="#2196F3"
                      style={styles.inputIcon}
                    />
                    <TextInput
                      placeholder="Enter departure city"
                      style={styles.input}
                      value={city}
                      onChangeText={handleCityChange}
                      onFocus={handleCityFocus}
                      onBlur={handleCityUnFocus}
                      placeholderTextColor="#A0A0A0"
                    />
                  </View>

                  {showCityDropdown && filteredCities.length > 0 && (
                    <View style={styles.dropdownContainer}>
                      <ScrollView
                        nestedScrollEnabled={true}
                        keyboardShouldPersistTaps="handled"
                        style={styles.dropdownScroll}
                      >
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
                      </ScrollView>
                    </View>
                  )}

                  <TouchableOpacity
                    onPress={handleJoinExistingGroup}
                    style={styles.buttonWrapper}
                  >
                    <LinearGradient
                      colors={["#2196F3", "#0D47A1"]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.button}
                    >
                      <Text style={styles.buttonText}>Join group</Text>
                    </LinearGradient>
                  </TouchableOpacity>

                  {/* Add extra space at the bottom for keyboard */}
                  <View style={styles.keyboardSpacer} />
                </View>
              </ScrollView>

              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Feather name="x" size={24} color="#666" />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 16,
  },
  modalContent: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    width: "100%",
    maxWidth: 450,
    maxHeight: "90%",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 10,
    position: "relative",
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  headerContainer: {
    width: "100%",
  },
  headerGradient: {
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
  },
  contentContainer: {
    padding: 24,
    alignItems: "center",
  },
  illustrationContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(33, 150, 243, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  emptyText: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    marginBottom: 16,
  },
  buttonWrapper: {
    width: "100%",
    marginBottom: 24,
  },
  button: {
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#2196F3",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#EEEEEE",
  },
  dividerText: {
    marginHorizontal: 16,
    color: "#999999",
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    marginBottom: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    width: "100%",
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333333",
    minHeight: 24,
  },
  closeButton: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  // City selector styles
  cityLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  cityLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  dropdownContainer: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 8,
    width: "100%",
    marginTop: -20,
    marginBottom: 20,
    maxHeight: 200,
    zIndex: 1000,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dropdownScroll: {
    maxHeight: 200,
  },
  keyboardSpacer: {
    height: 100, // Extra space at the bottom when keyboard is open
  },
});
