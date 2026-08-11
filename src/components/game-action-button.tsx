import { Pressable, StyleSheet, Text } from "react-native";

import type { ThemeColors } from "@/theme";

type GameActionButtonProps = {
  colors: ThemeColors;
  disabled: boolean;
  label: string;
  onPress: () => void;
};

export function GameActionButton({
  colors,
  disabled,
  label,
  onPress,
}: GameActionButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: colors.accent },
        disabled && styles.disabledButton,
        pressed && styles.buttonPressed,
      ]}
    >
      <Text style={[styles.text, { color: colors.buttonText }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    maxWidth: 360,
    alignItems: "center",
    borderRadius: 10,
    marginTop: 24,
    paddingVertical: 15,
  },
  text: {
    fontSize: 15,
    fontWeight: "800",
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  disabledButton: {
    opacity: 0.45,
  },
});
