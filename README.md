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
├── README.md               # Project documentation
├── ROADMAP.md              # Development roadmap
├── package.json            # Node dependencies (if needed)
└── games/                  # All game directories
    ├── phaser-intro/       # Phaser framework introduction
    ├── snake/              # Snake game
    └── breakout/           # Breakout game
```

## How to Add a New Game

1. Create a new directory inside `games/` folder
2. Add an `index.html` file inside the directory
3. Add a back button linking to `../../index.html`
4. Add the game to the `games` array in the main `index.html` with path `games/your-game/index.html`

## Running Games

Open `index.html` in a browser and click on any game card to play.
