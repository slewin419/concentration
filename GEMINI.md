# Concentration Game — Project Instructions

This document provides a comprehensive overview of the Concentration codebase, its architecture, key technologies, building/testing commands, and development conventions to assist future development and maintenance.

---

## Project Overview

**Concentration** is a classic card-matching memory game built using React and styled with Sass. The objective is to find matching pairs of technology logos (such as React, Node.js, Sass, HTML5, etc.) in a randomized grid of cards.

### Architecture and State Flow
*   **Local Component State:** The core game state is centrally managed within the stateful `Game.js` component. It tracks:
    *   `deck`: An array of card objects (id, image name, flipped state, matched state).
    *   `pendingMatch`: Currently selected cards waiting to be evaluated as a pair.
    *   `gameStarted`: Boolean indicating if the first card has been clicked.
    *   `gameComplete`: Boolean indicating if all matches have been found.
*   **Deck Management Helper (`src/lib/Deck.js`):** Implements class `Deck` and exportable functional utilities to build the deck, flip cards, and identify matching pairs.
*   **Unused Files (Redux/Context skeleton):**
    *   `src/ConcentrationContext.js` contains a Context provider/consumer skeleton.
    *   `src/reducers/reducers.js` and `src/actions/DeckActions.js` contain some action creators and reducer skeletons.
    *   *Note:* The application does **not** currently use these; it is entirely driven by local component state inside `Game.js`.

---

## Directory Structure

```
C:\Users\Shaun\Projects\concentration\
├───package.json            # NPM dependencies and build scripts
├───yarn.lock                # Yarn lockfile
├───README.md                # Standard Create React App documentation
├───public\                  # Public static assets
│   ├───index.html           # Main HTML document
│   └───manifest.json        # Web app manifest
└───src\
    ├───App.js               # Root component shell
    ├───App.scss             # Layout styling for App
    ├───App.test.js          # App component smoke test
    ├───ConcentrationContext.js # [Unused] React Context Provider skeleton
    ├───index.css            # Global CSS styles
    ├───index.js             # Application entry point
    ├───serviceWorker.js     # Progressive Web App service worker
    ├───actions\
    │   └───DeckActions.js   # [Unused] Redux action creator skeletons
    ├───components\          # Core React components
    │   ├───Board.js         # Component that renders the card grid
    │   ├───Card.js          # Individual card representation
    │   ├───Game.js          # Controller component managing game logic
    │   └───Timer.js         # Game duration timer
    ├───images\              # Technology icon image files (.png)
    ├───lib\                 # Utility libraries
    │   └───Deck.js          # Game deck creation, shuffling, and matching helpers
    └───reducers\
        └───reducers.js      # [Unused] Reducer function skeletons
```

---

## Core Technologies

*   **React (v16.7.0):** Uses class-based components, React lifecycles (`componentWillReceiveProps` inside `Timer.js`), and React portals or context concepts (skeleton files).
*   **Create React App (react-scripts v2.1.3):** The project is bootstrapped and managed with CRA-scripts.
*   **Sass (node-sass v4.11.0):** Native compilation of `.scss` files into CSS.
*   **fisher-yates-shuffle:** Shuffles the built deck of cards in `Deck.js`.
*   **hh-mm-ss:** Formats seconds into a human-readable duration inside `Timer.js`.
*   **gh-pages:** Support for automated publishing to GitHub pages.

---

## Key Modules and Components

### 1. `src/lib/Deck.js`
Responsible for the game deck business logic.
*   **`Deck` Class:** Automatically instantiates and builds a shuffled array of 36 cards (18 unique technology images in pairs of 2, identified by `-1` and `-2` suffixes).
*   **`flipCard(deck, id, direction)`:** Flips a target card `up` (true) or `down` (false).
*   **`flipAll(deck, direction)`:** Utility to flip all cards in the deck.
*   **`makePair(deck, match)`:** Flags two card IDs as matched (`matched = true`).
*   **`isPair(card1, card2)`:** Regular-expression based comparison (`/(\w*)-\d{1,2}/`) to check if the prefix names of two card IDs are identical.
*   **`isGameOver(deck)`:** Checks if every card in the deck is matched.

### 2. `src/components/Game.js`
Acts as the central controller of the gameplay loop.
*   **State:** Holds `deck`, `pendingMatch`, `gameStarted`, and `gameComplete`.
*   **`handleClick(e)`:** Captures click events bubbled from the Board. If a valid card is clicked, starts the game timer and flips the card.
*   **`handleCardPicked(card1, card2, deck, pendingMatch)`:** Handles match-checking logic. If matching, keeps them flipped and flags them as pairs. If not, flips them back down after `TURN_DELAY` (800ms) with input temporarily blocked.
*   **`newGame()`:** Resets all states and instantiates a new shuffled `Deck`.

### 3. `src/components/Board.js`
Renders the deck grid. It receives `deck` from `Game` and maps over the array to instantiate `Card` components, passing click handlers upstream to `Game`.

### 4. `src/components/Card.js`
Stateless representation of an individual card. Displays front or back depending on the `flipped` and `matched` properties. Uses CSS class mappings corresponding to technology names (e.g., `.react`, `.sass`, etc.) to display appropriate back background-images from `src/images/`.

### 5. `src/components/Timer.js`
Responsible for tracking time passed since the game started. Uses standard `setInterval` ticking every 1,000ms, formatted using the `hh-mm-ss` package.

---

## Building, Running, and Testing Commands

The project supports the standard Create React App script commands.

### Start the Local Development Server
Launches the app on a local port (usually `http://localhost:3000`).
```bash
yarn start
# or
npm start
```

### Build for Production
Compiles and bundles the application for production inside the `build/` directory.
```bash
yarn build
# or
npm run build
```

### Run Tests
Runs the Jest test suite.
```bash
yarn test
# or
npm test
```
*To run the tests in non-interactive CI mode (for scripting and headless checks), use:*
*   **PowerShell/Windows:**
    ```powershell
    $env:CI="true"; yarn test
    ```
*   **Command Prompt/CMD:**
    ```cmd
    set CI=true&& yarn test
    ```

### Deploy to GitHub Pages
Builds the app and automatically pushes the optimized build to the configured `gh-pages` branch.
```bash
yarn deploy
# or
npm run deploy
```

---

## Development & Styling Conventions

1.  **React Component Style:** Use React class-based components following standard ES6 class syntax.
2.  **Asset Additions:** The deck's visual options are populated using the `IMAGES` array in `src/lib/Deck.js`. If you add a new logo/card option:
    *   Add the image file (PNG format) to `src/images/`.
    *   Add the CSS rule for that image in `src/App.scss` so the back side can resolve the background image.
    *   Append the base name of the image to the `IMAGES` array in `src/lib/Deck.js`.
3.  **Local State vs. Redux/Context:** Keep component-scoped state within `Game.js` unless migrating the codebase to use Redux or React Context, at which point ensure `ConcentrationContext.js` and Reducers are fully implemented and integrated.
4.  **Linting and Standards:** Code style inherits from `eslint-config-react-app`. Avoid mutating state directly; always use React's `setState`.
