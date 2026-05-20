// import React from 'react';
// import { View, Text, Image, StyleSheet } from 'react-native';
// import { Pokemon } from '../types/Pokemon';
// import { capitalize } from '../utils/format'; // <-- NOVO IMPORT

// interface Props {
//   pokemon: Pokemon;
// }

// export const PokemonCard = ({ pokemon }: Props) => {
//   return (
//     <View style={styles.card}>
//       <Image source={{ uri: pokemon.image }} style={styles.image} />
//       {/* Aplicação da função capitalize aqui: */}
//       <Text style={styles.name}>{capitalize(pokemon.name)}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   card: {
//     flex: 1,
//     backgroundColor: '#e0e0e0',
//     margin: 8,
//     padding: 12,
//     borderRadius: 12,
//     alignItems: 'center',
//   },
//   image: { width: 80, height: 80 },
//   name: { marginTop: 8, fontWeight: 'bold' },
// });

import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Pokemon } from "../types/Pokemon";
import { capitalize } from "../utils/format";
import { RootStackParamList } from "../types/Navigation";

interface Props {
  pokemon: Pokemon;
}

type PokemonCardNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "PokemonDetails"
>;

export const PokemonCard = ({ pokemon }: Props) => {
  const navigation = useNavigation<PokemonCardNavigationProp>();

  const handlePress = () => {
    navigation.navigate("PokemonDetails", { pokemonId: pokemon.id });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.touchableCard}>
      <View style={styles.cardInner}>
        <Image source={{ uri: pokemon.image }} style={styles.image} />
        <Text style={styles.name}>{capitalize(pokemon.name)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchableCard: {
    flex: 1,
    margin: 8,
  },
  cardInner: {
    backgroundColor: "#e0e0e0",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    flex: 1,
  },
  image: { width: 80, height: 80 },
  name: { marginTop: 8, fontWeight: "bold" },
});
