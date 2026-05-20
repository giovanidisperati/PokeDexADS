// src/screens/PokemonDetailsScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const PokemonDetailsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Detalhes do Pokémon em breve!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});