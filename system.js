function weatherSystem(){
  const r = Math.random();

  if(r < 0.33) state.weather = "☀️";
  else if(r < 0.66) state.weather = "🌧";
  else state.weather = "🔥";

  render();
}

function marketSystem(){
  state.market = Math.floor(8 + Math.random()*5);
  render();
}

function pestSystem(){
  if(Math.random() < 0.1){
    const i = Math.floor(Math.random()*state.farm.length);
    state.farm[i] = null;
  }

  renderFarm();
}
