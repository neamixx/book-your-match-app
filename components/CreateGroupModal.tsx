import React, { useState } from "react";
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
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import DatePicker from "./DatePicker";
import { useGroupCreation } from "@/hooks/useGroupCreation";

type CreateGroupModalProps = {
  visible: boolean;
  onClose: () => void;
  onCreated: () => void;
  refi: () => void;
};

export default function CreateGroupModal({
  visible,
  onClose,
  onCreated,
  refi,
}: CreateGroupModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [numPeople, setNumPeople] = useState("1");
  const { createGroup, loading, error } = useGroupCreation();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleGroupCreation = () => {
    const formattedIni = startDate?.toISOString().split("T")[0] ?? null;
    const formattedFi = endDate?.toISOString().split("T")[0] ?? null;
    if (formattedIni != null && formattedFi != null) {
      const result = createGroup({
        name: name,
        description: description,
        data_ini: formattedIni,
        data_fi: formattedFi,
      });

      if (result) {
        refi();
        console.log("Creat amb id:", result);
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
                <Text style={styles.headerTitle}>Crear nou grup</Text>
              </LinearGradient>
            </View>

            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.scrollViewContent}
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
                  <Text style={styles.dateSectionTitle}>Dates del viatge</Text>
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

              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
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
            </ScrollView>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
});
