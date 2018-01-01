function RocketManager() {
  this.rockets = [];
  this.loadingTime = 300;
  this.loading = null;

  /// Create a rocket image
  this.createRocket = function() {
    let e = document.createElement('img');
    e.setAttribute('src', './rocketImg.png');
    let currentId = spaceInvaders.currentRocketId++;
    e.setAttribute('id', 'rocket' + currentId);
    e.setAttribute('style', `top: -100px; left: ${spaceInvaders.playerPosX+10}px; z-index: 1000; width: 10px; height: 20px; position: absolute`);
    let o = {
      id: "#rocket"+currentId,
      speed: 10,
      width: 10,
      height: 20,
      x: spaceInvaders.playerPosX,
      y: 350,
      directionX: 1,
      directionY: 1,
      elt: e
    }
    this.rockets.push(o);
    document.getElementById("playground").appendChild(e);
  }

  /// Move all rockets to the top edge
  this.moveRockets = function() {
    let rocketsToRemove = [];

    for (let rocketChild in this.rockets) {

      let r = this.rockets[rocketChild];

      if (r.y < 0) {
        // Put the rocket in the destruction array if it comes out of the field
        rocketsToRemove.push(rocketChild);
      } else {
        r.y -= r.speed;
        $(r.id).css({
          "top": r.y+"px",
        });

        /// Searching a collision with an alien for all invaders
        for (let alien in aliens) {
          /// Check if the rocket touch a alien
          if (r.y < aliens[alien].y+aliens[alien].height) {
            if (r.x+r.width > aliens[alien].x) {
              if (r.x < aliens[alien].x+aliens[alien].width) {

                explosionManager.createExplosion(aliens[alien].x, aliens[alien].y);
                /// Increase the score only if the alien is not a power up
                if (aliens[alien].powerUp <= powerUpPourcentageWeapon && aliens[alien].powerUp > powerUpPourcentageLife) {
                  rocketsToRemove.push(rocketChild);
                  removeAlien(aliens[alien].id);
                } else if (aliens[alien].powerUp <= powerUpPourcentageLife) {
                  rocketsToRemove.push(rocketChild);
                  removeAlien(aliens[alien].id);
                } else {
                  rocketsToRemove.push(rocketChild);
                  removeAlien(aliens[alien].id);
                  spaceInvaders.score += 1;
                }
              }
            }

          }
        }

      }
    }

    /// Remove the rocket (s) to destroy
    rocketsToRemove.reverse();
    for (i in rocketsToRemove) {
      $(this.rockets[ rocketsToRemove[i] ].id).remove();
      this.rockets.splice(rocketsToRemove[i], 1);

    }

  }

  this.fire = function() {
    /// Don't fire if we are realoding
    if (this.loading) {
      //shootSound.stop();
      return;
    }

      this.createRocket();
      shootSound = new Sound("", false);
      shootSound = new Sound("./shoot.mp3", false);
      shootSound.play();
      this.loading = setTimeout(this.readyToFire.bind(this), this.loadingTime);
  }

  this.readyToFire = function() {
    this.loading = null;
  }

}
