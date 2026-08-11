import { Pressable, StyleSheet, Text, View } from "react-native";

import type { Cell } from "@/game";
import type { ThemeColors } from "@/theme";

type GameBoardProps = {
  board: Cell[];
  boardSize: number;
  cellSize: number;
  colors: ThemeColors;
  result: boolean;
  singlePlayerTurn: boolean;
  onCellPress: (index: number) => void;
};

export function GameBoard({
  board,
  boardSize,
  cellSize,
  colors,
  result,
  singlePlayerTurn,
  onCellPress,
}: GameBoardProps) {
  return (
    <View
      style={[
        styles.board,
        { width: boardSize, height: boardSize, backgroundColor: colors.grid },
      ]}
    >
      {board.map((cell, index) => (
        <Pressable
          key={index}
          accessibilityLabel={`Cell ${index + 1}${cell ? `, ${cell}` : ", empty"}`}
          accessibilityRole="button"
          disabled={Boolean(cell) || result || !singlePlayerTurn}
          onPress={() => onCellPress(index)}
          style={({ pressed }) => [
            styles.cell,
            { width: cellSize, height: cellSize, backgroundColor: colors.cell },
            pressed && styles.cellPressed,
          ]}
        >
          <Text
            style={[
              styles.cellText,
              { color: cell === "X" ? colors.x : colors.o },
            ]}
          >
            {cell}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    padding: 8,
    borderRadius: 16,
  },
  cell: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  cellPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.97 }],
  },
  cellText: {
    fontSize: 42,
    fontWeight: "900",
  },
});
