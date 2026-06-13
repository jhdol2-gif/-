function saveGame(){
  localStorage.setItem("dreamfarm", JSON.stringify(state));
}

function loadGame(){
  const data = JSON.parse(localStorage.getItem("dreamfarm"));
  if(data){
    Object.assign(state, data);
  }
}
