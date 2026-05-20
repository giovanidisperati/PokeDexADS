// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { PokedexScreen } from './src/screens/PokedexScreen';
import { PokemonDetailsScreen } from './src/screens/PokemonDetailsScreen';
import { RootStackParamList } from './src/types/Navigation';

// Criamos a pilha de navegação com os tipos definidos
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Pokedex">
          <Stack.Screen 
            name="Pokedex" 
            component={PokedexScreen} 
            options={{ title: 'Pokédex', headerShown: false }} // Esconde o cabeçalho padrão para não duplicar com o nosso
          />
          <Stack.Screen 
            name="PokemonDetails" 
            component={PokemonDetailsScreen} 
            options={{ title: 'Detalhes' }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}