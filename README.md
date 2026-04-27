# 📱 Pokédex App - Mobile

Bem-vindo ao repositório do aplicativo Pokédex, desenvolvido em React Native com Expo! 

Este projeto é construído de forma incremental. Esta branch (`step-01-api-e-cards`) contém as **fundações** da aplicação, focando em consumo de API, tipagem de dados e renderização de listas.

A explicação completa dos conceitos envolvidos na construção dessa PokéDex está disponível na nossa Aula 04: [Construção de Interfaces Visuais com React Native](https://giovanidisperati.github.io/GRUDSMV/aula04).

## 🎯 O que foi implementado neste passo (e por quê)?

* **Setup e Arquitetura de Pastas (`src/`):** Adotamos o padrão de mercado para isolar o código da aplicação (regras e UI) das configurações de infraestrutura do Expo na raiz. Isso nos ajuda a garantir a separação de responsabilidades.
* **Tipagem Estática (`types/`):** Criação das interfaces no `Pokemon.ts` para garantir contratos rígidos com a PokeAPI. Tipar os dados evita bugs de "undefined" em tempo de execução e melhora a experiência de desenvolvimento (autocomplete).
* **Camada de Serviços (`services/`):** Configuração do `axios` no `api.ts`. A tela não precisa (e nem deve) saber *como* os dados são buscados na internet. Ela apenas consome essa camada isolada.
* **Componentização UI (`components/`):** Criação do `PokemonCard`. Em vez de um código gigante na tela principal, encapsulamos a estrutura e a estilização do card, permitindo que ele seja reutilizado e receba dados via `props`.
* **Listas Performáticas (`screens/`):** Uso da `FlatList` na `PokedexScreen`. Diferente do `.map()` tradicional com `ScrollView`, a `FlatList` renderiza e descarta itens sob demanda, garantindo uma boa performance mesmo com dezenas de Pokémons!

## 📂 Estrutura de Diretórios

```text
PokedexApp/
├── App.tsx                 # Entry-point da aplicação
├── src/
│   ├── components/         # Componentes visuais reutilizáveis (ex: PokemonCard)
│   ├── screens/            # Telas completas da aplicação (ex: PokedexScreen)
│   ├── services/           # Regras de negócio e chamadas externas (ex: api.ts)
│   ├── types/              # Definições de interfaces do TypeScript
│   └── utils/              # Funções utilitárias auxiliares
└── package.json            # Dependências do projeto
```

## 🚀 Como rodar o projeto

1. Clone o repositório e faça o checkout para esta branch:
   ```bash
   git checkout step-01-api-e-cards
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor do Expo:
   ```bash
   npx expo start
   ```
4. Pressione `a` para abrir no emulador Android ou escaneie o QR Code com o app Expo Go no seu celular.