# 📱 Pokédex App - Mobile

Bem-vindo ao repositório do aplicativo Pokédex, desenvolvido em React Native com Expo! 

Este projeto é construído de forma incremental. Esta branch (`step-05-detalhes-pokemon`) contém a finalização prática da **Aula 05**, onde conectamos a nossa tela de detalhes à PokeAPI real.

A explicação completa dos conceitos abordados nesta etapa está disponível na nossa Aula 05: [Navegação e Organização de Aplicações com React Native](https://giovanidisperati.github.io/GRUDSMV/aula05).

## 🎯 O que foi implementado neste passo (e por quê)?

* **Integração Real com a API (`getPokemonById`):** Adicionamos uma nova função na nossa camada de serviços (`services/api.ts`) para buscar os dados completos de um Pokémon específico utilizando o seu ID.
* **Consumo de Parâmetros de Rota:** Utilizamos o hook `useRoute` do React Navigation para capturar o `pokemonId` passado durante a transição de telas.
* **Gerenciamento de Estado Completo:** Implementamos na `PokemonDetailsScreen` o fluxo completo de ciclo de vida e resiliência: estado de carregamento (`ActivityIndicator`), tratamento de erros e renderização condicional dos dados.
* **Construção de Interface (UI):** Desenhamos a tela final exibindo a imagem do Pokémon, seu ID, nome formatado (capitalizado) e a renderização dinâmica de suas "pílulas" de tipagem (ex: Grass, Poison).

## 📂 Estrutura de Diretórios Relevante

```text
PokedexApp/
├── src/
│   ├── screens/
│   │   └── PokemonDetailsScreen.tsx  # Interface completa e consumo da API
│   ├── services/
│   │   └── api.ts                    # Nova função getPokemonById

🚀 Como testar localmente

Clone o repositório e mude para esta branch:

> git checkout step-05-detalhes-pokemon

Instale as dependências com npm install.

Inicie o servidor com npx expo start.

Abra no emulador, clique em qualquer Pokémon da lista e aguarde o carregamento dos detalhes completos consumidos diretamente da PokeAPI!
