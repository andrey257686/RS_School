# RSS Nonograms
## Task
You are to implement a classic game — Nonograms
Here you can learn how to solve the nonogram

## Game rules
Nonograms is a puzzle game to reveal a hidden picture by looking at the number clues. The clues are given at the top and left side of the grid. Each number in these clue defines a block of black cell. A number indicates an unbroken line of black cells, and they are in the same order as the lines. These puzzles are often black and white—describing a binary image—but they can also be colored.

In the current task you have to implement only binary version of the game

## Main functional requirements
### Basic (required):

- initially, body in the index.html file must be empty (only script tag is allowed), all necessary elements are generated using JS
- the design should be adaptive (or responsive) from (500px <= width). It is acceptable to change the appearance for the mobile version (for example, hide the buttons in the burger menu)
- the default size of the frame is 5x5. The clues are given at the top and left side of the grid. The sequence of numbers must be logically arranged and help the player solve the nonogram
- for game field: every 5 cells in a rows and columns should be divided by divider (bold line). For clues: every 5 cells in a rows should be divided by divider (for left clues); every 5 cells in a columns should be divided by divider (for top clues). Clues should be divided from game field by bold line.
- a player is able to fill in a cell in the grid, using left mouse-click. On a click event, trigger the functionality of changing the color of the grid to dark (black). When player clicks on dark cell - it will change to empty (white).
- end game when players fill all black cells correctly according to the clues. On a successful game solution, display "Great! You have solved the nonogram!" (in case you missed stop-watch implementation)

### Advanced:

- the game should have at least 5 templates for easy level (5x5). Players should be able to choose the picture they wish to solve, possibly through a list of items. You might implement it in two ways: either make a list of possible templates with images(solved puzzles) or using template names (without pictures), or using both images and names. User should also easy understand what is the level of image.
- a player is able to fill in a cell in the grid changing the color of the grid to crossed-cell(X) using right mouse-click. Context menu should not appear. Filling empty cells with X is not obligatory to win the game.
- the game can be restarted (reset) without reloading the page (for example, by clicking on button Reset game). After clicking the button the level of game and template (picture) should not be changed - it means that only filled cells will be reset. Otherwise the player can change game template or game level (for example, you could implement menu with options) without reloading the page.
- display the game duration in format XX:XX, stop-watch will start after first click on field (not on clues). "Great! You have solved the nonogram in ## seconds!" is displayed after winning.
- the game should include sound effects for events such as mark a cell as black, flagging a cell as X, flagging a cell as empty and win game.
- the staging of the game is saved (for example, using localStorage) by clicking on button "Save game", so that when player clicks on button "continue last game", he can continue playing from where he left off.

### Additional (to get extra points):

- dark/light themes of the game. Changing the theme implies a change in the entire color scheme of the application, including the background color, cell colors, counters, buttons etc.
- implement three levels of difficulty in the game: easy (5x5), medium (10x10), and hard (15x15). Each level should vary in the size of the game board and the complexity of the main template (pictures).
- the latest 5 win results are saved in the high score table. Table is sorted by time of the game using XX:XX format (for example, using LocalStorage). Every line should include: solved puzzle (either naming, or picture, or both); difficulty; stop-watch result.
- implement button "random game". When player clicks on button - the random template appears (both template and level must be chosen randomly by algorithm).
- implement "Solution" button near the field. When player clicks the button - the field will be filled in cells with right solution. Usage of the button doesn't mean winning and will not be recorded into winning table.

[LINK TO DEPLOY](https://nonograms-andrey257686.netlify.app/)
