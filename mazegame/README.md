# Maze Game Documentation

## Overview
The Maze Game is a simple yet thrilling game where players navigate a dot through a maze to reach a goal while avoiding walls. The game features jumpscares and sound effects to enhance the experience.

## Project Structure
```
mazegame
├── assets
│   ├── collide.mp3        # Sound effect for collisions
│   └── snnk.mp4           # Video for jumpscare
├── css
│   └── styles.css         # Styles for the game
├── js
│   ├── stage1.js          # JavaScript for Stage 1
│   └── stage2.js          # JavaScript for Stage 2
├── stage1.html            # HTML for Stage 1
├── stage2.html            # HTML for Stage 2
└── README.md              # Project documentation
```

## How to Play
1. Open `stage1.html` in a web browser to start the game.
2. Use the arrow keys or WASD keys to move the dot.
3. Navigate the dot to the green goal without touching the walls.
4. If you collide with a wall, a jumpscare video will play, and the game will end.
5. If you reach the goal, you will win and automatically proceed to Stage 2.

## Stage 1
- The first stage features a basic maze layout with walls and a goal.
- Players must avoid walls while trying to reach the goal.

## Stage 2
- The second stage will introduce new maze configurations and challenges.
- Similar mechanics to Stage 1 will be implemented.

## Assets
- **collide.mp3**: Sound effect played upon collision with walls.
- **snnk.mp4**: Video played during the jumpscare event.

## Styles
- The game is styled using `styles.css`, which includes styles for the body, canvas, and jumpscare video.

## Future Improvements
- Additional stages with varying difficulty levels.
- Enhanced graphics and animations.
- More sound effects and interactive elements.

## License
This project is open-source and can be modified and distributed freely.