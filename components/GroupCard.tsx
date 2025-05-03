import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type CardGroupProps = {
  id: number;
  nombre: string;
  descripcion: string;
};

const CardGroup: React.FC<CardGroupProps> = ({ id, nombre, descripcion }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{nombre}</Text>
      <Text style={styles.id}>ID: {id}</Text>
      <Text style={styles.description}>{descripcion}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  id: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#333',
  },
});

export default CardGroup;
