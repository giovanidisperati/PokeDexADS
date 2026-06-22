// App.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { RootNavigator } from "./src/navigation/RootNavigator";
import { FavoritesProvider } from "./src/context/FavoritesContext";
import { AuthProvider } from "./src/context/AuthContext";

export default function App() {
  return (
    <SafeAreaProvider>
      {/* A ordem dos Providers importa: o AuthProvider fica mais externo porque
          ele decide (no RootNavigator) se mostra o login ou as abas. O
          FavoritesProvider fica dentro, pois só faz sentido quando o usuário
          está autenticado e navegando no app. */}
      <AuthProvider>
        <FavoritesProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </FavoritesProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}