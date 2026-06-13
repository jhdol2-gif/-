function renderGold() {
  document.getElementById("goldBox").innerText =
    "Gold: " + state.gold;
}

function renderAll() {
  renderGold();

  if (typeof renderShop === "function") renderShop();
  if (typeof renderFarm === "function") renderFarm();
  if (typeof renderStorage === "function") renderStorage();
}

window.onload = () => {
  renderAll();

  if (typeof startPestSystem === "function") {
    startPestSystem();
  }
};
