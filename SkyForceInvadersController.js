let aliensToRemove = [],
    currentAlienId = 0;

/// Create a alien image
var createImg = function() {
  let e = document.createElement('img');

  // Make random aliens in percentage
  let randomNumber = Math.round(Math.random() * 100);
  if (randomNumber > powerUpPourcentageWeapon) {
    e.setAttribute('src', './spaceship.png');
  }else {
    // The random number indicates that the powerUp is for life
    if (randomNumber <= powerUpPourcentageLife && randomNumber > powerUpPourcentageBomb)  {
        e.setAttribute('src', './alienLife.png');
    // The random number indicates that the powerUp is for spaceship's weapon
    } else if (randomNumber <= powerUpPourcentageWeapon && randomNumber > powerUpPourcentageBomb) {

      // if the player does not shoot too much rockets per second, the alien is a powerUp for spaceship's weapon
      //if (rocketManager.loadingTime > 100) {
        e.setAttribute('src', './alienPowerUp.png');
      //} else {
        //e.setAttribute('src', './spaceship.png');
        //randomNumber = 100;
      //}
    } else {
      e.setAttribute('src', './alienBomb.png');
    }
  }

  const myCurretnAlienId = currentAlienId++;
  e.setAttribute('id', 'ball' + myCurretnAlienId);
  e.setAttribute('style', `top: -100px; z-index: 1000; width: 20px; height: 20px; position: absolute`);
  let o = {
    speed: 10,
    width: 20,
    height: 20,
    x: Math.random()*180,//150
    y: 0,
    directionX: 1,
    directionY: 1,
    elt: e,
    id: myCurretnAlienId,
    powerUp: randomNumber
  }
  aliens.push(o);
  document.getElementById("playground").appendChild(e);
}

/// Launche the generator that brings up aliens
function LanceGenerateur() {
  spaceInvaders.generateur = setInterval(createImg, alienSpawnTime);
}

/// Stop the generator that brings up aliens and clear the aliens array
function ArreteGenerateur() {
  clearInterval(spaceInvaders.generateur);
  for (let b in aliens) {
    $("#ball"+aliens[b].id).remove();
  }
  aliens = [];
}

/// Destroy alien according to its id
function removeAlien(id) {
  for (let alien in aliens) {
    if (aliens[alien].id == id) {
      $("#ball"+id).remove();
      aliens.splice(alien, 1);
      return;
    }
  }
}

/// Move all aliens to the bottom edge
function moveAliens() {
    for (ball in aliens) {

    let alive = true;

    // Reference useful variables
    let playgroundHeight = parseInt($("#playground").height());
    let playgroundWidth = parseInt($("#playground").width());

    // Reset the position of the ball if it touch the bottom edge
    if (aliens[ball].y + aliens[ball].speed *aliens[ball].directionY > playgroundHeight) {
      // If the alien is special, he can't reappear
      if (aliens[ball].powerUp < powerUpPourcentageWeapon) {
        alive = false;
      } else {
        aliens[ball].y = 0;
        aliens[ball].x = Math.random() * 180;
      }
    }

    // Check if the ball touch the player
    let paddleRight = parseInt($("#playerSpaceShip").css("left")) + parseInt($("#playerSpaceShip").css("width")) + 5;
    let paddleLeft = parseInt($("#playerSpaceShip").css("left"));

    if (aliens[ball].y >= 340) {
      if (aliens[ball].x + 20 > paddleLeft && aliens[ball].x < paddleRight) {
        // If the alien is a powerUp for Weapon: we activate the power
        if (aliens[ball].powerUp <= powerUpPourcentageWeapon && aliens[ball].powerUp > powerUpPourcentageLife) {
          rocketManager.loadingTime -= 100;
          bonusTime = Date.now()+bonusActiveTime;
          bonusIsActive = true;
          alive = false;
          /// If the alien is a powerUp for Life: we activate the power
        } else if (aliens[ball].powerUp <= powerUpPourcentageLife && aliens[ball].powerUp > powerUpPourcentageBomb) {
          spaceInvaders.life += 1;
          alive = false;
        } else if (aliens[ball].powerUp <= powerUpPourcentageBomb) {
          spaceInvaders.life -= 2;
          alive = false;
        } else {
          /// Else if decrease life
          aliens[ball].y = 0;
          aliens[ball].x = Math.random() * 180;
          spaceInvaders.life -= 1;
        }
      }
    }

    /// If the alien is in life, move it
    if (alive) {

      /// Move down the ball
      aliens[ball].y += aliens[ball].speed;

      /// Actually move the ball with speed and direction
      $("#ball"+ball).css({
          "left": aliens[ball].x,
          "top": aliens[ball].y,
          "color": "red"
      });
      aliens[ball].elt.setAttribute('style', `left: ${aliens[ball].x}px; top: ${aliens[ball].y}px; z-index: 1000; width: 20px;
      height: 20px; position: absolute`);
    }else { /// Else we delet the alien
      removeAlien(aliens[ball].id);
    }
  }

};
