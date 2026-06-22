// src/context/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Chave usada para persistir a sessão do usuário no dispositivo.
const STORAGE_KEY = "@pokedex:user";

// Modelo simples do usuário autenticado. Em um app real, viria do backend.
export interface AuthUser {
  username: string;
}

// Credenciais aceitas por este mock. Em produção, seriam validadas no servidor.
const VALID_CREDENTIALS = {
  username: "aluno",
  password: "123456",
};

// Contrato do contexto de autenticação exposto a toda a aplicação.
interface AuthContextData {
  user: AuthUser | null;
  isLoading: boolean; // true enquanto restauramos a sessão do disco
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({
  user: null,
  isLoading: true,
  signIn: async () => {},
  signOut: async () => {},
});

// Hook de conveniência para consumir o contexto de auth.
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um <AuthProvider>");
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 1) Ao montar, tentamos restaurar a sessão salva. Isso implementa o
  // comportamento de "manter conectado": se o usuário já havia logado antes,
  // pulamos a tela de login e vamos direto para o app.
  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setUser(JSON.parse(stored) as AuthUser);
        }
      } catch (e) {
        console.error("Erro ao restaurar sessão:", e);
      } finally {
        // Escondemos o splash/loading inicial independentemente do resultado.
        setIsLoading(false);
      }
    })();
  }, []);

  // Simula uma chamada de login a um servidor, com atraso de rede.
  // Lança um Error com mensagem amigável se as credenciais forem inválidas.
  const signIn = async (username: string, password: string) => {
    // Atraso proposital para emular latência de rede (~1s).
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (
      username.trim().toLowerCase() !== VALID_CREDENTIALS.username ||
      password !== VALID_CREDENTIALS.password
    ) {
      throw new Error("Usuário ou senha inválidos.");
    }

    const loggedUser: AuthUser = { username: VALID_CREDENTIALS.username };
    setUser(loggedUser);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(loggedUser));
    } catch (e) {
      console.error("Erro ao salvar sessão:", e);
    }
  };

  // Limpa o estado em memória e remove a sessão do disco.
  const signOut = async () => {
    setUser(null);
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error("Erro ao remover sessão:", e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}