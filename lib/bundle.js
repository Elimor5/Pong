/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Vector {
  constructor( x = 0, y = 0 ) {
    this.x = x;
    this.y = y;
  }

  getLength() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  setLength() {
    const factor = value / this.getLength;
    this.x *= factor;
    this.y *= factor;
  }
}
/* unused harmony export Vector */



/* harmony default export */ __webpack_exports__["a"] = (Vector);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vector_js__ = __webpack_require__(0);


class Rectangle {
  constructor(w,h, x = 0, y = 0) {
    this.pos = new __WEBPACK_IMPORTED_MODULE_0__vector_js__["a" /* default */](x, y);
    this.size = new __WEBPACK_IMPORTED_MODULE_0__vector_js__["a" /* default */](w,h);
    this.width = w;
    this.height = h;
  }


  createPaddle(ctx) {

    ctx.fillStyle = "white";
    ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    ctx.strokeStyle="orange";
    ctx.strokeRect(this.pos.x, this.pos.y, this.width, this.height);
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Rectangle);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vector_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__rectangle_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__player_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ball_js__ = __webpack_require__(4);






const compScoreboard = document.getElementById("comp-scoreboard");
const humanScoreboard = document.getElementById("human-scoreboard");


class Pong {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.board = new __WEBPACK_IMPORTED_MODULE_1__rectangle_js__["a" /* default */](this.canvas.width, this.canvas.height);
    this.computer = new __WEBPACK_IMPORTED_MODULE_2__player_js__["a" /* default */](15, this.canvas.height / 2, "Computer");
    this.human = new __WEBPACK_IMPORTED_MODULE_2__player_js__["a" /* default */](this.canvas.width - 35, this.canvas.height / 2, "Player");
    this.ballType = 0;
    this.ball = new __WEBPACK_IMPORTED_MODULE_3__ball_js__["a" /* default */](30, 250, 250);
    this.paused = true;
    this.update(0.01);
    this.collisions = 0;
    this.animate();
    this.hitPaddle = new Audio("sounds/hit_paddle.wav");
    this.wallBounce = new Audio("sounds/hit_paddle.wav");
    this.goal = new Audio("sounds/goal2.wav");
    this.goal.volume = 0.1;
    console.log(this.wallBounce.src);
    this.mute = false;

  }

  animate() {
    let lastTime = 0;
    const callback = (milliseconds) => {
      if (lastTime && !this.paused) {
        this.update((milliseconds - lastTime) / 800); //reconvert back to seconds
      } else if (this.paused) {

      }
      lastTime = milliseconds;
      requestAnimationFrame(callback);
    };
    callback(800);
  }


  reset() {
    const { changeBall } = this.ball;
    let { pos, velocity, div } = this.ball;

    pos.x = this.canvas.width / 2;
    pos.y = this.canvas.height / 2;
    velocity.x = changeBall(this.ballType % 4).xVel * (Math.random() > 0.5 ? 1 : -1);
    velocity.y = changeBall(this.ballType % 4).yVel * (Math.random() - 0.5 ? 1 : -1);

    this.canvas.style['background-image'] = changeBall(this.ballType % 4).background;
    div.style['background-image'] = changeBall(this.ballType % 4).ballType;
    this.ballType++;

    this.update(0.01);
    this.paused = true;
    this.collisions = 0;
  }

  draw() {
    const {ctx, ball, computer, human, board } = this;

    ctx.clearRect(0, 0, board.width, board.height);
    ball.createball(ctx);
    computer.createPaddle(ctx);
    human.createPaddle(ctx);
  }


  maintainInBounds() {
    const {x,y} = this.ball.pos;
    const { radius, velocity } = this.ball;

    if ( y < 0 + radius/2 ) {
      if ( velocity.y < 0 ) {
        velocity.y = -velocity.y;
        if (!this.mute) { this.wallBounce.play(); }
      }
    } else if ( y > this.canvas.height - radius ) {
        if (velocity.y > 0 ) {
          velocity.y = -velocity.y; }
          if (!this.mute) { this.wallBounce.play(); }
    }
  }

  collision(object) {
    const  { x, y } = object.pos;
    const { computer, human } = this;
    const { radius, pos } = this.ball;
    const upperBound = y;
    const lowerBound = y + object.height;
    const leftBound = x;
    const rightBound = x + object.width;

    let ballPos;
    object === human ? ballPos = pos.x + radius  : ballPos = pos.x

    if ((( object === computer && rightBound >= ballPos ) || (object === human && (leftBound < ballPos && ballPos < rightBound)  )) &&
        (upperBound - (radius / 2) < pos.y  && pos.y < lowerBound - (radius / 2)) ) {
      this.collisions++;
      if (!this.mute) { this.hitPaddle.play(); }
      return true;
    }

  }

  compAI() {
    const { computer, ball, collisions } = this;
    // this.computer.pos.y = this.ball.pos.y;

    if (collisions === 0) {
      computer.pos.y = ball.pos.y * 1;
    } else if (collisions > 7 && collisions % 3 === 0) {
      computer.pos.y = ball.pos.y * computer.velocity;
    } else {
      computer.pos.y = ball.pos.y * 1;
    }
  }

  calculateScore() {
    const {x,y} = this.ball.pos;
    const { radius } = this.ball;
    const { human, computer, canvas } = this;

    if ( x < 0  ) {
        this.human.score++;
        if (!this.mute) {
          this.goal.play();
          setTimeout(() => {
            this.goal.load();
          }, 2000);
         }
        humanScoreboard.innerHTML = human.score;
        this.reset();
    } else if ( x > canvas.width ) {
        this.computer.score++;
        if (!this.mute) {
          this.goal.play();
          setTimeout(() => {
            this.goal.load();
          }, 2000);
        }
        compScoreboard.innerHTML = computer.score;
        this.reset();
    }
  }

  modalView() {
    const modal = document.getElementById("modal");

    if (this.paused) {
      modal.classList.add("modal-open");
      modal.classList.remove("modal-closed");
    } else {
      modal.classList.remove("modal-open");
      modal.classList.add("modal-closed");
    }
  }

  gameOver() {
    const { computer, human } = this;

    if (computer.score === 10 || human.score === 10) {
        const winner = computer.score === 10 ? computer : human;
      const gameOverModal = document.getElementById("game-over-modal");
        gameOverModal.classList.remove("modal-closed");
        gameOverModal.classList.add("modal-open");
        document.getElementById("game-over-message").innerHTML = `${winner.name} wins!`;
        setTimeout(() =>{
          gameOverModal.classList.remove("modal-open");
          gameOverModal.classList.add("modal-closed");
        }, 3000);
        human.score = 0;
        humanScoreboard.innerhtml = human.score;
        computer.score = 0;
        compScoreboard.innerHTML = computer.score;

    }
  }

  handlePaddleCollision() {
    const { velocity } = this.ball;
    const { computer, human } = this;

    if (this.collision(human)) {
      if (velocity.x > 0) {
        velocity.x = -velocity.x * 1.1;
        velocity.y = velocity.y * 1.1;
        computer.velocity *= 1;
      }
    } else if (this.collision(computer)) {
        if (velocity.x < 0) {
          velocity.x = -velocity.x * 1.02;
          velocity.y = velocity.y * 1.05;
          computer.velocity *= .99;
        }
      }
  }

  update(deltaTime) {
    const { pos, velocity, } = this.ball;
    //ball movement relative to time difference
    pos.x += velocity.x * deltaTime;
    pos.y += velocity.y * deltaTime;

    this.draw();
    this.maintainInBounds();
    this.calculateScore();
    this.modalView();
    this.handlePaddleCollision();
    this.compAI();
    this.gameOver();
  }
}

  const canvas = document.getElementById("pong");
  const pong = new Pong(canvas);
  const whitespace = document.getElementById("container");
  const sound = document.getElementById("sound");

  whitespace.addEventListener(("mousemove"), (e) => {
    if (e.offsetY - pong.human.height >= 0) {
      pong.human.pos.y = e.offsetY - pong.human.height;
    }
  });

  document.addEventListener(("keydown"),(e) => {
      pong.paused = !pong.paused;
      pong.modalView();
  });

  canvas.addEventListener(("click"),(e) => {

    pong.paused = !pong.paused;
    pong.modalView();
  });

  sound.addEventListener("click",(e) => {

    if (pong.mute){
      pong.mute = false;
      sound.classList.add("fa-volume-off");
      sound.classList.remove("fa-volume-down");
    }
    else if (!pong.mute) {
      pong.mute = true;
      sound.classList.add("fa-volume-down");
      sound.classList.remove("fa-volume-off");
    }
  });


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__rectangle_js__ = __webpack_require__(1);


class Player extends __WEBPACK_IMPORTED_MODULE_0__rectangle_js__["a" /* default */] {
  constructor(x,y,name) {
    super(20,100, x, y);
    this.score = 0;
    this.velocity = 1;
    this.name = name;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Player);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vector_js__ = __webpack_require__(0);


class Ball {
  constructor(r, velX, velY) {
    this.pos = new __WEBPACK_IMPORTED_MODULE_0__vector_js__["a" /* default */](300,200);
    this.radius = r;
    this.velocity = new __WEBPACK_IMPORTED_MODULE_0__vector_js__["a" /* default */](velX, velY);
    this.div = document.getElementById("ball");
  }

  createball() {
    this.div.style.top = `${this.pos.y}px`;
    this.div.style.left = `${this.pos.x}px`;
  }

  changeBall(i) {
    const ballTypes = [
      {
        background: 'url("img/background/volleyball_court.png")',
        ballType: 'url("./img/volleyball.gif")',
        pausedBallType: 'url("./img/volleyball.jpg")',
        xVel: 450,
        yVel: 250,
      },
      {
        background: 'url("img/background/basketball_court2.png")',
        ballType: 'url("./img/basketball.gif")',
        pausedBallType: 'url("./img/basketball.jpg")',
        xVel: 450,
        yVel: 250,

      },
      {
        background: 'url("img/background/soccer_field.png")',
        ballType: 'url("./img/soccer_ball.gif")',
        pausedBallType: 'url("./img/soccer.jpg")',
        xVel: 450,
        yVel: 250,

      },
      {
        background: 'url("img/background/football_field.png")',
        ballType: 'url("./img/football.gif")',
        pausedBallType: 'url("./img/football.jpg")',
        xVel: 450,
        yVel: 250,
      },

    ];

    return ballTypes[i];
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Ball);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map