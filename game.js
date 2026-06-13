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
const cropList = [
  "lettuce",
  "chive",
  "carrot",
  "tomato",
  "corn",
  "potato",
  "wheat",
  "pumpkin",
  "onion",
  "strawberry"
];

function renderFarm(){
  const farmDiv = document.getElementById("farm");
  farmDiv.innerHTML = "";

  state.farm.forEach((p, i) => {

    const d = document.createElement("div");
    d.className = "plot";

    if(!p){
      d.innerText = "빈 땅";

      // 🌱 선택된 씨앗으로 심기
      d.onclick = () => plant(i);
    }
    else if(p.stage === "grow"){
      d.innerText = "🌱 성장";
    }
    else{
      d.innerText = "🌾 수확";
      d.classList.add("ready");
      d.onclick = () => harvest(i);
    }

    farmDiv.appendChild(d);
  });
}

function plant(i){

  if(state.farm[i]) return;

  // 🌱 현재 선택된 작물 (기본 lettuce)
  const type = state.selectedCrop || "lettuce";

  // ❌ 씨앗 없으면 막기
  if(state.seed[type] <= 0){
    alert("씨앗 부족: " + type);
    return;
  }

  state.seed[type]--;

  state.farm[i] = {
    type: type,
    stage: "grow"
  };

  setTimeout(() => {
    if(state.farm[i]){
      state.farm[i].stage = "ready";
      renderFarm();
    }
  }, 3000);

  saveGame();
  render();
}

function harvest(i){

  const crop = state.farm[i];

  if(!crop) return;

  const type = crop.type;

  state.inventory[type]++;

  state.farm[i] = null;

  state.exp += 10;

  if(state.exp >= state.maxExp){
    state.exp -= state.maxExp;
    state.level++;
  }

  saveGame();
  render();
}

// 🚀 시작
loadGame();
render();

setInterval(weatherSystem, 15000);
setInterval(marketSystem, 10000);
setInterval(pestSystem, 20000);
