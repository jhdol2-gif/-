const state = {
  gold: 50,
  level: 1,
  exp: 0,
  maxExp: 100,
  weather: "☀️",
  market: 10,
  farm: Array(9).fill(null),
  inventory: 0
};

function render(){

  document.getElementById("gold").innerText = state.gold;
  document.getElementById("level").innerText = state.level;
  document.getElementById("exp").innerText = state.exp;
  document.getElementById("maxExp").innerText = state.maxExp;
  document.getElementById("weather").innerText = state.weather;
  document.getElementById("market").innerText = state.market + "G";

  document.getElementById("inventory").innerText =
    "상추: " + state.inventory;

  renderFarm();
}

function sell(){
  state.gold += state.inventory * state.market;
  state.inventory = 0;

  saveGame();
  render();
}

function buySeed(){
  alert("씨앗 시스템은 다음 확장!");
}

// 시작
loadGame();
render();

setInterval(weatherSystem, 15000);
setInterval(marketSystem, 10000);
setInterval(pestSystem, 20000);
