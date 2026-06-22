// src/screens/PokemonDetailsScreen.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";

import { RootStackParamList } from "../types/Navigation";
import { Pokemon } from "../types/Pokemon";
import { getPokemonById } from "../services/api";
import { capitalize } from "../utils/format";
import { useFavorites } from "../context/FavoritesContext";

// Tipamos a rota para saber que dentro de 'params' existe um 'pokemonId' numérico
type PokemonDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  "PokemonDetails"
>;

export const PokemonDetailsScreen = () => {
  const route = useRoute<PokemonDetailsScreenRouteProp>();
  const { pokemonId } = route.params;

  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Consumimos o contexto de favoritos: precisamos saber se o Pokémon exibido
  // é favorito e permitir alternar o estado a partir desta tela.
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const details = await getPokemonById(pokemonId);
        setPokemon(details);
      } catch (err) {
        setError("Falha ao carregar detalhes do Pokémon.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [pokemonId]);

  if (isLoading) {
    return (
      <ActivityIndicator size="large" color="#0000ff" style={styles.centered} />
    );
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  if (!pokemon) {
    return <Text style={styles.centered}>Pokémon não encontrado.</Text>;
  }

  const favorite = isFavorite(pokemon.id);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: pokemon.image }} style={styles.image} />
      <Text style={styles.name}>{capitalize(pokemon.name)}</Text>
      <Text style={styles.idText}>ID: #{pokemon.id}</Text>

      <View style={styles.typesContainer}>
        <Text style={styles.sectionTitle}>Tipos:</Text>
        {/* Renderiza dinamicamente as "pílulas" de tipo (ex: Grass, Poison) */}
        {pokemon.types.map((type) => (
          <Text key={type} style={styles.typeText}>
            {capitalize(type)}
          </Text>
        ))}
      </View>

      {/* Botão de favoritar/Desfavoritar.
          Usamos o mesmo toggle do contexto: o estado e o ícone refletem
          instantaneamente a fonte da verdade global (FavoritesProvider). */}
      <TouchableOpacity
        style={[styles.favoriteButton, favorite && styles.favoriteButtonActive]}
        onPress={() => toggleFavorite(pokemon)}
      >
        <Text
          style={[
            styles.favoriteButtonText,
            favorite && styles.favoriteButtonTextActive,
          ]}
        >
          {favorite ? "❤️ Remover dos Favoritos" : "🤍 Adicionar aos Favoritos"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "red",
    fontSize: 16,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 16,
    backgroundColor: "#f0f0f0",
    borderRadius: 100,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  idText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },
  typesContainer: {
    marginBottom: 16,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
  },
  typeText: {
    fontSize: 16,
    marginHorizontal: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: "#ddd",
    borderRadius: 8,
    marginBottom: 4,
    overflow: "hidden",
  },
  favoriteButton: {
    marginTop: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "#e63946",
    backgroundColor: "#fff",
  },
  favoriteButtonActive: {
    backgroundColor: "#e63946",
  },
  favoriteButtonText: {
    color: "#e63946",
    fontWeight: "bold",
    fontSize: 16,
  },
  // Quando o botão está ativo (fundo vermelho), o texto precisa ficar branco
  // para manter o contraste e a legibilidade.
  favoriteButtonTextActive: {
    color: "#fff",
  },
});
