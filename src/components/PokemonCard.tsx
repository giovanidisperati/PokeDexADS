// src/components/PokemonCard.tsx
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Pokemon } from "../types/Pokemon";
import { capitalize } from "../utils/format";
import { RootStackParamList } from "../types/Navigation";
import { useFavorites } from "../context/FavoritesContext";

interface Props {
  pokemon: Pokemon;
}

type PokemonCardNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "PokemonDetails"
>;

export const PokemonCard = ({ pokemon }: Props) => {
  const navigation = useNavigation<PokemonCardNavigationProp>();
  // Acessamos o estado global de favoritos para saber se este card está
  // favoritado e para permitir alternar (toggle) com um toque no coração.
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(pokemon.id);

  const handlePress = () => {
    navigation.navigate("PokemonDetails", { pokemonId: pokemon.id });
  };

  // Impede que o toque no coração "vaze" para o TouchableOpacity do card
  // (que dispararia a navegação para a tela de detalhes).
  const handleFavoritePress = () => {
    toggleFavorite(pokemon);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.touchableCard}>
      <View style={styles.cardInner}>
        {/* Botão de favorito posicionado no canto superior direito do card. */}
        <TouchableOpacity
          onPress={handleFavoritePress}
          style={styles.favoriteButton}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text style={styles.favoriteIcon}>{favorite ? "❤️" : "🤍"}</Text>
        </TouchableOpacity>

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
  favoriteButton: {
    position: "absolute",
    top: 4,
    right: 4,
    zIndex: 1,
    padding: 4,
  },
  favoriteIcon: {
    fontSize: 18,
  },
  image: { width: 80, height: 80 },
  name: { marginTop: 8, fontWeight: "bold" },
});