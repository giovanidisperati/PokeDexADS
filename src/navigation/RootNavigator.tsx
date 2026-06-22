// src/navigation/RootNavigator.tsx
import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { PokedexScreen } from "../screens/PokedexScreen";
import { FavoritesScreen } from "../screens/FavoritesScreen";
import { PokemonDetailsScreen } from "../screens/PokemonDetailsScreen";
import { LoginScreen } from "../screens/LoginScreen";
import {
  PokedexStackParamList,
  FavoritesStackParamList,
  RootTabParamList,
  AuthStackParamList,
} from "../types/Navigation";
import { useAuth } from "../context/AuthContext";

// Cada aba recebe sua própria Stack. Assim, ao abrir um Pokémon a partir da
// aba "Favoritos", o botão "voltar" retorna para a lista de favoritos (e não
// para a Pokédex). Esse é o padrão recomendado pelo React Navigation.

const PokedexStack = createNativeStackNavigator<PokedexStackParamList>();
const FavoritesStack = createNativeStackNavigator<FavoritesStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();

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

// Navegação do app autenticado: Bottom Tabs com as duas abas principais.
function AppTabs() {
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

// Navegação de autenticação (antes de logar): apenas a tela de login.
function AuthFlow() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
    </AuthStack.Navigator>
  );
}

// Componente raiz: decide qual árvore de navegação mostrar.
// - Enquanto restauramos a sessão (isLoading), exibimos um splash/loading.
// - Se há usuário salvo, mostra as abas (AppTabs).
// - Caso contrário, mostra o fluxo de login (AuthFlow).
export function RootNavigator() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#e63946" />
      </View>
    );
  }

  return user ? <AppTabs /> : <AuthFlow />;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});