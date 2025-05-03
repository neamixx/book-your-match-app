import React, { useEffect, useState } from 'react';
import { View, ScrollView, ActivityIndicator, StyleSheet, Text } from 'react-native';
import CardGroup from '@/components/GroupCard'; 

type Group = {
  id: number;
  nombre: string;
  descripcion: string;
};

const GroupsScreen: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch('https://0.0.0.0:8000/');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Group[] = await response.json();
        setGroups(data);
      } catch (err) {
        setError('Error al cargar los grupos');
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      {groups.map((group) => (
        <CardGroup
          key={group.id}
          id={group.id}
          nombre={group.nombre}
          descripcion={group.descripcion}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default GroupsScreen;
