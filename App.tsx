// App.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { RootNavigator } from "./src/navigation/RootNavigator";
import { FavoritesProvider } from "./src/context/FavoritesContext";

export default function App() {
  return (
    <SafeAreaProvider>
      {/* O FavoritesProvider envolve toda a navegação. Assim, qualquer tela
          (e qualquer Stack dentro das abas) consegue acessar os favoritos
          via o hook useFavorites(). */}
      <FavoritesProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </FavoritesProvider>
    </SafeAreaProvider>
  );
}