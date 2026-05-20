// Como estamos usando TypeScript, precisamos avisar o aplicativo quais 
// telas existem e quais parâmetros elas aceitam.

export type RootStackParamList = {
  Pokedex: undefined; // A tela Pokedex não recebe parâmetros
  PokemonDetails: { pokemonId: number }; // A tela de detalhes exige o ID do Pokémon
};