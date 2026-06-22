// src/types/Navigation.ts
// Como estamos usando TypeScript, precisamos avisar o aplicativo quais
// telas existem e quais parâmetros elas aceitam.

// --- Stacks (pilhas) aninhadas dentro de cada aba ---
// Cada aba possui sua própria pilha, para que o botão "voltar"
// funcione corretamente dentro do contexto daquela aba.

// Pilha da aba "Pokédex"
export type PokedexStackParamList = {
  Pokedex: undefined; // A tela Pokedex não recebe parâmetros
  PokemonDetails: { pokemonId: number }; // A tela de detalhes exige o ID do Pokémon
};

// Pilha da aba "Favoritos"
export type FavoritesStackParamList = {
  Favorites: undefined; // A tela de Favoritos não recebe parâmetros
  PokemonDetails: { pokemonId: number }; // Mesmo formato de detalhes, reutilizado
};

// --- Navegação raiz por abas (Bottom Tabs) ---
export type RootTabParamList = {
  PokedexTab: undefined;
  FavoritesTab: undefined;
};

// --- Pilha de autenticação (fluxo antes de logar) ---
export type AuthStackParamList = {
  Login: undefined; // Tela de login (sem parâmetros)
};

// Tipo de compatibilidade mantido para componentes existentes que ainda
// referenciam RootStackParamList (ex.: PokemonCard). Funciona porque a tela
// de detalhes está presente nas duas pilhas com o mesmo formato de params.
export type RootStackParamList = PokedexStackParamList;