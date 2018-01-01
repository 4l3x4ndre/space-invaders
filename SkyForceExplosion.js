function ExplosionManager() {
  this.explosions = [];
  this.x = 0;

  /// Create a explosion image
  this.createExplosion = function(posx, y) {
    let e = document.createElement('img');
    e.setAttribute('src', './explosion.png');
    let currentId = spaceInvaders.currentExplosionId++;
    e.setAttribute('id', 'explosion' + currentId);
    e.setAttribute('style', `top: ${y}px; left: ${posx}px; z-index: 1000; width: 15px; height: 15px; position: absolute`);
    let o = {
      id: "#explosion"+currentId,
      speed: 10,
      width: 15,
      height: 15,
      x: posx,
      y: y,
      directionX: 1,
      directionY: 1,
      elt: e
    }
    this.explosions.push(o);
    document.getElementById("playground").appendChild(e);
    explosionSound = new Sound("", false);
    explosionSound = new Sound ("./AlienExplosion.mp3", false);
    explosionSound.play();
    let destroyTimer = setTimeout(this.destroyExplosion.bind(this), 150, o.id);
  }

  /// Destroy a explosion
  this.destroyExplosion = function(id) {
    for (epx in this.explosions) {
      if (this.explosions[epx].id == id) {
        $(this.explosions[epx].id).remove();
        this.explosions.splice(epx, 1);
      }
    }
  }

}
