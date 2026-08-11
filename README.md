TicTacToe application built for iOS and android.
Can play as single player (VS Computer) or dual players. Game has dark mode.
Built using GitHub Copilot and IDE Visual Studio Code, using [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## What's implemented:

- **Ported from application built in JavaFX**: Logic and initial UI influence from [TicTacToe app repo code](https://github.com/bhatia4/TicTacToe/).
- **Dynamic Theme Switching**: Click the checkbox to toggle between light and dark modes
- **Disabled web platform option in Expo project**: Modified configuration file app.json. Added platforms array with only "ios" and "android" (removed "web" from array)

## Prompts:

- Implement TicTacToe app using Expo-aware TypeScript and React code. Go thru and use standard Expo SDK elements. Look at and copy UI and logic code of existing TicTacToe application (built using Java FX). Use below github link:
  https://github.com/bhatia4/TicTacToe
- **bug fix**: not seeing third colum in tic tac toe grid
- **disable opening app on changes (manual user testing request)**: no need to auto run app as I will run tests manually
- remove extra padding on top of the screen
- remove "Classic Game" label and reduce top padding some more

## Coding LLMs:

GPT-5.6 Luna <br/>

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
