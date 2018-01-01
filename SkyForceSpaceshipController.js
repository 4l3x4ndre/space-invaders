function moveSpaceship() {

    /// Arrow-right is pressed
    if (spaceInvaders.pressedKeys[spaceInvaders.KEY.RIGHT] && spaceInvaders.playerPosX < 167) {
        // Move the spaceship right of speed pixels
        if (spaceInvaders.playerSkill == 1) {
          spaceInvaders.playerPosX += 5;
        }else if (spaceInvaders.playerSkill == 2) {
          spaceInvaders.playerPosX += 7.5;
        }else {
          spaceInvaders.playerPosX += 10;
        }
        $("#playerSpaceShip").css("left", spaceInvaders.playerPosX);
    }
    /// Arrow-left is pressed
    if (spaceInvaders.pressedKeys[spaceInvaders.KEY.LEFT] && spaceInvaders.playerPosX > 0) {
        // Move the spaceship left of speed pixels
        if (spaceInvaders.playerSkill == 1) {
          spaceInvaders.playerPosX -= 5;
        }else if (spaceInvaders.playerSkill == 2) {
          spaceInvaders.playerPosX -= 7.5;
        }else {
          spaceInvaders.playerPosX -= 10;
        }
        $("#playerSpaceShip").css("left", spaceInvaders.playerPosX);
    }

}
