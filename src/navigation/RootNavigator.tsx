// src/navigation/RootNavigator.tsx
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { PokedexScreen } from "../screens/PokedexScreen";
import { FavoritesScreen } from "../screens/FavoritesScreen";
import { PokemonDetailsScreen } from "../screens/PokemonDetailsScreen";
import {
  PokedexStackParamList,
  FavoritesStackParamList,
  RootTabParamList,
} from "../types/Navigation";

// Cada aba recebe sua própria Stack. Assim, ao abrir um Pokémon a partir da
// aba "Favoritos", o botão "voltar" retorna para a lista de favoritos (e não
// para a Pokédex). Esse é o padrão recomendado pelo React Navigation.

const PokedexStack = createNativeStackNavigator<PokedexStackParamList>();
const FavoritesStack = createNativeStackNavigator<FavoritesStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

function PokedexStackScreen() {
  return (
    <PokedexStack.Navigator initialRouteName="Pokedex">
      <PokedexStack.Screen
        name="Pokedex"
        component={PokedexScreen}
        options={{ title: "Pokédex", headerShown: false }}
      />
      <PokedexStack.Screen
        name="PokemonDetails"
        component={PokemonDetailsScreen}
        options={{ title: "Detalhes" }}
      />
    </PokedexStack.Navigator>
  );
}

function FavoritesStackScreen() {
  return (
    <FavoritesStack.Navigator initialRouteName="Favorites">
      <FavoritesStack.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{ title: "Favoritos", headerShown: false }}
      />
      <FavoritesStack.Screen
        name="PokemonDetails"
        component={PokemonDetailsScreen}
        options={{ title: "Detalhes" }}
      />
    </FavoritesStack.Navigator>
  );
}

export function RootNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="PokedexTab"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#e63946",
      }}
    >
      <Tab.Screen
        name="PokedexTab"
        component={PokedexStackScreen}
        options={{ title: "Pokédex", tabBarIcon: () => null }}
      />
      <Tab.Screen
        name="FavoritesTab"
        component={FavoritesStackScreen}
        options={{ title: "Favoritos", tabBarIcon: () => null }}
      />
    </Tab.Navigator>
  );
}