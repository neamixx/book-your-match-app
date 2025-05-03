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
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { useGroups } from "@/hooks/useGroups";

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
  const [joinCode, setJoinCode] = useState<string>("");
  const { joinGroup } = useGroups();

  const handleJoinExistingGroup = async () => {
    if (joinCode.length !== 6) {
      Alert.alert("Error", "Si us plau, introdueix un codi de 6 dígits.");
      return;
    }

    try {
      // Assuming joinGroup is a function from useGroups hook
      // await joinGroup(joinCode);
      console.log("Joining group with code:", joinCode);
      onClose();
      // Show success message or navigate
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
                  <Text style={styles.headerTitle}>Grups de viatge</Text>
                </LinearGradient>
              </View>

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
                  />
                </View>

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
                    <Text style={styles.buttonText}>Unir-se al grup</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>

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
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 10,
    position: "relative",
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
});
