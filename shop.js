function renderShop() {
  const shop = document.getElementById("shop");
  shop.innerHTML = "<h2>🛒 상점</h2>";

  Object.keys(state.seeds).forEach(name => {
    const btn = document.createElement("button");

    btn.innerText = `${name} (${state.seeds[name].price}G)`;

    btn.onclick = () => {
      if (state.gold < state.seeds[name].price) return alert("골드 부족");

      state.gold -= state.seeds[name].price;

      for (let i = 0; i < state.farm.length; i++) {
        if (!state.farm[i]) {
          state.farm[i] = {
            name,
            ready: false,
            growTime: state.seeds[name].grow
          };
          break;
        }
      }

      renderAll();
    };

    shop.appendChild(btn);
  });
}
