import React, { useState } from "react";
import {
  View,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import CardGroup from "@/components/GroupCard";
import { useGroups } from "@/hooks/useGroups";

const GroupsScreen: React.FC = () => {
  const { groups, loading, error, refetch } = useGroups();
  const [joinCode, setJoinCode] = useState<string>("");

  const handleJoinGroup = () => {
    if (joinCode.length !== 6) {
      alert("El codi ha de tenir 6 dígits");
      return;
    }
    alert(`Intentant unir-te amb el codi: ${joinCode}`);
  };

  const handleCreateGroup = () => {
    alert("Crear un nou grup");
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
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
          <TouchableOpacity style={styles.fab} onPress={handleCreateGroup}>
            <Text style={styles.fabText}>+</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.center}>
          <Text style={styles.emptyText}>
            Encara no estàs a cap grup. Crea'n un o uneix-te amb un codi!
          </Text>
          <Button title="Crear grup" onPress={handleCreateGroup} />
          <TextInput
            style={styles.input}
            placeholder="Introdueix un codi (6 dígits)"
            keyboardType="numeric"
            maxLength={6}
            value={joinCode}
            onChangeText={setJoinCode}
          />
          <Button title="Unir-se al grup" onPress={handleJoinGroup} />
          {error && <Text style={{ color: "red" }}>{error}</Text>}
          <Button title="Torna a carregar" onPress={refetch} />
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
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#CCCCCC",

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
