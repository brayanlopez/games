# Games Repository

A collection of games and experiments built with HTML, CSS, and JavaScript.

## Current Games

- **Phaser Intro** - Introduction to Phaser game framework
- **Snake** - Classic Snake game with score tracking
- **Breakout** - Classic breakout game with customizable paddle color

## Project Structure

```
games/
├── index.html              # Main index page with dynamic game list
├── README.md              # Project documentation
├── ROADMAP.md             # Development roadmap
├── package.json           # Node dependencies and scripts
├── vitest.config.js       # Vitest configuration
├── test/                  # Unit tests
│   ├── snake-logic.test.js
│   ├── breakout-logic.test.js
│   └── comprehensive.test.js
└── games/                 # All game directories
    ├── phaser-intro/      # Phaser framework introduction
    ├── snake/             # Snake game
    │   ├── snakeLogic.js  # Extracted game logic (tested)
    │   └── Snake.js       # Main game file
    └── breakout/          # Breakout game
        ├── gameLogic.mjs   # Extracted game logic (tested)
        └── index.mjs      # Main game file
```

## Testing

The project uses Vitest with jsdom environment for unit testing.

### Run Tests
```bash
npm test              # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
```

### Coverage Thresholds
- Statements: 20%
- Branches: 15%
- Functions: 40%
- Lines: 18%

### Test Structure
- Logic modules (`snakeLogic.js`, `gameLogic.mjs`) have 90%+ coverage
- Main game files use the tested logic modules
- Tests cover game mechanics, collision detection, and edge cases

## How to Add a New Game

1. Create a new directory inside `games/` folder
2. Extract game logic into a separate `.js` or `.mjs` file for testing
3. Add an `index.html` file inside the directory
4. Add a back button linking to `../../index.html`
5. Add the game to the `games` array in the main `index.html`
6. Create unit tests in the `test/` folder

## Running Games

Open `index.html` in a browser and click on any game card to play.
