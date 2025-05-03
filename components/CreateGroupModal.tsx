import React, { useState } from "react";
import { Modal, View, Text, TextInput, Button, StyleSheet } from "react-native";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

type CreateGroupModalProps = {
  visible: boolean;
  onClose: () => void;
  onCreated: () => void;
};

export default function CreateGroupModal({
  visible,
  onClose,
  onCreated,
}: CreateGroupModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const createGroup = async () => {
    if (!name) {
      alert("Posa un nom al grup");
      return;
    }

    const apiUrl = Constants.expoConfig?.extra?.API_URL;
    const email = await AsyncStorage.getItem("userEmail");

    try {
      const response = await fetch(`${apiUrl}/groups/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, email }),
      });

      if (response.ok) {
        alert("Grup creat!");
        onCreated();
        setName("");
        setDescription("");
      } else {
        alert("Error creant el grup");
      }
    } catch (err) {
      console.error(err);
      alert("Error de connexió");
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Crear nou grup</Text>
          <TextInput
            placeholder="Nom"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            placeholder="Descripció"
            style={styles.input}
            value={description}
            onChangeText={setDescription}
          />
          <Button title="Crear" onPress={createGroup} />
          <Button title="Cancel·lar" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 12,
    width: "80%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
});
