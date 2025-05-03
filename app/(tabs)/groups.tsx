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

const GroupsScreen: React.FC = () => {
  const { groups, loading, error, refetch } = useGroups();
  const { joinGroup } = useJoiningGroup();
  const [joinCode, setJoinCode] = useState<string>("");
  const [modalVisible, setModalVisible] = useState(false);
  const [invitationModalVisible, setInvitationModalVisible] = useState(false);

  const handleClosingModal = async () => {
    console.log("xd");
    setModalVisible(false);
    refetch();
    setInvitationModalVisible(true);
  };

  const handleJoinExistingGroup = async () => {
    const success = await joinGroup(parseInt(joinCode, 10));

    if (success) {
      alert("T'has unit al grup!");
      refetch(); // 👈 Tornar a carregar els grups perquè surtin
      setJoinCode(""); // opcional, netejar el camp
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
        code={"04343"}
        onClose={() => setInvitationModalVisible(false)}
      />

      <CreateGroupModal
        visible={modalVisible}
        onCreated={handleClosingModal}
        refi={refetch}
        onClose={() => setModalVisible(false)}
      />

      {groups.length > 0 ? (
        <>
          <ScrollView style={{ flex: 1 }}>
            {groups.map((group) => (
              <CardGroup
                key={group.id}
                id={group.id}
                name={group.name}
                description={group.description}
              />
            ))}
          </ScrollView>

          <TouchableOpacity
            style={styles.fabContainer}
            onPress={handleCreateGroup}
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
            Encara no estàs a cap grup. Crea'n un
          </Text>

          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <LinearGradient
              colors={["#2196F3", "#0D47A1"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Crear grup</Text>
            </LinearGradient>
          </TouchableOpacity>

          <Text style={styles.emptyText}>o uneix-te amb un codi!</Text>

          <TextInput
            style={styles.input}
            placeholder="Introdueix un codi (6 dígits)"
            keyboardType="numeric"
            maxLength={6}
            value={joinCode}
            onChangeText={setJoinCode}
          />

          <TouchableOpacity onPress={handleJoinExistingGroup}>
            <LinearGradient
              colors={["#2196F3", "#0D47A1"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Unir-se al grup</Text>
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
