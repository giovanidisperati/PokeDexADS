# 📱 Pokédex App - Mobile

Bem-vindo ao repositório do aplicativo Pokédex, desenvolvido em React Native com Expo! 

Este projeto é construído de forma incremental. Esta branch (`step-06-favoritos-context`) contém a finalização prática da **Aula 06**, onde implementamos um sistema completo de **favoritos** utilizando **Context API** e **AsyncStorage**, além de reorganizar a navegação com **Bottom Tabs**.

A explicação completa dos conceitos abordados nesta etapa estará disponível na nossa Aula 06: *Estado Global e Persistência Local com Context API*.

## 🎯 O que foi implementado neste passo (e por quê)?

* **Estado Global com Context API (`FavoritesContext`):** criamos um Provider central que mantém a lista de Pokémons favoritos. Qualquer tela agora consegue ler e alterar esse estado através do hook `useFavorites()`, sem *prop drilling*.
* **Persistência Local com `AsyncStorage`:** os favoritos são salvos no dispositivo. Ao fechar e reabrir o app, a lista é restaurada automaticamente — demonstrando o padrão "manter conectado/ salvo".
* **Hook customizado (`useFavorites`):** abstrai o consumo do contexto e lança um erro explícito se usado fora do Provider (boa prática de segurança de tipos).
* **Nova Aba de Favoritos:** adicionamos navegação por abas (`Bottom Tabs`) com duas abas — **Pokédex** e **Favoritos**. Cada aba possui sua própria *Stack* aninhada, seguindo o padrão recomendado pelo React Navigation.
* **Interação de Favoritar em vários pontos:**
  - No `PokemonCard`, um coração ❤️/🤍 no canto superior direito (com `hitSlop` para melhor usabilidade e prevenção de propagação do toque).
  - Na `PokemonDetailsScreen`, um botão grande de "Adicionar/Remover dos Favoritos".
* **Tela de Favoritos com estado vazio:** exibe uma mensagem amigável quando não há favoritos.

## 🧠 Conceitos explorados

| Conceito | Onde está |
|---|---|
| Context API | `src/context/FavoritesContext.tsx` |
| Hooks customizados | `useFavorites()` dentro do contexto |
| Persistência (AsyncStorage) | Carregamento no `mount` + sincronização por `useEffect` |
| Bottom Tabs Navigator | `src/navigation/RootNavigator.tsx` |
| Stacks aninhadas (uma por aba) | `PokedexStack` e `FavoritesStack` |
| Reutilização de componentes | `PokemonCard` reaproveitado na Pokédex e nos Favoritos |

## 📂 Estrutura de Diretórios Relevante

```text
PokedexApp/
├── src/
│   ├── context/
│   │   └── FavoritesContext.tsx     # Provider + hook useFavorites
│   ├── navigation/
│   │   └── RootNavigator.tsx        # Bottom Tabs + Stacks aninhadas
│   ├── screens/
│   │   ├── FavoritesScreen.tsx      # Nova aba com lista de favoritos
│   │   └── PokemonDetailsScreen.tsx # Botão de favoritar adicionado
│   ├── components/
│   │   └── PokemonCard.tsx          # Coração de favorito no card
│   └── types/
│       └── Navigation.ts            # Tipos das Stacks e Tabs
```

## 🚀 Como testar localmente

1. Clone o repositório e mude para esta branch:

   > git checkout step-06-favoritos-context

2. Instale as dependências:

   > npm install

3. Inicie o servidor:

   > npx expo start

4. No emulador/dispositivo:
   - Navegue entre as abas **Pokédex** e **Favoritos** (inferior).
   - Toque no coração de um Pokémon (no card ou nos detalhes) para favoritá-lo.
   - Abra a aba **Favoritos** e veja sua lista. Feche e reabra o app: a lista persiste! ❤️

## 🔐 Credenciais

> *A autenticação será adicionada no próximo passo (`step-07-autenticacao`).*