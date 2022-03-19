function initialise() {
  //things which will only be done once
  canvas = document.getElementById("mycanvas"); //varibales with no keywords before (var,let etc) are global varibales
  W = canvas.width;
  H = canvas.height;
  pen = canvas.getContext("2d");
  cellSize = 44;
  score = 5; //length of snake
  game_over = false;

  //img for food object
  food_img = new Image();
  food_img.src = "assets/apple.jpg";

  //img for tropy object
  trophy = new Image();
  trophy.src = "assets/download.png";

  food = getRandomFood();

  snake = {
    init_len: 5, //initial length of snake on starting
    color: "blue",
    cells: [], //storing current co-ordinates of snake length
    direction: "right",

    createSnake: function () {
      for (var i = this.init_len; i > 0; i--) {
        this.cells.push({ x: i, y: 0 });
      }
    },

    drawSnake: function () {
      //declaring here so that we can make code modular
      for (var i = 0; i < this.cells.length; i++) {
        pen.fillStyle = this.color;
        pen.fillRect(
          this.cells[i].x * cellSize,
          this.cells[i].y * cellSize,
          cellSize - 2,
          cellSize - 2
        );
      }
    },

    updateSnake: function () {
      var headX = this.cells[0].x;
      var headY = this.cells[0].y;
      var nextX, nextY;

      //check if snake has eaten food, increase the length of snake and generate random food after that
      if (headX == food.x && headY == food.y) {
        food = getRandomFood();
        score++;
      } else {
        this.cells.pop(); //removing last element only if eaten
      }

      if (this.direction == "right") {
        nextX = headX + 1;
        nextY = headY;
      } else if (this.direction == "left") {
        nextX = headX - 1;
        nextY = headY;
      } else if (this.direction == "down") {
        nextX = headX;
        nextY = headY + 1;
      } else {
        nextX = headX;
        nextY = headY - 1;
      }

      this.cells.unshift({ x: nextX, y: nextY }); //The unshift() method adds one or more elements to the beginning of an array and returns the new length of the array.

      //preventing snake from going out
      var bottomX = Math.round(W / cellSize);
      var rightmostY = Math.round(H / cellSize);

      if (
        this.cells[0].y < 0 ||
        this.cells[0].x < 0 ||
        this.cells[0].x > bottomX ||
        this.cells[0].y > rightmostY
      ) {
        game_over = true;
      }
    },
  };
  snake.createSnake();

  function keyPressed(e) {
    if (e.key == "ArrowRight") {
      snake.direction = "right";
    } else if (e.key == "ArrowLeft") {
      snake.direction = "left";
    } else if (e.key == "ArrowDown") {
      snake.direction = "down";
    } else {
      snake.direction = "up";
    }
  }

  document.addEventListener("keydown", keyPressed);
}

function draw() {
  //to do after evey update
  pen.clearRect(0, 0, W, H);
  snake.drawSnake(); //not declaring here and calling like this to make code modular
  pen.fillStyle = food.color;
  pen.drawImage(
    food_img,
    food.x * cellSize,
    food.y * cellSize,
    cellSize - 2,
    cellSize - 2
  ); //drawing food

  pen.drawImage(trophy, 18, 20, cellSize + 15, cellSize + 15); //drawing trophy
  pen.fillStyle = "blue";
  pen.font = "19px Roboto";
  pen.fillText(score, 39, 40); //drawing text in trophy
}

function update() {
  //updating canvas
  snake.updateSnake();
}
function getRandomFood() {
  var foodX = Math.round((Math.random() * (W - cellSize)) / cellSize); //generating b/w 0 to W-cellWidth
  var foodY = Math.round((Math.random() * (H - cellSize)) / cellSize);

  var food = {
    x: foodX,
    y: foodY,
    color: "red",
  };

  return food;
}

function gameLoop() {
  //running loop unless game is over
  if (game_over == true) {
    alert("Game Over");
    clearInterval(f);
    return;
  }
  draw();
  update();
}

initialise();

var f = setInterval(gameLoop, 150);
