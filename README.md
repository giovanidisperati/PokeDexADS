# 📱 Pokédex App - Mobile

Bem-vindo ao repositório do aplicativo Pokédex, desenvolvido em React Native com Expo! 

Este projeto é construído de forma incremental. Esta branch (`step-02-feedback-visual`) contém a resolução dos **Exercícios 1 e 2** da Aula 04, focando na resiliência da aplicação e no feedback visual ao usuário.

A explicação completa dos conceitos envolvidos na construção desta PokéDex está disponível na nossa Aula 04: [Construção de Interfaces Visuais com React Native](https://giovanidisperati.github.io/GRUDSMV/aula04).

## 🎯 O que foi implementado neste passo (e por quê)?

* **Indicador de Carregamento (`ActivityIndicator`):** Adicionamos um estado `isLoading` para exibir um *spinner* enquanto os dados da API estão sendo buscados. Isso evita que o usuário fique olhando para uma tela em branco sem saber se o aplicativo travou.
* **Tratamento de Erros (`try...catch`):** Blindamos a camada de serviços (`api.ts`). Se a requisição falhar (por exemplo, falha de rede), capturamos o erro e exibimos uma mensagem amigável na tela.
* **Estado de Lista Vazia (`ListEmptyComponent`):** Utilizamos esta propriedade nativa da `FlatList` para fornecer um feedback claro caso o usuário busque por um Pokémon que não existe, melhorando significativamente a experiência de uso.

## 📂 Estrutura de Diretórios

```text
PokedexApp/
├── App.tsx                 # Entry-point da aplicação
├── src/
│   ├── components/         # Componentes visuais (ex: PokemonCard)
│   ├── screens/            # Telas (ex: PokedexScreen com lógica de loading/erro)
│   ├── services/           # Regras de negócio e requisições blindadas (ex: api.ts)
│   ├── types/              # Definições de interfaces do TypeScript
│   └── utils/              # Funções utilitárias auxiliares
└── package.json            # Dependências do projeto