/// Global variables
let aliens = [],
 bonusActiveTime = 5000,
 bonusIsActive = false,
 powerUpPourcentageWeapon = 20,
 powerUpPourcentageLife = 10,
 powerUpPourcentageBomb = 6,
 rocketManager = new RocketManager(),
 explosionManager = new ExplosionManager(),
 alienSpawnTime = 2000,
 scoreFatserSpawnTime = 10;

// Setting up differents sounds
let backgroundMusic = new Sound("./Game.mp3", true);
let shootSound = new Sound("./shoot.mp3", false);
let explosionSound = new Sound ("./AlienExplosion.mp3", false);

const KEYS = {
  LEFT: 37,
  RIGHT: 39,
  SPACE: 32,
}

var spaceInvaders = {
  currentExplosionId: 0,
  currentRocketId: 0,
  playerPosX: 50,
  playerSkill: 0,
  aliensSpeed: 0,
  score: 0,
  life: 3,
  backgroundSpeed: 2.5,
  pressedKeys: [],
  KEY : KEYS
}

$(function() {
    //backgroundMusic = new sound();
    // Set interval to call gameloop every 30 milliseconds
    spaceInvaders.timer = setInterval(gameloop, 30);

    // Mark down what key is down and up into an array called "pressedKeys"
    $(document).keydown(function(e) {
        spaceInvaders.pressedKeys[e.which] = true;
    });
    $(document).keyup(function(e) {
        spaceInvaders.pressedKeys[e.which] = false;
    });
});

var gameloop = setInterval(function()  {

    /// Put the shooting speed back to normal if the bonus time is over
    if (bonusIsActive) {
      if (Date.now() >= bonusTime) {
        rocketManager.loadingTime = 300;
      }
    }
    /// If there is no alien in game, we put one to avoid boredom
    if (aliens.length == 0) {
      createImg();
    }

    if(spaceInvaders.pressedKeys[spaceInvaders.KEY.SPACE]) {
      rocketManager.fire();
    }

    /// If the player is alive, refresh all position
    if (spaceInvaders.life > 0) {
      moveAliens();
      moveSpaceship();
      moveBackGround();
      rocketManager.moveRockets();
    }

    if (spaceInvaders.life != 0) {
      $("#score").text ("Score: " + spaceInvaders.score.toString());
      $("#life").text (" Life: " + spaceInvaders.life.toString());
    } else {
      ArreteGenerateur();
      $("#life").text (" Game over");
      $("#life").css("color", "#FF0000");
    }

    /// Change the colot of the border according with player life
    if (spaceInvaders.life >= 3) {
      document.getElementById("playground").style.borderColor = "#66ff33";
    } else if (spaceInvaders.life == 2) {
      document.getElementById("playground").style.borderColor = "#ff9900";
    } else {
      document.getElementById("playground").style.borderColor = "#ff0000";
    }

    /// Change the interval between every invaders if the score is bigger than 30
    if (spaceInvaders.score > scoreFatserSpawnTime) {
      alienSpawnTime -= 100;
      scoreFatserSpawnTime += 10;
    }

}, 30);
