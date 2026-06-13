function renderFarm(){
  const farmDiv = document.getElementById("farm");
  farmDiv.innerHTML = "";

  state.farm.forEach((p,i)=>{

    const d = document.createElement("div");
    d.className = "plot";

    if(!p){
      d.innerText = "빈 땅";
      d.onclick = () => plant(i);
    } else if(p.stage === "grow"){
      d.innerText = "🌱 성장";
    } else {
      d.innerText = "🌾 수확";
      d.classList.add("ready");
      d.onclick = () => harvest(i);
    }

    farmDiv.appendChild(d);
  });
}

function plant(i){
  if(state.farm[i]) return;

  state.farm[i] = {stage:"grow"};

  setTimeout(()=>{
    if(state.farm[i]){
      state.farm[i].stage = "ready";
      renderFarm();
    }
  }, 3000);

  saveGame();
  render();
}

function harvest(i){
  state.inventory++;
  state.farm[i] = null;

  state.exp += 10;

  if(state.exp >= state.maxExp){
    state.exp -= state.maxExp;
    state.level++;
  }

  saveGame();
  render();
}
