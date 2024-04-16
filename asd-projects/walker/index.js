/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var KEY = {
    ENTER: 13,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    A: 65,
    W: 87,
    D: 68,
    S: 83,
  }
  // Game Item Objects
  var walker =
  {
    positionX: 0,
    speedX: 0,
    positionY: 0,
    speedY: 0,
  }
  var runner =
  {
    positionX: 660 - 50,
    speedX: 0,
    positionY: 440 - 50,
    speedY: 0,
  }
  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  //$(document).on('keyup', handleKeyUp);
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem();
    redrawGameItem();
    wallCollision();
  }

  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.ENTER) {

    }
    if (event.which === KEY.LEFT) {
      walker.speedX = -15;
    }
    if (event.which === KEY.UP) {
      walker.speedY = -15;
    }
    if (event.which === KEY.RIGHT) {
      walker.speedX = 15;
    }
    if (event.which === KEY.DOWN) {
      walker.speedY = 15;
    }
    //Controls for Runner
    if (event.which === KEY.A) {
      runner.speedX = -15;
    }
    if (event.which === KEY.W) {
      runner.speedY = -15;
    }
    if (event.which === KEY.D) {
      runner.speedX = 15;
    }
    if (event.which === KEY.S) {
      runner.speedY = 15;
    }
  }
  function handleKeyUp(event) {
    if (event.which === KEY.LEFT || event.which === KEY.UP || event.which === KEY.RIGHT || event.which === KEY.DOWN) {
      walker.speedX = 0
      walker.speedY = 0
    }
    if (event.which === KEY.A || event.which === KEY.W || event.which === KEY.D || event.which === KEY.S) {
      runner.speedX = 0
      runner.speedY = 0
    }


  }
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////


  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }

  function repositionGameItem() {
    walker.positionX += walker.speedX;
    walker.positionY += walker.speedY;
    runner.positionX += runner.speedX;
    runner.positionY += runner.speedY;
  }


  function redrawGameItem() {
    $("#walker").css("left", walker.positionX);
    $("#walker").css("top", walker.positionY);
    $("#runner").css("left", runner.positionX);
    $("#runner").css("top", runner.positionY);
  }

  function wallCollision() {
  // WALKER
    var char1H = $("#walker").height()
    var char1W = $("#walker").width()

    var boardWidth = $("#board").width() - char1W
    var boardHeight = $("#board").height() - char1H
  // RUNNER
    var char2H = $("#runner").height()
    var char2W = $("#runner").width()

    var boardWidth2 = $("#board").width() - char2W
    var boardHeight2 = $("#board").height() - char2H
  // WALKER IF-STATEMENT
    if (walker.positionX < 0) {
      walker.speedX = walker.speedX * -1
    }
    if (walker.positionY < 0) {
      walker.speedY = walker.speedY * -1
    }

    if (walker.positionX > boardWidth) {
      walker.speedX = walker.speedX * -1
    }
    if (walker.positionY > boardHeight) {
      walker.speedY = walker.speedY * -1
    }
    // RUNNER IF-STATEMENT

    if (runner.positionX < 0) {
      runner.speedX = runner.speedX * -1
    }
    if (runner.positionY < 0) {
      runner.speedY = runner.speedY * -1
    }

    if (runner.positionX > boardWidth2) {
      runner.speedX = runner.speedX * -1
    }
    if (runner.positionY > boardHeight2) {
      runner.speedY = runner.speedY * -1
    }

  }
}
