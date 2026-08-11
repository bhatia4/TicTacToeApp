import { Pressable, StyleSheet, Switch, Text, View } from "react-native";

import type { Difficulty, Mode } from "@/game";
import type { ThemeColors } from "@/theme";

type GameControlsProps = {
  colors: ThemeColors;
  darkMode: boolean;
  difficulty: Difficulty;
  mode: Mode;
  onDarkModeChange: (value: boolean) => void;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onModeChange: (mode: Mode) => void;
};

export function GameControls({
  colors,
  darkMode,
  difficulty,
  mode,
  onDarkModeChange,
  onDifficultyChange,
  onModeChange,
}: GameControlsProps) {
  return (
    <View style={[styles.panel, { backgroundColor: colors.panel }]}>
      <View style={[styles.modePicker, { backgroundColor: colors.background }]}>
        {(["single", "two"] as const).map((option) => {
          const selected = mode === option;
          return (
            <Pressable
              key={option}
              accessibilityRole="radio"
              accessibilityState={{ selected }}
              onPress={() => onModeChange(option)}
              style={[
                styles.modeButton,
                selected && { backgroundColor: colors.accent },
              ]}
            >
              <Text
                style={[
                  styles.modeText,
                  { color: selected ? colors.buttonText : colors.muted },
                ]}
              >
                {option === "single" ? "Single Player" : "Two Player"}
              </Text>
            </Pressable>
          );
        })}
      </View>
      {mode === "single" && (
        <View style={styles.difficultySection}>
          <Text style={[styles.difficultyLabel, { color: colors.muted }]}>
            Difficulty
          </Text>
          <View
            style={[
              styles.difficultyPicker,
              { backgroundColor: colors.background },
            ]}
          >
            {(["easy", "medium", "unbeatable"] as const).map((option) => {
              const selected = difficulty === option;
              return (
                <Pressable
                  key={option}
                  accessibilityRole="radio"
                  accessibilityState={{ selected }}
                  onPress={() => onDifficultyChange(option)}
                  style={[
                    styles.difficultyButton,
                    selected && { backgroundColor: colors.accent },
                  ]}
                >
                  <Text
                    style={[
                      styles.difficultyText,
                      { color: selected ? colors.buttonText : colors.muted },
                    ]}
                  >
                    {option === "unbeatable"
                      ? "Unbeatable"
                      : option[0].toUpperCase() + option.slice(1)}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      )}
      <View style={styles.themeControl}>
        <Text style={[styles.themeLabel, { color: colors.muted }]}>
          Dark Mode
        </Text>
        <Switch
          accessibilityLabel="Toggle dark mode"
          value={darkMode}
          onValueChange={onDarkModeChange}
          trackColor={{ false: colors.switchTrack, true: colors.accent }}
          thumbColor={darkMode ? colors.background : colors.switchThumb}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    width: "100%",
    maxWidth: 520,
    borderRadius: 12,
    padding: 14,
  },
  modePicker: {
    flexDirection: "row",
    borderRadius: 8,
    padding: 3,
  },
  modeButton: {
    flex: 1,
    alignItems: "center",
    borderRadius: 6,
    paddingVertical: 11,
  },
  modeText: {
    fontSize: 14,
    fontWeight: "700",
  },
  themeControl: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 4,
    width: "100%",
    marginTop: 12,
  },
  themeLabel: {
    fontSize: 12,
    fontWeight: "700",
  },
  difficultySection: {
    marginTop: 12,
  },
  difficultyLabel: {
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 6,
  },
  difficultyPicker: {
    flexDirection: "row",
    borderRadius: 8,
    padding: 3,
  },
  difficultyButton: {
    flex: 1,
    alignItems: "center",
    borderRadius: 6,
    paddingVertical: 9,
  },
  difficultyText: {
    fontSize: 14,
    fontWeight: "700",
  },
});
