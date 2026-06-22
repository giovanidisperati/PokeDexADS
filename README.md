# 📱 Pokédex App - Mobile

Bem-vindo ao repositório do aplicativo Pokédex, desenvolvido em React Native com Expo! 

Este projeto é construído de forma incremental. Esta branch (`step-07-autenticacao`) contém a finalização prática da **Aula 07**, onde implementamos um **fluxo de autenticação** completo com **Context API**, **persistência de sessão** e **navegação condicional**.

A explicação completa dos conceitos abordados nesta etapa estará disponível na nossa Aula 07: *Autenticação e Fluxos Condicionais de Navegação*.

## 🔐 Credenciais de teste

Como não há backend real, este passo usa um **mock de autenticação**:

| Campo | Valor |
|---|---|
| Usuário | `aluno` |
| Senha | `123456` |

## 🎯 O que foi implementado neste passo (e por quê)?

* **AuthContext (`AuthProvider`):** Provider central que mantém o usuário autenticado (`user`), um estado de carregamento inicial (`isLoading`) e as ações `signIn`/`signOut`. Segue o mesmo padrão do `FavoritesContext` da Aula 06.
* **Persistência de Sessão ("manter conectado"):** a sessão é salva no `AsyncStorage`. Ao reabrir o app, restauramos o usuário automaticamente e pulamos a tela de login.
* **LoginScreen:** formulário com validação de campos obrigatórios, estado de erro, indicador de loading no botão e simulação de latência de rede (~1s). Inclui uma caixa de dica com as credenciais de teste.
* **Navegação Condicional no `RootNavigator`:** 
  - Enquanto restauramos a sessão → *splash* com `ActivityIndicator`.
  - Sem usuário → `AuthStack` (apenas a `LoginScreen`).
  - Com usuário → `AppTabs` (as abas da Pokédex/Favoritos da Aula 06).
  - **Não há navegação manual**: a árvore de telas reage sozinha às mudanças de `user`.
* **LogoutButton:** componente reutilizável adicionado no topo das telas Pokédex e Favoritos. Chama `signOut()` e o app volta automaticamente ao login.
* **Hierarquia de Providers:** `AuthProvider` envolve `FavoritesProvider`, pois os favoritos só fazem sentido quando o usuário está autenticado.

## 🧠 Conceitos explorados

| Conceito | Onde está |
|---|---|
| Context API para auth | `src/context/AuthContext.tsx` |
| Persistência de sessão | `AsyncStorage` + `useEffect` de restauração |
| Hook customizado | `useAuth()` |
| Navegação condicional | `RootNavigator` decide entre `AuthStack` e `AppTabs` |
| Splash/loading inicial | Estado `isLoading` do contexto de auth |
| Simulação de API/mock | Atraso proposital + credenciais fixas |
| Aninhamento de Providers | `AuthProvider` > `FavoritesProvider` |

## 📂 Estrutura de Diretórios Relevante

```text
PokedexApp/
├── src/
│   ├── context/
│   │   ├── AuthContext.tsx          # Provider + hook useAuth (NOVO)
│   │   └── FavoritesContext.tsx     # Provider + hook useFavorites (Aula 06)
│   ├── navigation/
│   │   └── RootNavigator.tsx        # Decisão condicional Auth vs App (ATUALIZADO)
│   ├── screens/
│   │   ├── LoginScreen.tsx          # Tela de login (NOVO)
│   │   ├── PokedexScreen.tsx        # Botão "Sair" no topo (ATUALIZADO)
│   │   └── FavoritesScreen.tsx      # Botão "Sair" no topo (ATUALIZADO)
│   ├── components/
│   │   └── LogoutButton.tsx         # Botão reutilizável (NOVO)
│   └── types/
│       └── Navigation.ts            # AuthStackParamList adicionado
```

## 🚀 Como testar localmente

1. Clone o repositório e mude para esta branch:

   > git checkout step-07-autenticacao

2. Instale as dependências:

   > npm install

3. Inicie o servidor:

   > npx expo start

4. No emulador/dispositivo:
   - O app abre na **tela de login** (se for a primeira vez).
   - Use as credenciais `aluno` / `123456` e toque em **Entrar**.
   - Você é levado às abas (Pokédex/Favoritos). Feche e reabra o app: a sessão persiste! 🔑
   - Toque em **Sair** no topo para voltar ao login e ver a sessão ser removida.