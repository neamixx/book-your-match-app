import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Clipboard,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ClipboardAPI from "expo-clipboard";

type InvitationModalProps = {
  visible: boolean;
  code: string | number;
  onClose: () => void;
};

export default function InvitationModal({
  visible,
  code,
  onClose,
}: InvitationModalProps) {
  const copyToClipboard = () => {
    ClipboardAPI.setStringAsync(code.toString());
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Convida els teus amics!</Text>
          <Text style={styles.subtitle}>
            Envia aquest codi perquè s'uneixin:
          </Text>

          <View style={styles.codeContainer}>
            <Text style={styles.code}>{code}</Text>
            <TouchableOpacity onPress={copyToClipboard}>
              <Ionicons name="copy-outline" size={24} color="#2196F3" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Tancar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 12,
    width: "80%",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
    textAlign: "center",
  },
  codeContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  code: {
    fontSize: 24,
    fontWeight: "bold",
    marginRight: 10,
  },
  closeButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  closeText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
