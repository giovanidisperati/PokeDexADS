import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; // <-- NOVO IMPORT
import { getPokemons, getPokemonDetails } from '../services/api';
import { Pokemon } from '../types/Pokemon';
import { PokemonCard } from '../components/PokemonCard';

export const PokedexScreen = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Pegando a área segura dinamicamente
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // Descomente a linha abaixo para simular um atraso na resposta da API e testar o indicador (spinner) de carregamento
        // await new Promise(resolve => setTimeout(resolve, 5000));
        const list = await getPokemons(30);
        const details = await Promise.all(list.map(p => getPokemonDetails(p.url)));
        setPokemons(details);
      } catch (err) {
        setError('Falha ao carregar Pokémons. Verifique sua conexão.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const filtered = pokemons.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    // Aplicando o paddingTop dinâmico direto no estilo da View
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 20) + 10 }]}>
      <Text style={styles.title}>Pokédex</Text>
      <TextInput
        placeholder="Buscar pokémon..."
        style={styles.input}
        onChangeText={setSearch}
        value={search}
      />
      
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          renderItem={({ item }) => <PokemonCard pokemon={item} />}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              Nenhum Pokémon encontrado para "{search}"
            </Text>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  // Removido o paddingTop fixo daqui!
  container: { flex: 1, paddingHorizontal: 16 }, 
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 12 },
  input: {
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  loader: { marginTop: 50 },
  errorText: { color: 'red', textAlign: 'center', marginTop: 20, fontSize: 16 },
  emptyText: { textAlign: 'center', marginTop: 20, fontSize: 16, color: '#666' }
});