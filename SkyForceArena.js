/// Set up an effect for the player to believe that his spaceship is in motion
function moveBackGround() {
    var top = parseInt($("#backgroundIMG").css("top"));
    $("#backgroundIMG").css("top", top + spaceInvaders.backgroundSpeed);
    if (top >= -5) {
      $("#backgroundIMG").css("top", -1200);
    }
}

/// Title effect
setInterval(changeColor, 250);
var numColor = 0;
function changeColor() {
  if (numColor == 0) {
    document.getElementById("titleH").style.color = "#3333CC";
  }
  if (numColor == 1) {
    document.getElementById("titleH").style.color = "#00CC00";
  }
  if (numColor == 2) {
    document.getElementById("titleH").style.color = "#CC0000";
  }
  if (numColor == 3) {
    document.getElementById("titleH").style.color = "#CC3399";
  }
  numColor++;
  if (numColor>3) {
    numColor = 0;
  }

}

/// If buttons is pressed
$("#buttonPlay").click(function(event) {
  LanceGenerateur();

  backgroundMusic.play();

  $("#life").css("color", "#33CC00");

  document.getElementById("parametre").style.display = "none";
  document.getElementById("gameSection").style.display = "block";

  if ($("#lent")[0].checked) {
    spaceInvaders.aliensSpeed = 10;
    spaceInvaders.backgroundSpeed = 2.5;
  }else if ($("#moyenS")[0].checked) {
    spaceInvaders.aliensSpeed = 15;
    spaceInvaders.backgroundSpeed = 5;
  }else {
    spaceInvaders.backgroundSpeed = 7.5;
    spaceInvaders.aliensSpeed = 21;
  }
  if ($("#facile")[0].checked) {
    spaceInvaders.playerSkill = 1;
  }else if ($("#moyen")[0].checked) {
    spaceInvaders.playerSkill = 2;
  }else {
    spaceInvaders.playerSkill = 3;
  }

  if ($("#avec")[0].checked) {
    spaceInvaders.life = 3;
  }else {
    spaceInvaders.life = 1;
  }

  if ($("#red")[0].checked) {
    document.getElementById("playerSpaceShip").src = "./vaisseauPixelRouge.png";//playerspaceship01
  }else if ($("#blue")[0].checked) {
    document.getElementById("playerSpaceShip").src = "./vaisseauPixelBleu.png";
  }else {
    document.getElementById("playerSpaceShip").src = "./vaisseauPixel.png";//playerspaceship03
  }

  $("#backgroundIMG").css("top", -1200);
});
$("#buttonQuit").click(function(event) {
  //top.location = "file:///home/alexandre/Documents/Code/interactiviter/SkyForceMultiInvaders.html";
  document.location.reload();
});
