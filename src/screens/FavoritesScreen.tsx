// src/screens/FavoritesScreen.tsx
import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { PokemonCard } from "../components/PokemonCard";
import { LogoutButton } from "../components/LogoutButton";
import { useFavorites } from "../context/FavoritesContext";

export const FavoritesScreen = () => {
  // Pegamos a lista de favoritos diretamente do contexto global.
  // Não há mais fetch nem estado local: a fonte da verdade é o FavoritesProvider.
  const { favorites } = useFavorites();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 20) + 10 }]}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Favoritos ❤️</Text>
        <LogoutButton />
      </View>

      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            Você ainda não favoritou nenhum Pokémon.{"\n"}
            Toque no coração de um Pokémon para salvá-lo aqui!
          </Text>
        }
        contentContainerStyle={
          favorites.length === 0 ? styles.emptyList : undefined
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16 },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: { fontSize: 32, fontWeight: "bold" },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
  },
  // Quando a lista está vazia, centralizamos a mensagem verticalmente.
  emptyList: { flexGrow: 1, justifyContent: "center" },
});