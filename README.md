## SPORT PONG

### Background:

Inspired by the classic ATARI game, Sports pong uses HTML5 Canvas, CSS and Vanilla JavaScript to create a sports themed interactive pong game.

### Technical Implementation

I used HTML5, CSS, Canvas and JavaScript. The ball and the board are HTML elements, while the paddles are canvas elements. Using CSS, I styled the HTML elements and paddles to change their background images after each subsequent point. I used vector math to keep track of all of the objects, maintaining the ball and paddles in bounds and track collisions between the paddles and the ball. Vector math was also used to animate objects. The computer AI was designed to make the computer more vulnerable as the amount of collisions with the paddles went up and the velocity of the ball increases.


## Future Plans

A few features I plan to add:
- An "on fire" mode after one player scores 3 points in a row
- Adding multiple balls to make the game more difficult
- Adding goals/baskets/uprights to give the user more points if they get the ball to land in the specified zone
- Turrets to fire bullets, rendering the opponent paddle frozen for a second or two if they are hit.
