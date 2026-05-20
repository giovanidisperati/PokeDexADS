# 📱 Pokédex App - Mobile

Bem-vindo ao repositório do aplicativo Pokédex, desenvolvido em React Native com Expo! 

Este projeto é construído de forma incremental. Esta branch (`step-04-navegacao`) marca o início da nossa **Aula 05**, introduzindo a navegação entre telas na aplicação.

A explicação completa dos conceitos de navegação, roteamento e arquitetura está disponível na nossa Aula 05: [Navegação e Organização de Aplicações com React Native](https://giovanidisperati.github.io/GRUDSMV/aula05).

## 🎯 O que foi implementado neste passo (e por quê)?

* **React Navigation:** Instalação e configuração do `@react-navigation/native` e do `native-stack` para gerenciar o fluxo de telas no padrão de "pilha".
* **Contrato de Tipagem (`Navigation.ts`):** Criação do `RootStackParamList` para tipar as rotas estaticamente. Isso garante que o TypeScript valide se estamos passando os parâmetros corretos (ex: `pokemonId`) ao mudar de tela, evitando bugs em tempo de execução.
* **Roteador Principal (`App.tsx`):** Substituição da renderização estática pelo `NavigationContainer` e `Stack.Navigator`, que passam a gerenciar as transições e o histórico da aplicação.
* **Cartões Interativos (`PokemonCard`):** Adição do `TouchableOpacity` e do hook `useNavigation` para transformar os cartões visuais em botões que disparam a navegação passando o ID do Pokémon.
* **Tela de Detalhes (Esqueleto):** Criação da `PokemonDetailsScreen.tsx` (inicialmente como um *placeholder*) para receber a ação de navegação.

## 📂 Estrutura de Diretórios

```text
PokedexApp/
├── App.tsx                 # Roteador principal (NavigationContainer e Stack)
├── src/
│   ├── components/         # Componentes (ex: PokemonCard agora interativo)
│   ├── screens/            # Telas (PokedexScreen e a nova PokemonDetailsScreen)
│   ├── services/           # Regras de negócio e chamadas à API
│   ├── types/              # Definições (Pokemon.ts e o novo Navigation.ts)
│   └── utils/              # Funções utilitárias auxiliares
└── package.json            # Dependências (incluindo React Navigation)
```

🚀 Como testar localmente

Clone o repositório e mude para esta branch:

git checkout step-04-navegacao

Instale as dependências com npm install (passo vital, pois adicionamos bibliotecas nativas de navegação).

Inicie o servidor com npx expo start.

Abra no emulador, clique em qualquer Pokémon da lista e veja a transição animada para a tela de detalhes!
