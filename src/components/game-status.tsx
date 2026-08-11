import { StyleSheet, Text, View } from "react-native";

import type { ThemeColors } from "@/theme";

type GameStatusProps = {
  colors: ThemeColors;
  status: string;
};

export function GameStatus({ colors, status }: GameStatusProps) {
  return (
    <View style={styles.statusBlock}>
      <Text style={[styles.status, { color: colors.text }]}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  statusBlock: {
    alignItems: "center",
    marginVertical: 24,
  },
  status: {
    fontSize: 21,
    fontWeight: "800",
  },
});
