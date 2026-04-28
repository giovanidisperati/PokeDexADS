# 📱 Pokédex App - Mobile

Bem-vindo ao repositório do aplicativo Pokédex, desenvolvido em React Native com Expo! 

Este projeto é construído de forma incremental. Esta branch (`step-03-refinamentos-ui`) contém a resolução do **Exercício 4** da Aula 04, focando no polimento visual e na adaptação do layout para diferentes dispositivos.

A explicação completa dos conceitos envolvidos na construção desta PokéDex está disponível na nossa Aula 04: [Construção de Interfaces Visuais com React Native](https://giovanidisperati.github.io/GRUDSMV/aula04).

## 🎯 O que foi implementado neste passo (e por quê)?

* **Formatação de Texto (`capitalize`):** Criamos uma função utilitária em `src/utils/format.ts` para garantir que o nome de todos os Pokémons comece com letra maiúscula, entregando uma interface mais profissional e bem acabada.
* **Área Segura Dinâmica (`useSafeAreaInsets`):** Substituímos os espaçamentos fixos no topo da tela pelo hook do `react-native-safe-area-context`. Isso garante que o aplicativo respeite automaticamente o "notch" (entalhe da câmera) e a barra de status de qualquer aparelho, seja Android ou iOS, evitando que o conteúdo fique espremido ou escondido.

## 📂 Estrutura de Diretórios

```text
PokedexApp/
├── App.tsx                 # Entry-point da aplicação
├── src/
│   ├── components/         # Componentes visuais (ex: PokemonCard com formatação)
│   ├── screens/            # Telas (ex: PokedexScreen adaptada para a Safe Area)
│   ├── services/           # Regras de negócio e chamadas à API
│   ├── types/              # Definições de interfaces do TypeScript
│   └── utils/              # Funções utilitárias (ex: format.ts)
└── package.json            # Dependências do projeto