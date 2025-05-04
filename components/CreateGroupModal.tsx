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
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import DatePicker from "./DatePicker";
import { useGroupCreation } from "@/hooks/useGroupCreation";
import { useCities } from "@/hooks/useCities";

type CreateGroupModalProps = {
  visible: boolean;
  onClose: () => void;
  onCreated: () => void;
  refi: () => void;
  updateCode: React.Dispatch<React.SetStateAction<number>>;
};

// Sample cities array
const CITIES = ["Barcelona", "Madrid", "Valencia", "bb", "nasddsfdf"];

export default function CreateGroupModal({
  visible,
  onClose,
  onCreated,
  refi,
  updateCode,
}: CreateGroupModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [numPeople, setNumPeople] = useState(null);
  const { createGroup, loading, error } = useGroupCreation();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const { cities } = useCities();
  // City autocomplete state
  const [city, setCity] = useState("");
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<"bottom" | "top">(
    "bottom"
  );
  const scrollViewRef = useRef<ScrollView>(null);
  const cityInputRef = useRef<View>(null);

  // Filter cities based on input
  useEffect(() => {
    if (!cities?.length) return;

    if (city) {
      const filtered = cities.filter((item) =>
        item.toLowerCase().includes(city.toLowerCase())
      );
      setFilteredCities(filtered);
    } else {
      setFilteredCities([]);
    }
  }, [city, cities]);

  // Handle city input change
  const handleCityChange = (text: string) => {
    setCity(text);
    setShowCityDropdown(text.length > 0);
  };

  // Handle city selection
  const handleCitySelect = (selectedCity: string) => {
    setCity(selectedCity);
    setShowCityDropdown(false);
    Keyboard.dismiss();
  };

  // Handle focus on city input
  const handleCityFocus = () => {
    // Measure the position of the input to determine if we have enough space below
    if (cityInputRef.current) {
      cityInputRef.current.measure((x, y, width, height, pageX, pageY) => {
        const screenHeight = Dimensions.get("window").height;
        const keyboardHeight = Platform.OS === "ios" ? 300 : 250; // Estimated keyboard height
        const availableSpace = screenHeight - pageY - height - keyboardHeight;

        // If we don't have enough space below, show dropdown above
        if (availableSpace < 150) {
          setDropdownPosition("bottom");
        } else {
          setDropdownPosition("bottom");
        }

        // Scroll to make sure the input is visible
        setTimeout(() => {
          if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({
              y: pageY - 100, // Scroll to position the input in view with some margin
              animated: true,
            });
          }
        }, 100);
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

  const handleGroupCreation = async () => {
    const formattedIni = startDate?.toISOString().split("T")[0] ?? null;
    const formattedFi = endDate?.toISOString().split("T")[0] ?? null;
    if (formattedIni != null && formattedFi != null) {
      const data = await createGroup({
        name: name,
        description: description,
        data_ini: formattedIni,
        data_fi: formattedFi,
        city: city || "Barcelona",
        num_mem: Number(numPeople) || 1,
      });

      if (data) {
        console.log(data);
        console.log(data.id);
        updateCode(data.id);
        refi();
        onCreated();
      }
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
      >
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
            setShowCityDropdown(false);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.headerContainer}>
                <LinearGradient
                  colors={["#2196F3", "#0D47A1"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.headerGradient}
                >
                  <Text style={styles.headerTitle}>Crear nou grup</Text>
                </LinearGradient>
              </View>

              <ScrollView
                ref={scrollViewRef}
                style={styles.scrollView}
                contentContainerStyle={styles.scrollViewContent}
                keyboardShouldPersistTaps="handled"
              >
                <View style={styles.inputContainer}>
                  <Feather
                    name="users"
                    size={20}
                    color="#2196F3"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    placeholder="Nom del grup"
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholderTextColor="#A0A0A0"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Feather
                    name="file-text"
                    size={20}
                    color="#2196F3"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    placeholder="Descripció"
                    style={styles.input}
                    value={description}
                    onChangeText={setDescription}
                    placeholderTextColor="#A0A0A0"
                    multiline
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Feather
                    name="user-plus"
                    size={20}
                    color="#2196F3"
                    style={styles.inputIcon}
                  />
                  <Text style={styles.inputLabel}>Número de persones</Text>
                  <TextInput
                    style={styles.peopleInput}
                    keyboardType="numeric"
                    value={numPeople}
                    onChangeText={(text) => {
                      const numericValue = text.replace(/[^0-9]/g, "");
                      setNumPeople(numericValue);
                    }}
                    placeholder="1"
                    placeholderTextColor="#A0A0A0"
                  />
                </View>

                <View style={styles.dateSection}>
                  <View style={styles.dateSectionHeader}>
                    <Feather name="calendar" size={20} color="#2196F3" />
                    <Text style={styles.dateSectionTitle}>
                      Dates del viatge
                    </Text>
                  </View>

                  <View style={styles.datePickerContainer}>
                    <DatePicker
                      startDate={startDate}
                      endDate={endDate}
                      setStartDate={setStartDate}
                      setEndDate={setEndDate}
                    />
                  </View>
                </View>

                {/* City Autocomplete Section */}
                <View style={styles.citySection}>
                  <View style={styles.dateSectionHeader}>
                    <Feather name="map-pin" size={20} color="#2196F3" />
                    <Text style={styles.dateSectionTitle}>Destinació</Text>
                  </View>

                  <View style={styles.cityInputWrapper} ref={cityInputRef}>
                    {/* Show dropdown above input if needed */}
                    {showCityDropdown &&
                      filteredCities.length > 0 &&
                      dropdownPosition === "top" && (
                        <View style={styles.dropdownListTop}>
                          {filteredCities.map((item, index) => (
                            <TouchableOpacity
                              key={index}
                              style={[
                                styles.dropdownItem,
                                index === filteredCities.length - 1 &&
                                  styles.lastDropdownItem,
                              ]}
                              onPress={() => handleCitySelect(item)}
                            >
                              <Feather
                                name="map-pin"
                                size={16}
                                color="#2196F3"
                                style={styles.dropdownIcon}
                              />
                              <Text style={styles.dropdownText}>{item}</Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      )}

                    <View style={styles.inputContainer}>
                      <Feather
                        name="map"
                        size={20}
                        color="#2196F3"
                        style={styles.inputIcon}
                      />
                      <TextInput
                        placeholder=""
                        style={styles.input}
                        value={city}
                        onChangeText={handleCityChange}
                        onFocus={handleCityFocus}
                        onBlur={handleCityUnFocus}
                        placeholderTextColor="#A0A0A0"
                      />
                      {city ? (
                        <TouchableOpacity
                          onPress={() => setCity("")}
                          style={styles.clearButton}
                        >
                          <MaterialIcons
                            name="clear"
                            size={20}
                            color="#A0A0A0"
                          />
                        </TouchableOpacity>
                      ) : null}
                    </View>

                    {/* Show dropdown below input by default */}
                    {showCityDropdown &&
                      filteredCities.length > 0 &&
                      dropdownPosition === "bottom" && (
                        <View style={styles.dropdownListBottom}>
                          {filteredCities.map((item, index) => (
                            <TouchableOpacity
                              key={index}
                              style={[
                                styles.dropdownItem,
                                index === filteredCities.length - 1 &&
                                  styles.lastDropdownItem,
                              ]}
                              onPress={() => handleCitySelect(item)}
                            >
                              <Feather
                                name="map-pin"
                                size={16}
                                color="#2196F3"
                                style={styles.dropdownIcon}
                              />
                              <Text style={styles.dropdownText}>{item}</Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      )}
                  </View>
                </View>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={onClose}
                    style={styles.cancelButton}
                  >
                    <Text style={styles.cancelButtonText}>Cancel·lar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={handleGroupCreation}>
                    <LinearGradient
                      colors={["#2196F3", "#0D47A1"]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.createButton}
                    >
                      <Text style={styles.createButtonText}>Crear</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>

                {error && <Text style={styles.errorText}>{error}</Text>}

                {/* Add extra space at the bottom for keyboard */}
                <View style={styles.keyboardSpacer} />
              </ScrollView>
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
  scrollView: {
    width: "100%",
  },
  scrollViewContent: {
    padding: 24,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#EEEEEE",
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
  inputLabel: {
    fontSize: 16,
    color: "#333333",
    flex: 1,
  },
  peopleInput: {
    width: 60,
    fontSize: 16,
    color: "#333333",
    textAlign: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  dateSection: {
    marginBottom: 20,
  },
  citySection: {
    marginBottom: 20,
    zIndex: 1000,
  },
  dateSectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  dateSectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
    marginLeft: 12,
  },
  datePickerContainer: {
    width: "100%",
    paddingHorizontal: 4,
  },
  cityInputWrapper: {
    position: "relative",
    zIndex: 1000,
  },
  dropdownListBottom: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EEEEEE",
    borderRadius: 12,
    marginTop: -8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    maxHeight: 150,
    zIndex: 1000,
  },
  dropdownListTop: {
    position: "absolute",
    bottom: "100%",
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EEEEEE",
    borderRadius: 12,
    marginBottom: -8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    maxHeight: 150,
    zIndex: 1000,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  lastDropdownItem: {
    borderBottomWidth: 0,
  },
  dropdownIcon: {
    marginRight: 12,
  },
  dropdownText: {
    fontSize: 16,
    color: "#333333",
  },
  clearButton: {
    padding: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    backgroundColor: "#FFFFFF",
  },
  cancelButtonText: {
    color: "#666666",
    fontSize: 16,
    fontWeight: "600",
  },
  createButton: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 12,
    shadowColor: "#2196F3",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  createButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "#FF3B30",
    marginTop: 12,
    textAlign: "center",
  },
  keyboardSpacer: {
    height: 100, // Extra space at the bottom when keyboard is open
  },
});
