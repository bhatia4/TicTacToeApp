import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Switch,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Player = "X" | "O";
type Cell = Player | null;
type Mode = "single" | "two";

const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
] as const;

const EMPTY_BOARD: Cell[] = Array(9).fill(null);

function getWinner(board: Cell[]): Player | "tie" | null {
  for (const [first, second, third] of WINNING_LINES) {
    if (
      board[first] &&
      board[first] === board[second] &&
      board[first] === board[third]
    ) {
      return board[first];
    }
  }

  return board.every(Boolean) ? "tie" : null;
}

function minimax(board: Cell[], maximizing: boolean, depth: number): number {
  const result = getWinner(board);
  if (result === "O") return 10 - depth;
  if (result === "X") return depth - 10;
  if (result === "tie") return 0;

  const scores = board.reduce<number[]>((moves, cell, index) => {
    if (cell) return moves;
    const nextBoard = [...board];
    nextBoard[index] = maximizing ? "O" : "X";
    moves.push(minimax(nextBoard, !maximizing, depth + 1));
    return moves;
  }, []);

  return maximizing ? Math.max(...scores) : Math.min(...scores);
}

function findComputerMove(board: Cell[]): number {
  let bestScore = Number.NEGATIVE_INFINITY;
  let bestMove = board.findIndex((cell) => cell === null);

  board.forEach((cell, index) => {
    if (cell) return;
    const nextBoard = [...board];
    nextBoard[index] = "O";
    const score = minimax(nextBoard, false, 0);
    if (score > bestScore) {
      bestScore = score;
      bestMove = index;
    }
  });

  return bestMove;
}

export default function Index() {
  const { width } = useWindowDimensions();
  const [board, setBoard] = useState<Cell[]>(EMPTY_BOARD);
  const [mode, setMode] = useState<Mode>("single");
  const [xTurn, setXTurn] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const result = getWinner(board);
  const colors = darkMode ? darkColors : lightColors;
  const boardSize = Math.min(width - 40, 360);
  const cellSize = (boardSize - 32) / 3;

  const resetBoard = (nextMode = mode) => {
    setBoard([...EMPTY_BOARD]);
    setXTurn(true);
    setMode(nextMode);
  };

  const playMove = (index: number) => {
    if (board[index] || result || (!xTurn && mode === "single")) return;

    const nextBoard = [...board];
    nextBoard[index] = xTurn ? "X" : "O";
    setBoard(nextBoard);

    if (getWinner(nextBoard)) {
      setXTurn(!xTurn);
      return;
    }

    if (mode === "single") {
      const computerMove = findComputerMove(nextBoard);
      if (computerMove >= 0) {
        const computerBoard = [...nextBoard];
        computerBoard[computerMove] = "O";
        setBoard(computerBoard);
      }
      setXTurn(true);
    } else {
      setXTurn(!xTurn);
    }
  };

  const status = result
    ? result === "tie"
      ? "It's a tie!"
      : `${result} wins!`
    : mode === "single"
      ? "Your turn, X"
      : `${xTurn ? "X" : "O"}'s turn`;

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.background }]}
    >
      <StatusBar style={darkMode ? "light" : "dark"} />
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={[styles.title, { color: colors.text }]}>
              Tic Tac Toe
            </Text>
          </View>
          <View style={styles.themeControl}>
            <Text style={[styles.themeLabel, { color: colors.muted }]}>
              Dark
            </Text>
            <Switch
              accessibilityLabel="Toggle dark mode"
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: colors.switchTrack, true: colors.accent }}
              thumbColor={darkMode ? colors.background : colors.switchThumb}
            />
          </View>
        </View>

        <View style={[styles.modePanel, { backgroundColor: colors.panel }]}>
          <Text style={[styles.sectionLabel, { color: colors.muted }]}>
            PLAY MODE
          </Text>
          <View
            style={[styles.modePicker, { backgroundColor: colors.background }]}
          >
            {(["single", "two"] as const).map((option) => {
              const selected = mode === option;
              return (
                <Pressable
                  key={option}
                  accessibilityRole="radio"
                  accessibilityState={{ selected }}
                  onPress={() => resetBoard(option)}
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
        </View>

        <View style={styles.statusBlock}>
          <Text style={[styles.status, { color: colors.text }]}>{status}</Text>
          <Text style={[styles.statusHint, { color: colors.muted }]}>
            Choose a cell to make your move
          </Text>
        </View>

        <View
          style={[
            styles.board,
            {
              width: boardSize,
              height: boardSize,
              backgroundColor: colors.grid,
            },
          ]}
        >
          {board.map((cell, index) => (
            <Pressable
              key={index}
              accessibilityLabel={`Cell ${index + 1}${cell ? `, ${cell}` : ", empty"}`}
              accessibilityRole="button"
              disabled={
                Boolean(cell) ||
                Boolean(result) ||
                (!xTurn && mode === "single")
              }
              onPress={() => playMove(index)}
              style={({ pressed }) => [
                styles.cell,
                {
                  width: cellSize,
                  height: cellSize,
                  backgroundColor: colors.cell,
                },
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

        <Pressable
          accessibilityRole="button"
          onPress={() => resetBoard()}
          style={({ pressed }) => [
            styles.restartButton,
            { backgroundColor: colors.accent },
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={[styles.restartText, { color: colors.buttonText }]}>
            Start / Restart
          </Text>
        </Pressable>

        <Text style={[styles.footer, { color: colors.muted }]}>
          X goes first
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: -6,
  },
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
  themeControl: {
    alignItems: "center",
    gap: 4,
  },
  themeLabel: {
    fontSize: 12,
    fontWeight: "700",
  },
  modePanel: {
    width: "100%",
    maxWidth: 520,
    borderRadius: 12,
    marginTop: 28,
    padding: 14,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.5,
    marginBottom: 9,
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
  statusBlock: {
    alignItems: "center",
    marginVertical: 24,
  },
  status: {
    fontSize: 21,
    fontWeight: "800",
  },
  statusHint: {
    fontSize: 13,
    marginTop: 5,
  },
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
  restartButton: {
    width: "100%",
    maxWidth: 360,
    alignItems: "center",
    borderRadius: 10,
    marginTop: 24,
    paddingVertical: 15,
  },
  restartText: {
    fontSize: 15,
    fontWeight: "800",
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  footer: {
    fontSize: 12,
    marginTop: 16,
  },
});

const lightColors = {
  background: "#F4F1EA",
  panel: "#E8E3D8",
  grid: "#1E2933",
  cell: "#F9F7F2",
  text: "#17212B",
  muted: "#69747B",
  accent: "#D65A3A",
  buttonText: "#FFFFFF",
  x: "#D65A3A",
  o: "#267A78",
  switchTrack: "#C6C9C4",
  switchThumb: "#FFFFFF",
};

const darkColors = {
  background: "#17212B",
  panel: "#22303B",
  grid: "#0D151C",
  cell: "#2B3A46",
  text: "#F6F1E8",
  muted: "#A8B2B5",
  accent: "#E27450",
  buttonText: "#17212B",
  x: "#F08B67",
  o: "#63C0B1",
  switchTrack: "#42525D",
  switchThumb: "#F6F1E8",
};
