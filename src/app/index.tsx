import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { GameActionButton } from "@/components/game-action-button";
import { GameBoard } from "@/components/game-board";
import { GameControls } from "@/components/game-controls";
import { GameHeader } from "@/components/game-header";
import { GameStatus } from "@/components/game-status";
import {
    EMPTY_BOARD,
    findComputerMove,
    getWinner,
    type Cell,
    type Mode,
} from "@/game";
import { darkColors, lightColors } from "@/theme";

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
  const hasMoves = board.some((cell) => cell !== null);
  const actionLabel = result ? "New Game" : "Reset Board";

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
        <GameHeader colors={colors} />
        <GameControls
          colors={colors}
          darkMode={darkMode}
          mode={mode}
          onDarkModeChange={setDarkMode}
          onModeChange={resetBoard}
        />
        <GameStatus colors={colors} status={status} />
        <GameBoard
          board={board}
          boardSize={boardSize}
          cellSize={cellSize}
          colors={colors}
          result={Boolean(result)}
          singlePlayerTurn={mode === "two" || xTurn}
          onCellPress={playMove}
        />
        <GameActionButton
          colors={colors}
          disabled={!hasMoves}
          label={actionLabel}
          onPress={() => resetBoard()}
        />
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
});
