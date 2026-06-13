<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<title>DreamFarm v1.4</title>

<style>
body { font-family: Arial; background:#f2f7f2; text-align:center; }

.box {
  background:white;
  padding:15px;
  margin:10px auto;
  width:520px;
  border-radius:10px;
}

.grid {
  display:grid;
  grid-template-columns: repeat(3, 1fr);
  gap:10px;
}

.plot {
  background:#dfeedd;
  height:80px;
  display:flex;
  align-items:center;
  justify-content:center;
  cursor:pointer;
  border-radius:8px;
}

.ready { background:#ffeaa7; }

button { padding:6px; margin:3px; cursor:pointer; }
</style>
</head>

<body>

<h1>🌱 DreamFarm v1.4 (Stable)</h1>

<div class="box">
💰 골드: <span id="gold"></span><br>
⭐ 레벨: <span id="level"></span><br>
📊 EXP: <span id="exp"></span>/<span id="maxExp"></span>
</div>

<div class="box">
<select id="cropSelect"></select>
<button onclick="buySeed()">씨앗 구매</button>
</div>

<div class="box">
<h3>🌱 농장</h3>
<div class="grid" id="farm"></div>
</div>

<div class="box">
<h3>📦 창고</h3>
<div id="inventory"></div>
<button onclick="sell()">판매</button>
</div>

<script>
// =====================
// 🧠 상태
// =====================
const state = {
  gold: 50,
  level: 1,
  exp: 0,
  maxExp: 100,

  selectedCrop: "lettuce",

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
  },

  farm: Array(9).fill(null)
};

// =====================
// 🌱 작물 가격
// =====================
const price = {
  lettuce: 10,
  chive: 15,
  carrot: 20,
  tomato: 25,
  corn: 30,
  potato: 35,
  wheat: 40,
  pumpkin: 45,
  onion: 50,
  strawberry: 60
};

// =====================
// 🌱 상점 세팅
// =====================
function initShop(){
  const sel = document.getElementById("cropSelect");
  sel.innerHTML = "";

  Object.keys(state.seed).forEach(c=>{
    const opt = document.createElement("option");
    opt.value = c;
    opt.innerText = c + " (" + price[c] + "G)";
    sel.appendChild(opt);
  });

  sel.onchange = (e)=>{
    state.selectedCrop = e.target.value;
  };
}

// =====================
// 🌱 농장 렌더
// =====================
function renderFarm(){
  const farmDiv = document.getElementById("farm");
  farmDiv.innerHTML = "";

  state.farm.forEach((p,i)=>{

    const d = document.createElement("div");
    d.className = "plot";

    if(!p){
      d.innerText = "빈 땅";
      d.onclick = ()=>plant(i);
    }
    else if(p.stage === "grow"){
      d.innerText = "🌱 " + p.type;
    }
    else{
      d.innerText = "🌾 " + p.type;
      d.classList.add("ready");
      d.onclick = ()=>harvest(i);
    }

    farmDiv.appendChild(d);
  });
}

// =====================
// 🌱 심기
// =====================
function plant(i){

  if(state.farm[i]) return;

  const type = state.selectedCrop;

  if(state.seed[type] <= 0){
    alert("씨앗 부족!");
    return;
  }

  state.seed[type]--;

  state.farm[i] = {
    type,
    stage: "grow"
  };

  setTimeout(()=>{
    if(state.farm[i]){
      state.farm[i].stage = "ready";
      renderFarm();
    }
  }, 3000);

  render();
}

// =====================
// 🌾 수확
// =====================
function harvest(i){

  const crop = state.farm[i];
  if(!crop) return;

  state.inventory[crop.type]++;

  state.farm[i] = null;

  state.exp += 10;

  if(state.exp >= state.maxExp){
    state.exp -= state.maxExp;
    state.level++;
  }

  render();
}

// =====================
// 💰 판매
// =====================
function sell(){

  let total = 0;

  Object.keys(state.inventory).forEach(k=>{
    total += state.inventory[k] * price[k];
    state.inventory[k] = 0;
  });

  state.gold += total;

  render();
}

// =====================
// 🏪 구매
// =====================
function buySeed(){

  const type = state.selectedCrop;

  if(state.gold < price[type]){
    alert("골드 부족!");
    return;
  }

  state.gold -= price[type];
  state.seed[type]++;

  render();
}

// =====================
// 🔄 렌더
// =====================
function render(){

  document.getElementById("gold").innerText = state.gold;
  document.getElementById("level").innerText = state.level;
  document.getElementById("exp").innerText = state.exp;
  document.getElementById("maxExp").innerText = state.maxExp;

  let invText = "";
  Object.keys(state.inventory).forEach(k=>{
    invText += `${k}: ${state.inventory[k]}<br>`;
  });

  document.getElementById("inventory").innerHTML = invText;

  renderFarm();
}

// =====================
// 🚀 시작
// =====================
initShop();
render();

</script>

</body>
</html>
