const state = {
  gold: 50,
  level: 1,
  exp: 0,
  maxExp: 100,

  weather: "☀️",
  market: 10,

  farm: Array(9).fill(null),

  // 🌱 씨앗 10개 추가
  seed: {
    lettuce: 10,
    chive: 10,
    carrot: 10,
    tomato: 10,
    corn: 10,
    potato: 10,
    wheat: 10,
    pumpkin: 10,
    onion: 10,
    strawberry: 10
  },

  inventory: {
    lettuce: 0,
    chive: 0,
    carrot: 0,
    tomato: 0,
    corn: 0,
    potato: 0,
    wheat: 0,
    pumpkin: 0,
    onion: 0,
    strawberry: 0
  }
};

function render(){

  document.getElementById("gold").innerText = state.gold;
  document.getElementById("level").innerText = state.level;
  document.getElementById("exp").innerText = state.exp;
  document.getElementById("maxExp").innerText = state.maxExp;
  document.getElementById("weather").innerText = state.weather;
  document.getElementById("market").innerText = state.market + "G";

  // 📦 인벤토리 표시 (전체 씨앗 합)
  const totalSeeds =
    Object.values(state.seed).reduce((a,b)=>a+b,0);

  document.getElementById("inventory").innerText =
    `씨앗: ${totalSeeds} / 수확: ${state.inventory.lettuce ?? 0}`;

  renderFarm();
}

// 💰 판매
function sell(){
  state.gold += state.inventory.lettuce * state.market;
  state.inventory.lettuce = 0;

  saveGame();
  render();
}

// 🏪 씨앗 구매 (기본: 상추)
function buySeed(){

  const price = 5;

  if(state.gold < price){
    alert("골드 부족!");
    return;
  }

  state.gold -= price;
  state.seed.lettuce += 1;

  saveGame();
  render();
}

// 🚀 시작
loadGame();
render();

setInterval(weatherSystem, 15000);
setInterval(marketSystem, 10000);
setInterval(pestSystem, 20000);
