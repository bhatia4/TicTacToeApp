TicTacToe application built for iOS and android.
Can play as single player (VS Computer) or dual players. Game has dark mode.
Built using GitHub Copilot and IDE Visual Studio Code, using [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## What's implemented:

- **Ported from application built in JavaFX**: Logic and initial UI influence from [TicTacToe app repo code](https://github.com/bhatia4/TicTacToe/).
- **Dynamic Theme Switching**: Click the checkbox to toggle between light and dark modes
- **Difficulty levels to choose from**: Add difficulty (Easy, medium or Unbeatable) to give single players dynamic challenge progression
- **Disabled web platform option in Expo project**: Modified configuration file app.json. Added platforms array with only "ios" and "android" (removed "web" from array)

## Prompts:

- Implement TicTacToe app using Expo-aware TypeScript and React code. Go thru and use standard Expo SDK elements. Look at and copy UI and logic code of existing TicTacToe application (built using Java FX). Use below github link:
  https://github.com/bhatia4/TicTacToe
- **bug fix**: not seeing third colum in tic tac toe grid
- **disable opening app on changes (manual user testing request)**: no need to auto run app as I will run tests manually
- remove extra padding on top of the screen
- remove "Classic Game" label and reduce top padding some more
- remove index header and "X goes first" footer
- can we hide the native navigation header?
- remove the text "Choose a cell to make your move" and its subsection. Also move Dark toggle to be under the "Play mode" section. Rename to "Dark Mode"
- right align the dark mode toggle and text
- add some padding above toggle. Remove the "Play mode" header text
- Make the bottom button more context aware. Rename it to "Reset board" or "New Game". Disable it befoe game round start
- go thru index.tsx file and based on typescript coding standards and whats on expo docs, split the now big code file across multiple TypeScript files - .ts or .tsx modules, export functions, components, or types. Make dedicated files for logic, utils, UI components.
- Under dark mode toggle, add difficulty dropdown or segmented control (Easy, medium or Unbeatable) to give single players dynamic challenge progression. Hide this control in two player mode
- move segmented control above dark mode toggle. Make its font size same as player mode segment control
- make android app use icon.png as app icon
- use @file:splash-icon.png as app start splash screen. ensure splash screen shown for 3 secs

## Coding LLMs:

GPT-5.6 Luna <br/>
Raptor mini

## Screenshot(s)

## Build steps:

**note**: using Expo 54.0.0 as Expo Go app on App store does nto support higher versions.

```bash
npm install
```

## Run game:

- Use following command to test on physical device:

  ```bash
  npx expo start -c
  ```

- For emulator / simulator device. Use on of below commands depending on if android or iOS.
  - For android emulator:

  ```bash
  expo run:android
  ```

  - For iOS simulator:

  ```bash
  expo run:ios
  ```
