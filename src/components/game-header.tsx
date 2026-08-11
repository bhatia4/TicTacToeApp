import { StyleSheet, Text, View } from "react-native";

import type { ThemeColors } from "@/theme";

type GameHeaderProps = {
  colors: ThemeColors;
};

export function GameHeader({ colors }: GameHeaderProps) {
  return (
    <View style={styles.header}>
      <Text style={[styles.title, { color: colors.text }]}>Tic Tac Toe</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    maxWidth: 520,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    letterSpacing: 0,
    marginTop: 4,
  },
});
