// src/components/LogoutButton.tsx
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

import { useAuth } from "../context/AuthContext";

// Botão "Sair" reutilizável. Apenas chama signOut() do contexto — a troca de
// tela para o login acontece automaticamente no RootNavigator conforme o
// estado `user` passa a ser null.
export const LogoutButton = () => {
  const { signOut } = useAuth();

  return (
    <TouchableOpacity
      onPress={signOut}
      style={styles.button}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
    >
      <Text style={styles.text}>Sair</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e63946",
    backgroundColor: "#fff",
  },
  text: {
    color: "#e63946",
    fontWeight: "bold",
    fontSize: 14,
  },
});