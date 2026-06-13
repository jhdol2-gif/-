function renderGold() {
  document.getElementById("goldBox").innerText =
    "Gold: " + state.gold;
}

function renderAll() {
  renderGold();
  renderShop();
  renderFarm();
  renderStorage();
}

startPestSystem();

renderAll();
