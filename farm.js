function renderFarm() {
  const farmDiv = document.getElementById("farm");
  farmDiv.innerHTML = "";

  state.farm.forEach((plot, i) => {
    const d = document.createElement("div");
    d.className = "plot";

    if (!plot) {
      d.innerText = "빈 땅";
      d.onclick = () => openPlantMenu(i);

    } else if (plot.pest) {
      d.innerText = `${plot.name}\n🐛 해충 피해`;
      d.onclick = () => harvest(i);

    } else if (!plot.ready) {
      d.innerText = `${plot.name}\n🌱 성장중`;

      setTimeout(() => {
        plot.ready = true;
        renderFarm();
      }, plot.growTime);

      if (plot.ready) {
        d.innerText = `${plot.name}\n✅ 수확 가능`;
        d.onclick = () => harvest(i);
      }

    } else {
      d.innerText = `${plot.name}\n✅ 수확 가능`;
      d.onclick = () => harvest(i);
    }

    farmDiv.appendChild(d);
  });
}

function openPlantMenu(index) {
  const seed = prompt("심을 작물: 상추/부추/얼갈이/열무/쑥갓");
  if (!state.seeds[seed]) return alert("없는 작물");

  if (state.gold < state.seeds[seed].price) return alert("골드 부족");

  state.gold -= state.seeds[seed].price;

  state.farm[index] = {
    name: seed,
    ready: false,
    growTime: state.seeds[seed].grow,
    pest: false
  };

  renderAll();
}

function plantAll() {
  for (let i = 0; i < state.farm.length; i++) {
    if (!state.farm[i]) {
      const seed = "상추";

      if (state.gold >= state.seeds[seed].price) {
        state.gold -= state.seeds[seed].price;

        state.farm[i] = {
          name: seed,
          ready: false,
          growTime: state.seeds[seed].grow,
          pest: false
        };
      }
    }
  }

  renderAll();
}

function harvest(index) {
  const crop = state.farm[index];
  if (!crop) return;

  if (crop.pest) {
    alert("🐛 해충 피해! 폐기됨");
    state.farm[index] = null;
    renderAll();
    return;
  }

  if (!crop.ready) return;

  state.storage[crop.name]++;

  state.gold += state.seeds[crop.name].price * 2;

  state.farm[index] = null;

  renderAll();
}

function harvestAll() {
  for (let i = 0; i < state.farm.length; i++) {
    if (state.farm[i]?.ready) {
      harvest(i);
    }
  }
}
