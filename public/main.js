function init() {

  try {
    content = document.getElementById("content");
    submitButton = document.getElementById("submitButton");
    gameSelector = document.getElementById("gameSelector");
    winnerSelector = document.getElementById("winnerSelector");
    loserSelector = document.getElementById("loserSelector");
  }
  catch (e) {
    // :)
    console.error(e);
  }
  newHeader = document.createElement("h1");
  newHeader.id = "matchSubmitted";
  newHeader.appendChild(document.createTextNode("Match Submitted"));

  database = firebase.database();
}

function loadPage(url) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      content.innerHTML = this.responseXML;
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

function submitMatch(game, winner, loser) {
  content.innerHTML = "";
  content.appendChild(newHeader);

  var matchData = {
    game: game,
    winner: winner,
    loser: loser
  };
  var newKey = database.ref("/matches").push().key;
  var updates = {};
  updates['/matches/'+newKey] = matchData;
  return database.ref().update(updates);
}
function addPlayer() {
  newPlayer(document.getElementById("playerNameInput").value);
}
function newPlayer(playerName) {
  var playerData = {
    name: playerName
  };
  var newKey = database.ref("/players").push().key;
  var updates = {};
  updates['/playerData/'+newKey] = playerData;
  return database.ref().update(updates);
}
