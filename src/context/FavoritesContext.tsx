// src/context/FavoritesContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Pokemon } from "../types/Pokemon";

// Chave usada para guardar a lista de favoritos no AsyncStorage.
// Centralizar a chave evita erros de digitação ao longo do app.
const STORAGE_KEY = "@pokedex:favorites";

// Interface que descreve o "formato" do nosso estado global de favoritos.
// Qualquer componente que consumir o contexto terá acesso a estes valores/métodos.
interface FavoritesContextData {
  favorites: Pokemon[];
  isFavorite: (id: number) => boolean;
  toggleFavorite: (pokemon: Pokemon) => void;
  removeFavorite: (id: number) => void;
}

// Criamos o contexto com um valor padrão "vazio".
// O valor real será fornecido pelo <FavoritesProvider> mais abaixo.
const FavoritesContext = createContext<FavoritesContextData>({
  favorites: [],
  isFavorite: () => false,
  toggleFavorite: () => {},
  removeFavorite: () => {},
});

// Hook de conveniência: em vez de usar useContext(FavoritesContext) em cada tela,
// os componentes chamam apenas useFavorites().
export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites deve ser usado dentro de um <FavoritesProvider>");
  }
  return context;
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Pokemon[]>([]);

  // 1) Ao montar o app, carregamos os favoritos salvos do disco.
  // Isso garante que o estado persista entre reinícios do aplicativo.
  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setFavorites(JSON.parse(stored) as Pokemon[]);
        }
      } catch (e) {
        console.error("Erro ao carregar favoritos:", e);
      }
    })();
  }, []);

  // 2) Sempre que a lista de favoritos mudar, persistimos no AsyncStorage.
  // Esse efeito mantém o disco sincronizado com o estado em memória.
  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
      } catch (e) {
        console.error("Erro ao salvar favoritos:", e);
      }
    })();
  }, [favorites]);

  const isFavorite = (id: number) =>
    favorites.some((p) => p.id === id);

  // Adiciona se ainda não existe; remove se já existe (comportamento de toggle).
  const toggleFavorite = (pokemon: Pokemon) => {
    setFavorites((prev) =>
      prev.some((p) => p.id === pokemon.id)
        ? prev.filter((p) => p.id !== pokemon.id)
        : [...prev, pokemon]
    );
  };

  const removeFavorite = (id: number) =>
    setFavorites((prev) => prev.filter((p) => p.id !== id));

  return (
    <FavoritesContext.Provider
      value={{ favorites, isFavorite, toggleFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}